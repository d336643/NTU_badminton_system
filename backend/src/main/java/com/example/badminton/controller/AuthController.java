package com.example.badminton.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.badminton.model.RoleEnum;
import com.example.badminton.model.entity.Role;
import com.example.badminton.model.entity.User;
import com.example.badminton.model.request.LoginRequest;
import com.example.badminton.model.request.SignupRequest;
import com.example.badminton.model.response.LoginResponse;
import com.example.badminton.model.response.LoginResponse.LoginResponseBuilder;
import com.example.badminton.model.response.MessageResponse;
import com.example.badminton.repository.RoleRepository;
import com.example.badminton.repository.UserRepository;
import com.example.badminton.security.jwt.JwtUtils;
import com.example.badminton.security.service.UserDetailsImpl;
import com.example.badminton.validation.RegistrationDataValidator;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        //validate sid exist
        if (!userRepository.existsBySid(loginRequest.getSid())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new MessageResponse(false, "Student ID " + loginRequest.getSid() + " is not registered."));
        }

        //validate correct password
        User user = userRepository.findBySid(loginRequest.getSid()).get();
        if (!encoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    new MessageResponse(false, "Incorrect Password."));
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getSid(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                                        .map(item -> item.getAuthority())
                                        .collect(Collectors.toList());

        LoginResponseBuilder loginResponse = LoginResponse.builder();
        loginResponse.success(true);
        loginResponse.token(jwt);
        loginResponse.uid(userRepository.findBySid(loginRequest.getSid()).get().getId());
        loginResponse.msg("Login Success.");

        return ResponseEntity.ok(loginResponse.build());
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsBySid(signUpRequest.getSid())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(false, "Student ID is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(false, "Email is already in use!"));
        }

        if (!RegistrationDataValidator.isValidPassword(signUpRequest.getPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(false,
                                              "Invalid password. At least one character and digit, length should be 8~20."));
        }

        // validate ntu email
        if (!RegistrationDataValidator.isValidEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(false, "Invalid Email. Should end with @ntu.edu.tw"));
        }

        // Create new user's account
        User user = User.builder()
                        .username(signUpRequest.getUsername())
                        .email(signUpRequest.getEmail())
                        .degreeId(signUpRequest.getDegreeId())
                        .departmentId(signUpRequest.getDepartmentId())
                        .birthday(signUpRequest.getBirthday())
                        .address(signUpRequest.getAddress())
                        .phone(signUpRequest.getPhone())
                        .sid(signUpRequest.getSid())
                        .iid(signUpRequest.getIid())
                        .status(1)
                        .password(encoder.encode(signUpRequest.getPassword()))
                        .build();

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(RoleEnum.ROLE_USER)
                                          .orElseThrow(() -> new RuntimeException(
                                                  "Error: Role is not found. (Already insert data in role table?)"));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(RoleEnum.ROLE_ADMIN)
                                                       .orElseThrow(() -> new RuntimeException(
                                                               "Error: Role is not found. B"));
                        roles.add(adminRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(RoleEnum.ROLE_USER)
                                                      .orElseThrow(() -> new RuntimeException(
                                                              "Error: Role is not found. C"));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse(true, "Please check your email and verify your account."));
    }
}

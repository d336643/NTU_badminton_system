package com.example.badminton.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.badminton.converter.RegistrationConverter;
import com.example.badminton.model.EventRegistrationData;
import com.example.badminton.model.RoleEnum;
import com.example.badminton.model.UserBasicData;
import com.example.badminton.model.UserSimpleData;
import com.example.badminton.model.entity.Registration;
import com.example.badminton.model.entity.Role;
import com.example.badminton.model.entity.User;
import com.example.badminton.model.request.BankAccountRegistration;
import com.example.badminton.model.request.UserUpdateRequest;
import com.example.badminton.model.response.EventRegistrationResponse;
import com.example.badminton.model.response.MessageResponse;
import com.example.badminton.model.response.SuccessDataResponse;
import com.example.badminton.repository.RegistrationRepository;
import com.example.badminton.repository.UserRepository;
import com.example.badminton.validation.RegistrationDataValidator;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserRepository userRepository;

    private final RegistrationRepository registrationRepository;

    @GetMapping("/{uid}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getUser(@PathVariable Long uid) {
        //TODO: 驗證只能查自己的 uid
        Optional<User> opt = userRepository.findById(uid);

        if (opt.isPresent()) {
            UserBasicData data = UserBasicData.builder()
                                              .id(opt.get().getId())
                                              .username(opt.get().getUsername())
                                              .sid(opt.get().getSid())
                                              .degreeId(opt.get().getDegreeId())
                                              .departmentId(opt.get().getDepartmentId())
                                              .birthday(opt.get().getBirthday())
                                              .iid(opt.get().getIid())
                                              .email(opt.get().getEmail())
                                              .phone(opt.get().getPhone())
                                              .address(opt.get().getAddress())
                                              .build();
            return ResponseEntity.ok(new SuccessDataResponse(true, data));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new MessageResponse(false, String.format("uid %d not exist.", uid)));
        }
    }

    @GetMapping("")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userRepository.findAll();
        List<UserSimpleData> data = new ArrayList<>();
        // find only ROLE_USER
        for (User user : users) {
            Boolean isAdmin = false;
            for (Role r : user.getRoles()) {
                if (r.getName().equals(RoleEnum.ROLE_ADMIN)) {
                    isAdmin = true;
                    continue;
                }
            }
            if (isAdmin){ continue;}
            data.add(UserSimpleData.builder()
                                   .uid(user.getId())
                                   .username(user.getUsername())
                                   .sid(user.getSid())
                                   .build());
        }
        return ResponseEntity.ok(new SuccessDataResponse(true, data));
    }

    @PutMapping("/{uid}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> updateUserInformation(@Valid @RequestBody UserUpdateRequest req,
                                                   @PathVariable Long uid) {

        // validate ntu email
        if (!RegistrationDataValidator.isValidEmail(req.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(false, "Invalid Email. Should end with @ntu.edu.tw"));
        }

        Optional<User> opt = userRepository.findById(uid);
        if (opt.isPresent()) {
            User toSave = opt.get();
            toSave.setUsername(req.getUsername());
            toSave.setSid(req.getSid());
            toSave.setDegreeId(req.getDegreeId());
            toSave.setDepartmentId(req.getDepartmentId());
            toSave.setBirthday(req.getBirthday());
            toSave.setIid(req.getIid());
            toSave.setEmail(req.getEmail());
            toSave.setPhone(req.getPhone());
            toSave.setAddress(req.getAddress());
            userRepository.save(toSave);
            return ResponseEntity.ok(new MessageResponse(true, "Update success!"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new MessageResponse(false, String.format("uid %d not exist.", uid)));
        }
    }

    @PostMapping("/bankAccount")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> createBankAccount(@Valid @RequestBody BankAccountRegistration req) {

        for (Long rid : req.getEventsToPay()) {
            if (!registrationRepository.existsById(rid)) {
                return ResponseEntity.badRequest().body(
                        new MessageResponse(false, "There's non-existed eventId in EventsToPay."));
            }
        }

        List<Registration> registrations = registrationRepository.findAllById(req.getEventsToPay());
        for (Registration r : registrations) {
            r.setStatus(2);
            r.setPayAccount(req.getAccount());
            r.setPayerUid(req.getPayer());
            registrationRepository.save(r);
        }

        return ResponseEntity.ok(new EventRegistrationResponse(true,
                                                               registrationsConvertToEventRegistrationData(
                                                                       registrations)));
    }

    private List<EventRegistrationData> registrationsConvertToEventRegistrationData (Iterable<Registration> registrations) {
        List<EventRegistrationData> data = new ArrayList<>();
        for (Registration r : registrations) {
            List<UserSimpleData> competitors = new ArrayList<>();
            User competitor1 = userRepository.findById(r.getApplier().getId()).get();
            competitors.add( UserSimpleData.builder()
                                           .uid(competitor1.getId())
                                           .sid(competitor1.getSid())
                                           .username(competitor1.getUsername())
                                           .build());
            if (r.getPartnerUid() != null) {
                User competitor2 = userRepository.findById(r.getPartnerUid()).get();
                competitors.add( UserSimpleData.builder()
                                               .uid(competitor2.getId())
                                               .sid(competitor2.getSid())
                                               .username(competitor2.getUsername())
                                               .build());
            }
            data.add(EventRegistrationData.builder()
                                          .eventId(r.getId())
                                          .typeId(r.getEvent().getId())
                                          .competitors(competitors)
                                          .status(r.getStatus())
                                          .payer(r.getPayerUid())
                                          .account(r.getPayAccount())
                                          .build());
        }
        return data;
    }
}

package com.example.badminton.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.badminton.model.EventRegistrationData;
import com.example.badminton.model.RoleEnum;
import com.example.badminton.model.UserBasicData;
import com.example.badminton.model.UserSimpleData;
import com.example.badminton.model.entity.Event;
import com.example.badminton.model.entity.Registration;
import com.example.badminton.model.entity.Role;
import com.example.badminton.model.entity.User;
import com.example.badminton.model.request.PayStatusToPaidRequest;
import com.example.badminton.model.response.EventRegistrationResponse;
import com.example.badminton.model.response.MessageResponse;
import com.example.badminton.model.response.SuccessDataResponse;
import com.example.badminton.repository.EventRepository;
import com.example.badminton.repository.RegistrationRepository;
import com.example.badminton.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final UserRepository userRepository;

    private final EventRepository eventRepository;

    private final RegistrationRepository registrationRepository;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllRegistrationData(@RequestParam Long typeId) {
        Optional<Event> opt = eventRepository.findById(typeId);
        if (opt.isPresent()){
            Event e = opt.get();
            return ResponseEntity.ok(new EventRegistrationResponse(true,
                                                                   registrationsConvertToEventRegistrationData(
                                                                           e.getRegistrations())));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse(false, "typeId should range from 1 to 5."));
        }
    }

    @PostMapping("/pay")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updatePaymentStauts(@Valid @RequestBody PayStatusToPaidRequest req) {

        //check verifier is admin
        Optional<User> opt = userRepository.findById(req.getVerifier());
        User user = opt.get();
        Boolean isAdmin = false;
        for (Role r : user.getRoles()) {
            if (r.getName().equals(RoleEnum.ROLE_ADMIN)) {
                isAdmin = true;
                continue;
            }
        }
        if (!isAdmin) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                    new MessageResponse(false, "The verifier's role is not ADMIN."));
        }

        // Either eventsToPay or eventsToUnpay should be not empty
        if (req.getEventsToPay().isEmpty() && req.getEventsToUnpay().isEmpty()) {
            return ResponseEntity.badRequest().body(
                    new MessageResponse(false, "Either eventsToPay or eventsToUnpay should not be empty."));
        }


        // Check duplicate eid in eventsToPay and eventsToUnpay
        for (Long eid : req.getEventsToPay()) {
            if (req.getEventsToUnpay().contains(eid)) {
                return ResponseEntity.badRequest().body(
                        new MessageResponse(false, String.format("Duplicate eid: %d.", eid)));
            }
        }

        // check non-existed eventId
        for (Long rid : req.getEventsToPay()) {
            if (!registrationRepository.existsById(rid)) {
                return ResponseEntity.badRequest().body(
                        new MessageResponse(false, "There's non-existed eventId in EventsToPay."));
            }
        }
        for (Long rid : req.getEventsToUnpay()) {
            if (!registrationRepository.existsById(rid)) {
                return ResponseEntity.badRequest().body(
                        new MessageResponse(false, "There's non-existed eventId in EventsToUnpay."));
            }
        }

        // update EventsToPay
        List<Registration> registrationsToPay = registrationRepository.findAllById(req.getEventsToPay());
        for (Registration r : registrationsToPay) {
            if (r.getStatus() != 2) {
                return ResponseEntity.badRequest().body(
                        new MessageResponse(false, String.format("Since the event(eid=%d) status is not 'verifying', it cannot be set to 'paid'.", r.getEvent().getId())));
            }
            r.setStatus(3);
            r.setVerifierUid(req.getVerifier());
            registrationRepository.save(r);
        }

        // update EventsToUnpay
        List<Registration> registrationsToUnpay = registrationRepository.findAllById(req.getEventsToUnpay());
        for (Registration r : registrationsToUnpay) {
            if (r.getStatus() != 3) {
                return ResponseEntity.badRequest().body(
                        new MessageResponse(false, String.format("Since the event(eid=%d) status is not 'paid', it cannot be set to 'verifying'.", r.getEvent().getId())));
            }
            r.setStatus(2);
            r.setVerifierUid(req.getVerifier());
            registrationRepository.save(r);
        }

        // return updated registration
        return ResponseEntity.ok(new EventRegistrationResponse(true,
                                                               registrationsConvertToEventRegistrationData(
                                                                       Stream.concat(registrationsToPay.stream(), registrationsToUnpay.stream())
                                                                             .collect(Collectors.toList()))));
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

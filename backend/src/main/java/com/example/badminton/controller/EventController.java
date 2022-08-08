package com.example.badminton.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.badminton.model.EventData;
import com.example.badminton.model.EventRegistrationData;
import com.example.badminton.model.RoleEnum;
import com.example.badminton.model.UserSimpleData;
import com.example.badminton.model.entity.Registration;
import com.example.badminton.model.entity.Role;
import com.example.badminton.model.entity.User;
import com.example.badminton.model.request.EventsRegistrationRequest;
import com.example.badminton.model.response.EventRegistrationResponse;
import com.example.badminton.model.response.MessageResponse;
import com.example.badminton.repository.EventRepository;
import com.example.badminton.repository.RegistrationRepository;
import com.example.badminton.repository.UserRepository;
import com.example.badminton.validation.RoleValidator;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/events")
public class EventController {

    private final UserRepository userRepository;

    private final EventRepository eventRepository;

    private final RegistrationRepository registrationRepository;

    @PostMapping("")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> registerEvents(@Valid @RequestBody EventsRegistrationRequest req) {
        // All uid exist and is ROLE_USER
        Set<Long> uids = new TreeSet<>();
        Set<Long> not_existed_uids = new TreeSet<>();
        uids.add(req.getApplier());
        for (EventData e : req.getEvents()) {
            uids.addAll(e.getCompetitors());
        }
        for (Long uid : uids) {
            Optional<User> user = userRepository.findById(uid);
            if (!user.isPresent() || !RoleValidator.isUser(user.get())) {
                not_existed_uids.add(uid);
            }
        }
        if (!not_existed_uids.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new MessageResponse(false, "uid " + not_existed_uids.toString() + " not exist."));
        }
        // 不能幫別人報名
        final Long applier = req.getApplier();
        for (EventData e : req.getEvents()) {
            if (!e.getCompetitors().contains(applier)) {
                return ResponseEntity.badRequest().body(
                        new MessageResponse(false, "Cannot register for others."));
            }
        }
        //typeID:1,2 => competitor cnt=1
        //typeID:3,4, 5 => competitor cnt=2
        for (EventData e : req.getEvents()) {
            final Boolean condition1 =
                    (e.getTypeId() == 1 || e.getTypeId() == 2) && e.getCompetitors().size() != 1;
            final Boolean condition2 = (e.getTypeId() == 3 || e.getTypeId() == 4 || e.getTypeId() == 5)
                                       && e.getCompetitors().size() != 2;
            if (condition1 || condition2) {
                return ResponseEntity.badRequest().body(
                        new MessageResponse(false, "TypeID and competitor cnt not match!"));
            }
        }
        // user 報名數至多報名兩個
        for(Long uid : uids){
            User user = userRepository.findById(uid).get();
            //applier
            if(uid == req.getApplier()) {
                if ((user.getRegistrations().size() + registrationRepository.findAllByPartnerUid(uid).size()
                     + req.getEvents().size()) > 2) {
                    return ResponseEntity.badRequest().body(
                            new MessageResponse(false, "One user can at most register 2 events."));
                }
            }
            //partner
            else {
                if ((user.getRegistrations().size() + registrationRepository.findAllByPartnerUid(uid).size()
                     + 1) > 2) {
                    return ResponseEntity.badRequest().body(
                            new MessageResponse(false, "One user can at most register 2 events."));
                }
            }
        }

        //存入 db
        for (EventData e : req.getEvents()) {
            Registration toSave = Registration.builder()
                                              .applier(userRepository.findById(req.getApplier()).get())
                                              .event(eventRepository.findById(e.getTypeId().longValue()).get())
                                              .status(1)
                                              .build();
            if (e.getTypeId() == 3 || e.getTypeId() == 4 || e.getTypeId() == 5) {
                Long partnerId = null;
                for (Long uid : e.getCompetitors()) {
                    if (uid != applier) {partnerId = uid;}
                }
                toSave.setPartnerUid(partnerId);
            }
            registrationRepository.save(toSave);
        }

        return ResponseEntity.ok(new MessageResponse(true, "Register events success!"));
    }

    @GetMapping("status")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getEventRegistrationData(@RequestParam Long uid) {
        Optional<User> opt = userRepository.findById(uid);
        if (opt.isPresent()) {
            User user = opt.get();
            Set<Registration> registrations = user.getRegistrations();
            registrations.addAll(registrationRepository.findAllByPartnerUid(uid));

            return ResponseEntity.ok(new EventRegistrationResponse(true,
                                                                   registrationsConvertToEventRegistrationData(
                                                                           registrations)));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse(false, "uid not exist."));
        }
    }

    private List<EventRegistrationData> registrationsConvertToEventRegistrationData(
            Iterable<Registration> registrations) {
        List<EventRegistrationData> data = new ArrayList<>();
        for (Registration r : registrations) {
            List<UserSimpleData> competitors = new ArrayList<>();
            User competitor1 = userRepository.findById(r.getApplier().getId()).get();
            competitors.add(UserSimpleData.builder()
                                          .uid(competitor1.getId())
                                          .sid(competitor1.getSid())
                                          .username(competitor1.getUsername())
                                          .build());
            if (r.getPartnerUid() != null) {
                User competitor2 = userRepository.findById(r.getPartnerUid()).get();
                competitors.add(UserSimpleData.builder()
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

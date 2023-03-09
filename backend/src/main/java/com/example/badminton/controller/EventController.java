package com.example.badminton.controller;

import java.util.*;

import javax.validation.Valid;

import com.example.badminton.model.request.EventDeleteRequest;
import com.example.badminton.model.request.EventUpdateRequest;
import com.example.badminton.model.response.EventRegistrationResponse;
import com.example.badminton.model.response.SuccessDataResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.example.badminton.model.EventCreateData;
import com.example.badminton.model.EventRegistrationData;
import com.example.badminton.model.UserSimpleData;
import com.example.badminton.model.entity.Registration;
import com.example.badminton.model.entity.User;
import com.example.badminton.model.request.EventsCreateRequest;
import com.example.badminton.model.response.EventRegistrationsResponse;
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
    public ResponseEntity<?> registerEvents(@Valid @RequestBody EventsCreateRequest req) {
        // All uid exist and is ROLE_USER
        Set<Long> uids = new TreeSet<>();
        Set<Long> not_existed_uids = new TreeSet<>();
        uids.add(req.getApplier());
        for (EventCreateData e : req.getEvents()) {
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
        for (EventCreateData e : req.getEvents()) {
            if (!e.getCompetitors().contains(applier)) {
                return ResponseEntity.badRequest().body(
                        new MessageResponse(false, "Cannot register for others."));
            }
            //檢查是否報名同樣項目
            for (Long uid : e.getCompetitors()) {
                User user = userRepository.findById(uid).get();
                for (Registration r : user.getRegistrations()) {
                    if (e.getTypeId() == r.getEvent().getId().longValue()) {
                        return ResponseEntity.badRequest().body(
                                new MessageResponse(false, String.format("User %s already register %s.", user.getUsername(), r.getEvent().getName())));
                    }
                }
            }
        }
        //typeID:1,2 => competitor cnt=1
        //typeID:3,4, 5 => competitor cnt=2
        for (EventCreateData e : req.getEvents()) {
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
        for (Long uid : uids) {
            User user = userRepository.findById(uid).get();
            //applier: 自己曾報名場數+被別人報名場數+這次報名場數
            if (uid == req.getApplier()) {
                if ((user.getRegistrations().size() + registrationRepository.findAllByPartnerUid(uid).size()
                        + req.getEvents().size()) > 2) {
                    return ResponseEntity.badRequest().body(
                            new MessageResponse(false, String.format("One user(%s) can at most register 2 events.", user.getUsername())));
                }
            }
            //partner: 自己曾報名場數+被別人報名場數+這次被報名場數（一定是1）
            else {
                if ((user.getRegistrations().size() + registrationRepository.findAllByPartnerUid(uid).size()
                        + 1) > 2) {
                    return ResponseEntity.badRequest().body(
                            new MessageResponse(false, String.format("One user(%s) can at most register 2 events.", user.getUsername())));
                }
            }
        }

        //存入 db
        ArrayList<Registration> savedRegistrations = new ArrayList<Registration>();
        for (EventCreateData e : req.getEvents()) {
            Registration toSave = Registration.builder()
                    .applier(userRepository.findById(req.getApplier()).get())
                    .event(eventRepository.findById(e.getTypeId().longValue()).get())
                    .semester(e.getSemester())
                    .registrationId(getNextRegistrationId(e.getTypeId().longValue(), e.getSemester()))
                    .status(1)
                    .build();
            if (e.getTypeId() == 3 || e.getTypeId() == 4 || e.getTypeId() == 5) {
                Long partnerId = null;
                for (Long uid : e.getCompetitors()) {
                    if (uid != applier) {
                        partnerId = uid;
                    }
                }
                toSave.setPartnerUid(partnerId);
            }
            registrationRepository.save(toSave);
            savedRegistrations.add(toSave);
        }

        return ResponseEntity.ok(new EventRegistrationsResponse(true,
                registrationsConvertToEventRegistrationData(
                        savedRegistrations)));
    }

    private Integer getNextRegistrationId(Long eid, String semester) {
        return registrationRepository.findRegistrationIdsByEventIdAndSemester(eid, semester) + 1;
    }

    @GetMapping("status")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getEventRegistrationData(@RequestParam Long uid) {
        Optional<User> opt = userRepository.findById(uid);
        if (opt.isPresent()) {
            User user = opt.get();
            Set<Registration> registrations = user.getRegistrations();
            registrations.addAll(registrationRepository.findAllByPartnerUid(uid));

            return ResponseEntity.ok(new EventRegistrationsResponse(true,
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
                    .semester(r.getSemester())
                    .registrationId(r.getRegistrationId())
                    .build());
        }
        return data;
    }

    @PutMapping("")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> updateEvent(@Valid @RequestBody EventUpdateRequest req) {
        // Event Id not exist
        Optional<Registration> registration = registrationRepository.findById(req.getEvent().getEventId());
        if (!registration.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new MessageResponse(false, "EventId " + req.getEvent().getEventId() + " not exist."));
        }

        if (registration.get().getStatus() != 1) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new MessageResponse(false, "不可編輯已繳費的參賽項目"));
        }

        // 不能修改成其他項目
        Boolean notModifySameEventType = req.getEvent().getTypeId() != registration.get().getEvent().getId().longValue();
        if (notModifySameEventType) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new MessageResponse(false, "欲修改報名項目，請刪掉重新報名。"));
        }

        if (req.getEvent().getTypeId() == 1 || req.getEvent().getTypeId() == 2) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new MessageResponse(false, "只能修改雙打搭檔"));
        }

        // uid 需存在且不是 admin
        Long partnerUid = null;
        for (Long uid : req.getEvent().getCompetitors()) {
            if (uid != req.getApplier()) partnerUid = uid;

            Optional<User> user = userRepository.findById(uid);
            if (!user.isPresent() || !RoleValidator.isUser(user.get())) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new MessageResponse(false, "uid " + uid + " not exist."));
            }
        }

        // 不能幫別人報名
        final Long applier = req.getApplier();
        if (!req.getEvent().getCompetitors().contains(applier)) {
            return ResponseEntity.badRequest().body(
                    new MessageResponse(false, "Cannot register for others."));
        }

        //typeID:3,4, 5 => competitor cnt=2
        if (req.getEvent().getCompetitors().size() != 2){
            return ResponseEntity.badRequest().body(
                    new MessageResponse(false, "TypeID and competitor cnt not match!"));
        }

        //檢查 partner 是否報名同樣項目
        User user = userRepository.findById(partnerUid).get();
        for (Registration r : user.getRegistrations()) {
            Boolean registerDuplicateEventType = req.getEvent().getTypeId() == r.getEvent().getId().longValue();
            if (registerDuplicateEventType) {
                return ResponseEntity.badRequest().body(
                        new MessageResponse(false, String.format("User %s already register %s.", user.getUsername(), r.getEvent().getName())));
            }
        }

        // 檢查 partner 至多報名兩個項目
        User partner = userRepository.findById(partnerUid).get();
        //partner: 自己曾報名場數+被別人報名場數+這次被報名場數（一定是1）
        if ((partner.getRegistrations().size() + registrationRepository.findAllByPartnerUid(partnerUid).size()
                + 1) > 2) {
            return ResponseEntity.badRequest().body(
                    new MessageResponse(false, String.format("One user(%s) can at most register 2 events.", partner.getUsername())));
        } else {
            //存入 db
            registration.get().setPartnerUid(partnerUid);
            registrationRepository.save(registration.get());
        }

        return ResponseEntity.ok(new EventRegistrationResponse(true,
                registrationConvertToEventRegistrationData(
                        registration.get())));
    }
    private EventRegistrationData registrationConvertToEventRegistrationData(
            Registration r) {
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
        return EventRegistrationData.builder()
                .eventId(r.getId())
                .typeId(r.getEvent().getId())
                .competitors(competitors)
                .status(r.getStatus())
                .payer(r.getPayerUid())
                .account(r.getPayAccount())
                .semester(r.getSemester())
                .registrationId(r.getRegistrationId())
                .build();
    }

    @DeleteMapping("")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> updateEvent(@Valid @RequestBody EventDeleteRequest req) {
        // Event Id not exist
        Optional<Registration> registration = registrationRepository.findById(req.getEventId());
        if (!registration.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new MessageResponse(false, "EventId " + req.getEventId() + " not exist."));
        }

        if (registration.get().getStatus() != 1) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new MessageResponse(false, "不可刪除已繳費的參賽項目"));
        }

        // Invalid to delete other's event
        if (registration.get().getApplier().getId().equals(req.getApplier()) || registration.get().getPartnerUid().equals(req.getApplier())) {
            registrationRepository.deleteById(req.getEventId());
            return ResponseEntity.ok(new SuccessDataResponse(true, "Already deleted eid="+req.getEventId()));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                new MessageResponse(false, "Unauthorized to delete this event."));

    }
}

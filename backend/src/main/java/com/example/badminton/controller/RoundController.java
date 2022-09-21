package com.example.badminton.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import javax.persistence.criteria.CriteriaBuilder.In;
import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.badminton.model.EdgeData;
import com.example.badminton.model.SimpleEdgeData;
import com.example.badminton.model.UserSimpleData2;
import com.example.badminton.model.entity.Registration;
import com.example.badminton.model.entity.Round;
import com.example.badminton.model.entity.User;
import com.example.badminton.model.request.EventsRegistrationRequest;
import com.example.badminton.model.request.InputRoundScore;
import com.example.badminton.model.response.MessageResponse;
import com.example.badminton.model.response.SuccessDataResponse;
import com.example.badminton.repository.RegistrationRepository;
import com.example.badminton.repository.RoundRepository;
import com.example.badminton.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/rounds")
public class RoundController {

    private final RoundRepository roundRepository;

    private final RegistrationRepository registrationRepository;

    private final UserRepository userRepository;

    private Optional<List<UserSimpleData2>> getUserData(Long registrationId) {
        List<UserSimpleData2> data = new ArrayList<UserSimpleData2>();
        Optional<Registration> opt = registrationRepository.findById(registrationId);
        if (!opt.isPresent()) {
            System.out.println("=======RID NOT EXIST: " + registrationId);
            return Optional.empty();
        }
        Registration registration = registrationRepository.findById(registrationId).get();
        User user1 = registration.getApplier();
        data.add(UserSimpleData2.builder()
                                .uid(user1.getId())
                                .username(user1.getUsername())
                                .sid(user1.getSid())
                                .departmentId(user1.getDepartmentId())
                                .degreeId(user1.getDegreeId())
                                .build()
        );
        if (registration.getPartnerUid() != null) {
            User user2 = userRepository.findById(registration.getPartnerUid()).get();
            data.add(UserSimpleData2.builder()
                                    .uid(user2.getId())
                                    .username(user2.getUsername())
                                    .sid(user2.getSid())
                                    .departmentId(user2.getDepartmentId())
                                    .degreeId(user2.getDegreeId())
                                    .build()
            );
        }
        return Optional.of(data);
    }

    @GetMapping("")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    ResponseEntity<?> getRounds(@RequestParam Integer typeId) {

        List<Round> rounds = roundRepository.findAllByTypeId(typeId);

        Set<String> unique_groupps = new HashSet<>();
        for (Round r : rounds) {
            unique_groupps.add(r.getGroupp());
        }

        Map<String, Object> data = new HashMap<>();
        data.put("groupCnt", unique_groupps.size());
        data.put("typeId", typeId);
        data.put("categoryId", 8);
        data.put("isEditable", false);

        for (String g : unique_groupps) {
            List<EdgeData> eachGroupEdgeData = new ArrayList<EdgeData>();
            for (Round r : rounds) {
                if (r.getGroupp().equals(g)) {
                    Optional<List<UserSimpleData2>> competitor1 = getUserData(r.getCompetitorA());
                    Optional<List<UserSimpleData2>> competitor2 = getUserData(r.getCompetitorB());
                    if (!competitor1.isPresent()) {
                        return ResponseEntity
                                .badRequest()
                                .body(new MessageResponse(false, "Rid not found: " + r.getCompetitorA()));
                    }
                    if (!competitor2.isPresent()) {
                        return ResponseEntity
                                .badRequest()
                                .body(new MessageResponse(false, "Rid not found: " + r.getCompetitorB()));
                    }

                    if (r.getScoreA() == null) {
                        eachGroupEdgeData.add(EdgeData.builder()
                                                      .groupIndex(r.getGroupIndex())
                                                      .groupCompeteId(r.getGroupCompeteId())
                                                      .typeIndex(r.getTypeIndex())
                                                      .startTime(r.getExpectedStartTime().toString())
                                                      .player1(competitor1.get())
                                                      .player2(competitor2.get())
                                                      .build()
                        );
                    } else {
                        final Optional<List<UserSimpleData2>> winner = getUserData(r.getWinner());
                        if (!winner.isPresent()) {
                            return ResponseEntity
                                    .badRequest()
                                    .body(new MessageResponse(false, "Rid not found: " + r.getWinner()));
                        }
                        eachGroupEdgeData.add(EdgeData.builder()
                                                      .groupIndex(r.getGroupIndex())
                                                      .groupCompeteId(r.getGroupCompeteId())
                                                      .typeIndex(r.getTypeIndex())
                                                      .startTime(r.getExpectedStartTime().toString())
                                                      .player1(competitor1.get())
                                                      .player2(competitor2.get())
                                                      .score1(r.getScoreA())
                                                      .score2(r.getScoreB())
                                                      .winner(winner.get())
                                                      .build()
                        );
                    }

                }
            }
            data.put(g, eachGroupEdgeData);
        }

        return ResponseEntity.ok(new SuccessDataResponse(true, data));
    }

    @GetMapping("/detail")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    ResponseEntity<?> getRounds(@RequestParam Integer typeId, @RequestParam Integer typeIndex) {
        Optional<Round> opt = roundRepository.findByTypeIdAndTypeIndex(typeId, typeIndex);
        if (!opt.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(false, String.format("typeId(%d)+typeIndex(%d) not found.", typeId,
                                                                   typeIndex)));
        }
        Round round = opt.get();
        final Optional<List<UserSimpleData2>> competitor1 = getUserData(round.getCompetitorA());
        final Optional<List<UserSimpleData2>> competitor2 = getUserData(round.getCompetitorB());
        if (!competitor1.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(false, "Rid not found: " + round.getCompetitorA()));
        }
        if (!competitor2.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(false, "Rid not found: " + round.getCompetitorB()));
        }

        SimpleEdgeData data;
        if (round.getScoreA() == null) {
            data = SimpleEdgeData.builder()
                                 .typeId(typeId)
                                 .typeIndex(typeIndex)
                                 .player1(competitor1.get())
                                 .player2(competitor2.get())
                                 .build();
        } else {
            final Optional<List<UserSimpleData2>> winner = getUserData(round.getWinner());
            if (!winner.isPresent()) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse(false, "Rid not found: " + round.getWinner()));
            }
            data = SimpleEdgeData.builder()
                                 .typeId(typeId)
                                 .typeIndex(typeIndex)
                                 .player1(competitor1.get())
                                 .player2(competitor2.get())
                                 .score1(round.getScoreA())
                                 .score2(round.getScoreB())
                                 .winner(winner.get())
                                 .build();
        }
        return ResponseEntity.ok(new SuccessDataResponse(true, data));
    }

    @PostMapping("/score")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<?> inputScore(@Valid @RequestBody InputRoundScore req) {
        Optional<Round> opt = roundRepository.findByTypeIdAndTypeIndex(req.getTypeId(), req.getTypeIndex());
        if (!opt.isPresent()) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(false, String.format("typeId(%d)+typeIndex(%d) not found.", req.getTypeId(),
                                                                   req.getTypeIndex())));
        }

        Integer score1 = req.getPlayer1Score();
        Integer score2 = req.getPlayer2Score();

        // check delete score case (temporarily)
        if (score1 == null && score2 == null) {
            Round toSave = opt.get();
            toSave.setScoreA(null);
            toSave.setScoreB(null);
            toSave.setWinner(null);
            roundRepository.save(toSave);
            return ResponseEntity.ok(new MessageResponse(true, "Delete score success!"));
        }

        if (score1 < 21 && score2 < 21) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(false, "Both score1 and score2 are less than 21."));
        }
        if (score1 == score2) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse(false, "score1 should not equal to score2."));
        }


        Round toSave = opt.get();
        toSave.setScoreA(req.getPlayer1Score());
        toSave.setScoreB(req.getPlayer2Score());
        if (req.getPlayer1Score() > req.getPlayer2Score()) {
            toSave.setWinner(toSave.getCompetitorA());
        } else {
            toSave.setWinner(toSave.getCompetitorB());
        }
        roundRepository.save(toSave);
        return ResponseEntity.ok(new MessageResponse(true, "Input score success!"));
    }
}

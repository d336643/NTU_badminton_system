package com.example.badminton.validation;

import java.util.List;
import java.util.Optional;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.example.badminton.exception.UserNotFoundException;
import com.example.badminton.model.EventCreateData;
import com.example.badminton.model.RoleEnum;
import com.example.badminton.model.entity.Role;
import com.example.badminton.model.entity.User;
import com.example.badminton.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class CompetitorNumValidator implements ConstraintValidator<CompetitorNumConstraint, List<EventCreateData>> {

    private final UserRepository userRepository;

    @Override
    public boolean isValid(List<EventCreateData> values, ConstraintValidatorContext context) throws UserNotFoundException{
        //過往已經報超過兩項
        for (EventCreateData e : values) {
            for (Long uid : e.getCompetitors()) {
                Optional<User> opt = userRepository.findById(uid);
                //check uid exist
                if (opt.isPresent()) {
                    //check role is user
                    Boolean isUser = false;
                    for (Role r : opt.get().getRoles()){
                        if (r.getName().equals(RoleEnum.ROLE_USER)){
                            isUser = true;
                            continue;
                        }
                    }
                    if (!isUser) { System.out.println("==The competitor uid's role is not ROLE_USER."); return false; }
                    // check at most register 2 events
                    if(opt.get().getRegistrations().size() + values.size() > 2){
                        System.out.println("==This uid's role is not ROLE_USER.");
                        return false;
                    }

                }
                else{
//                    throw new UserNotFoundException("User " + uid + " not found.");
                    System.out.println("==uid not exist.");
                    return false;
                }
            }
        }
        return true;
    }
}

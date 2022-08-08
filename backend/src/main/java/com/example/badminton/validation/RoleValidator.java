package com.example.badminton.validation;

import com.example.badminton.model.RoleEnum;
import com.example.badminton.model.entity.Role;
import com.example.badminton.model.entity.User;

public class RoleValidator {
    public static Boolean isAdmin(User user){
        for (Role r : user.getRoles()) {
            if (r.getName().equals(RoleEnum.ROLE_ADMIN)) {
                return true;
            }
        }
        return false;
    }

    public static Boolean isUser(User user){
        for (Role r : user.getRoles()) {
            if (r.getName().equals(RoleEnum.ROLE_USER)) {
                return true;
            }
        }
        return false;
    }

}

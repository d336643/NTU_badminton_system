package com.example.badminton.model;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserBasicData {

    private Long id;

    private String username;

    private String sid;

    private Integer degreeId;

    private String departmentId;

    private String birthday;

    private String iid;

    private String email;

    private String phone;

    private String address;

    private Long role;

}

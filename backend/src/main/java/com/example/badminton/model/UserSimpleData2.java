package com.example.badminton.model;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserSimpleData2 {

    private Long uid;

    private String username;

    private String sid;

    private String departmentId;

    private Integer degreeId;

}

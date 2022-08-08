package com.example.badminton.model;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserSimpleData {

    private Long uid;

    private String username;

    private String sid;

}

package com.example.badminton.model;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EventRegistrationData {

    private Long eventId;

    private Long typeId;

    private List<UserSimpleData> competitors;

    private Integer status;

    private Long payer;

    private String account;
}

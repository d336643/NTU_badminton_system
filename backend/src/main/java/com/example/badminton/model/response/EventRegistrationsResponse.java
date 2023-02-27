package com.example.badminton.model.response;

import java.util.List;

import com.example.badminton.model.EventRegistrationData;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EventRegistrationsResponse implements ResponseModel{

    private Boolean success;

    private List<EventRegistrationData> events;

}

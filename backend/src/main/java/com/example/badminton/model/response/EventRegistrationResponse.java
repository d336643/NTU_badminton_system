package com.example.badminton.model.response;

import com.example.badminton.model.EventRegistrationData;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EventRegistrationResponse implements ResponseModel{

    private Boolean success;

    private EventRegistrationData event;

}

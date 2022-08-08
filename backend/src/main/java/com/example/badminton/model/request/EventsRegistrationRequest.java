package com.example.badminton.model.request;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.example.badminton.model.EventData;
import com.example.badminton.model.entity.Event;
import com.example.badminton.validation.CompetitorNumConstraint;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EventsRegistrationRequest {

    @NotNull
    private Long applier;


//    @CompetitorNumConstraint
    @Size(min=1, max=2)
    private List<@Valid EventData> events;

}

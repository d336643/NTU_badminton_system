package com.example.badminton.model.request;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.example.badminton.model.EventCreateData;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EventsCreateRequest {

    @NotNull
    private Long applier;


//    @CompetitorNumConstraint
    @Size(min=1, max=2)
    private List<@Valid EventCreateData> events;

}

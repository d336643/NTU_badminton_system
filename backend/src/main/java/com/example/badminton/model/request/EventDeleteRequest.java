package com.example.badminton.model.request;

import com.example.badminton.model.EventUpdateData;
import lombok.Builder;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Data
@Builder
public class EventDeleteRequest {

    @NotNull
    private Long applier;

    @NotNull
    private Long eventId;

}

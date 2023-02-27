package com.example.badminton.model.request;

import com.example.badminton.model.EventUpdateData;
import lombok.Builder;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Data
@Builder
public class EventUpdateRequest {

    @NotNull
    private Long applier;

    @Valid
    private EventUpdateData event;

}

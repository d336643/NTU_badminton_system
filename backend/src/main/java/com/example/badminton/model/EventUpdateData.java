package com.example.badminton.model;

import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@Builder
public class EventUpdateData {

    @NotNull
    private Long eventId;

    @NotNull
    @Min(1)
    @Max(5)
    private Integer typeId;

    @Size(min=1, max=2)
    private List<Long> competitors;

}

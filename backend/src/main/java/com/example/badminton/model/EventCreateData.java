package com.example.badminton.model;

import java.util.List;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EventCreateData {

    @NotNull
    @Min(1)
    @Max(5)
    private Integer typeId;

    @NotNull
    private String semester;

    @Size(min=1, max=2)
    private List<Long> competitors;

}

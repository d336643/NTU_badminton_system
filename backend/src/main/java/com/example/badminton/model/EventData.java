package com.example.badminton.model;

import java.util.List;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EventData {

    @NotNull
    @Min(1)
    @Max(5)
    private Integer typeId;

    @Size(min=1, max=2)
    private List<Long> competitors;

}

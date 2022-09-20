package com.example.badminton.model.request;

import javax.validation.constraints.NotNull;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InputRoundScore {

    @NotNull
    private Integer typeId;

    @NotNull
    private Integer typeIndex;

    @NotNull
    private Integer player1Score;

    @NotNull
    private Integer player2Score;

}

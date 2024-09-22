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
    private String semester;

    private Integer player1Score;


    private Integer player2Score;

}

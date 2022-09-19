package com.example.badminton.model;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EdgeData {

    private Integer groupIndex;

    private Integer groupCompeteId;

    private Integer typeIndex;

    private List<UserSimpleData2> player1;

    private List<UserSimpleData2> player2;

    private Integer score1;

    private Integer score2;

    private List<UserSimpleData2> winner;

}

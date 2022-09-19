package com.example.badminton.model.entity;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table( name = "rounds",
        uniqueConstraints={
        @UniqueConstraint(columnNames = {"typeId", "typeIndex"})
})
@Entity
public class Round {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    //項目
    private Integer typeId;

    //場次
    private Integer typeIndex;

    //循環賽組別
    private String groupp;

    //循環賽組別類別
    private Integer groupCompeteId;

    //邊的位置
    private Integer groupIndex;

    //參賽總類
    private Integer categoryId;

    private Long competitorA;

    private Long competitorB;

    private Integer scoreA;

    private Integer scoreB;

    private Long winner;

    private Integer court;

    private Long retireCompetitor;

    private java.sql.Timestamp expectedStartTime;

    private java.sql.Timestamp expectedEndTime;

    private Integer expectedDuration;

    private java.sql.Timestamp startTime;

    private java.sql.Timestamp endTime;

    private Integer duration;

}

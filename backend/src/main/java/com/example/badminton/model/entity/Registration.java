package com.example.badminton.model.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @ManyToOne
    @ToString.Exclude
    @JoinColumn(name = "user_id")
    private User applier;

    @ManyToOne
    @ToString.Exclude
    @JoinColumn(name = "event_id")
    private Event event;

    private Long partnerUid;

    private Long payerUid;

    private Long verifierUid;

    @NotNull
    @Min(1)
    @Max(3)
    @Column(columnDefinition = "integer default 1")
    private Integer status;

    @Column(name = "pay_account")
    String payAccount;

}

package com.example.badminton.model.request;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PayStatusToPaidRequest {

    @NotNull
    private Long verifier;

    @NotNull
    private List<Long> eventsToPay;

    @NotNull
    private List<Long> eventsToUnpay;

}

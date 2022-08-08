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
public class BankAccountRegistration {

    @NotNull
    private Long payer;

    @NotEmpty
    @Size(min=1, max=2)
    private List<Long> eventsToPay;

    @NotBlank
    @Size(min = 5, max = 5)
    private String account;

}

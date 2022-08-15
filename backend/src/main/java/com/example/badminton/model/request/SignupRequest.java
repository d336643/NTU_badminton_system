package com.example.badminton.model.request;

import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
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
public class SignupRequest {

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 20)
    private String sid;

    @NotNull
    @Min(1)
    @Max(12)
    private Integer degreeId;

    @NotBlank
    @Size(min = 4, max = 4)
    private String departmentId;

    @NotBlank
    @Size(min = 10, max = 10)
    private String birthday;

    @NotBlank
    @Size(max = 10)
    private String iid;

    @NotBlank
    @Size(max = 10)
    private String phone;

    @NotBlank
    @Size(max = 50)
    private String address;

    @NotBlank
    @Size(min = 8, max = 20)
    private String password;

    private Set<String> role;
}

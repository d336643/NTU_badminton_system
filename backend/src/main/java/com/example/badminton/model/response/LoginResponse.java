package com.example.badminton.model.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse implements ResponseModel  {

    private Boolean success;

    private String token;

    private Long uid;

    private Long role;

    private String msg;
}

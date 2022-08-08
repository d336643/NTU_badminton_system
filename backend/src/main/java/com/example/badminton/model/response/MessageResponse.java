package com.example.badminton.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MessageResponse {

    private Boolean success;

    private String msg;
}

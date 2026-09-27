package com.studymate.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignupResponse {

    private Integer userId;
    private String email;
    private String nickname;
}

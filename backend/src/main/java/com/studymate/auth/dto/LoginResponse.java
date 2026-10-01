package com.studymate.auth.dto;

import com.studymate.user.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {

    private Integer userId;
    private Role role;
}

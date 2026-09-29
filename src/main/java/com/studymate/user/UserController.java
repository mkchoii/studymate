package com.studymate.user;

import com.studymate.user.dto.FinalGoalRequest;
import com.studymate.user.dto.FinalGoalResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user/me")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PutMapping("/final-goal")
    public ResponseEntity<FinalGoalResponse> updateFinalGoal(@Valid @RequestBody FinalGoalRequest request, Authentication authentication) {

        Integer userId = (Integer) authentication.getPrincipal();

        FinalGoalResponse response = userService.updateFinalGoal(userId, request);

        return ResponseEntity.ok(response);
    }
}

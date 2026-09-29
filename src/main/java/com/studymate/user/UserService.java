package com.studymate.user;

import com.studymate.BusinessException;
import com.studymate.user.dto.FinalGoalRequest;
import com.studymate.user.dto.FinalGoalResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public FinalGoalResponse updateFinalGoal(Integer userId, FinalGoalRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.NOT_FOUND,
                        "사용자를 찾을 수 없습니다."
                ));

        user.updateFinalGoal(request.getFinalGoal());

        User savedUser = userRepository.save(user);

        return new FinalGoalResponse(
                savedUser.getFinalGoal()
        );
    }
}

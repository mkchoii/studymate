package com.studymate.goal;

import com.studymate.BusinessException;
import com.studymate.goal.dto.*;
import com.studymate.user.User;
import com.studymate.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    public GoalResponse createGoal(Integer userId, GoalCreateRequest request) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.NOT_FOUND,
                        "사용자를 찾을 수 없습니다."
                ));

        Goal goal = new Goal(
                request.getCategory(),
                request.getGoalName(),
                user
        );

        Goal savedGoal = goalRepository.save(goal);

        return new GoalResponse(
                savedGoal.getId(),
                savedGoal.getCategory(),
                savedGoal.getGoalName(),
                savedGoal.getCreatedAt()
        );
    }

    public GoalListResponse getGoals(Integer userId) {

        List<GoalResponse> goals = goalRepository.findAllByUserId(userId)
                .stream()
                .map(goal -> new GoalResponse(
                        goal.getId(),
                        goal.getCategory(),
                        goal.getGoalName(),
                        goal.getCreatedAt()
                ))
                .toList();

        return new GoalListResponse(goals);
    }

    public GoalResponse updateGoal(Integer userId, Integer goalId, GoalUpdateRequest request) {

        if (request.getCategory() == null && request.getGoalName() == null) {
            throw new BusinessException(
                    HttpStatus.BAD_REQUEST,
                    "수정할 내용을 입력해주세요."
            );
        }

        if (request.getGoalName() != null && request.getGoalName().isBlank()) {
            throw new BusinessException(
                    HttpStatus.BAD_REQUEST,
                    "세부 목표명을 입력해주세요."
            );
        }

        Goal goal = goalRepository.findByIdAndUserId(goalId, userId)
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.NOT_FOUND,
                        "목표를 찾을 수 없습니다."
                ));

        if (request.getCategory() != null) {
            goal.updateCategory(request.getCategory());
        }

        if (request.getGoalName() != null) {
            goal.updateGoalName(request.getGoalName());
        }

        Goal savedGoal = goalRepository.save(goal);

        return new GoalResponse(
                savedGoal.getId(),
                savedGoal.getCategory(),
                savedGoal.getGoalName(),
                savedGoal.getCreatedAt()
        );
    }

    public void deleteGoal(Integer userId, Integer goalId) {

        Goal goal = goalRepository.findByIdAndUserId(goalId, userId)
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.NOT_FOUND,
                        "세부 목표를 찾을 수 없습니다."
                ));

        goalRepository.delete(goal);
    }
}

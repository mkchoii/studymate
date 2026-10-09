package com.studymate.task;

import com.studymate.BusinessException;
import com.studymate.ProgressService;
import com.studymate.goal.Goal;
import com.studymate.goal.GoalRepository;
import com.studymate.task.dto.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final ProgressService progressService;

    private final TaskRepository taskRepository;
    private final GoalRepository goalRepository;

    @Transactional
    public TaskResponse createTask(Integer userId, TaskCreateRequest request) {

        Goal goal = goalRepository.findByIdAndUserId(request.getGoalId(), userId)
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.NOT_FOUND,
                        "세부 목표를 찾을 수 없습니다."
                ));

        Task task = new Task(
                goal,
                request.getTaskDate(),
                request.getContent()
        );

        Task savedTask = taskRepository.save(task);

        ProgressResponse progress = progressService.getProgress(userId);

        return new TaskResponse(
                savedTask.getId(),
                savedTask.getGoal().getId(),
                savedTask.getTaskDate(),
                savedTask.getContent(),
                savedTask.getCreatedAt(),
                savedTask.isCompleted(),
                progress.getWeeklyProgress(),
                progress.getGoalProgress()
        );
    }

    @Transactional
    public TaskResponse updateTask(Integer userId, Integer taskId, TaskUpdateRequest request) {

        Task task = taskRepository.findByIdAndGoalUserId(taskId, userId)
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.NOT_FOUND,
                        "태스크를 찾을 수 없습니다."
                ));

        task.updateContent(request.getContent());

        Task savedTask = taskRepository.save(task);

        return new TaskResponse(
                savedTask.getId(),
                savedTask.getGoal().getId(),
                savedTask.getTaskDate(),
                savedTask.getContent(),
                savedTask.getCreatedAt(),
                savedTask.isCompleted(),
                null,
                null
        );
    }

    @Transactional
    public ProgressResponse deleteTask(Integer userId, Integer taskId) {

        Task task = taskRepository.findByIdAndGoalUserId(taskId, userId)
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.NOT_FOUND,
                        "태스크를 찾을 수 없습니다."
                ));

        taskRepository.delete(task);

        return progressService.getProgress(userId);
    }

    @Transactional
    public TaskCompletionResponse completeTask(Integer userId, Integer taskId, TaskCompletionRequest request) {

        Task task = taskRepository.findByIdAndGoalUserId(taskId, userId)
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.NOT_FOUND,
                        "태스크를 찾을 수 없습니다."
                ));

        task.updateCompleted(request.getIsCompleted());

        Task savedTask = taskRepository.save(task);

        ProgressResponse progress = progressService.getProgress(userId);

        return new TaskCompletionResponse(
                savedTask.getId(),
                savedTask.isCompleted(),
                progress.getWeeklyProgress(),
                progress.getGoalProgress()
        );
    }
}

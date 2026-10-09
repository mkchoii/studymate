package com.studymate.task;

import com.studymate.task.dto.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody TaskCreateRequest request, Authentication authentication) {

        Integer userId = (Integer) authentication.getPrincipal();

        TaskResponse response = taskService.createTask(userId, request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PatchMapping("/{taskId}")
    public ResponseEntity<TaskResponse> updateTask(@PathVariable Integer taskId, @Valid @RequestBody TaskUpdateRequest request, Authentication authentication) {

        Integer userId = (Integer) authentication.getPrincipal();

        TaskResponse response = taskService.updateTask(userId, taskId, request);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<ProgressResponse> deleteTask(@PathVariable Integer taskId, Authentication authentication) {

        Integer userId = (Integer) authentication.getPrincipal();

        ProgressResponse response = taskService.deleteTask(userId, taskId);

        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{taskId}/completion")
    public ResponseEntity<TaskCompletionResponse> completeTask(@PathVariable Integer taskId, @Valid @RequestBody TaskCompletionRequest request, Authentication authentication) {

        Integer userId = (Integer) authentication.getPrincipal();

        TaskCompletionResponse response = taskService.completeTask(userId, taskId, request);

        return ResponseEntity.ok(response);
    }
}

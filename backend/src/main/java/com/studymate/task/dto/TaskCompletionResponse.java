package com.studymate.task.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TaskCompletionResponse {

    private Integer taskId;
    private boolean isCompleted;
}

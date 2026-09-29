package com.studymate.task.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class TaskResponse {

    private Integer taskId;
    private Integer goalId;
    private LocalDate taskDate;
    private String content;
    private LocalDateTime createdAt;
    private Boolean isCompleted;
}

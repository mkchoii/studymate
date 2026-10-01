package com.studymate.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DashboardTaskResponse {

    private Integer taskId;
    private String taskName;
    private boolean isCompleted;
}

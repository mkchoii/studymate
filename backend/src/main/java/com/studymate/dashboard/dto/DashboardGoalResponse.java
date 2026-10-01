package com.studymate.dashboard.dto;

import com.studymate.goal.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class DashboardGoalResponse {

    private Integer goalId;
    private String goalName;
    private Category category;
    private List<DashboardTaskResponse> tasks;
}

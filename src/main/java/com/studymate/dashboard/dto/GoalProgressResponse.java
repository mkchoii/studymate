package com.studymate.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GoalProgressResponse {

    private Integer goalId;
    private String goalName;
    private int achievementRate;
}

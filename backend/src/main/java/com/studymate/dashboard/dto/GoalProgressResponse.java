package com.studymate.dashboard.dto;

import com.studymate.goal.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GoalProgressResponse {

    private Integer goalId;
    private String goalName;
    private Category category;
    private int achievementRate;
}

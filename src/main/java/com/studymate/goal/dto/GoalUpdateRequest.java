package com.studymate.goal.dto;

import com.studymate.goal.Category;
import lombok.Getter;

@Getter
public class GoalUpdateRequest {

    private Category category;
    private String goalName;
}

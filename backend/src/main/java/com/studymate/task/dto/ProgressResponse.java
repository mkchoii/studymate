package com.studymate.task.dto;

import com.studymate.dashboard.dto.GoalProgressResponse;
import com.studymate.dashboard.dto.WeeklyProgressResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ProgressResponse {

    private WeeklyProgressResponse weeklyProgress;
    private List<GoalProgressResponse> goalProgress;
}

package com.studymate.study.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class StudyMemberGoalResponse {

    private Integer goalId;
    private String goalName;
    private List<StudyMemberTaskResponse> tasks;
}

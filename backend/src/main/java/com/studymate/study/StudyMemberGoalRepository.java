package com.studymate.study;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudyMemberGoalRepository extends JpaRepository<StudyMemberGoal, Integer> {

    List<StudyMemberGoal> findAllByStudyMemberId(Integer studyMemberId);
    void deleteAllByStudyMemberId(Integer studyMemberId);
}

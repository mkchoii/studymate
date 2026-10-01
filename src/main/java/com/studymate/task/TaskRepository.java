package com.studymate.task;

import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    Optional<Task> findByIdAndGoalUserId(Integer taskId, Integer userId);

    List<Task> findAllByGoalUserIdAndTaskDate(Integer userId, LocalDate taskDate);

    List<Task> findAllByGoalUserIdAndTaskDateBetween(
            Integer userId,
            LocalDate startDate,
            LocalDate endDate
    );

    List<Task> findAllByGoalIdInAndTaskDateBetween(
            List<Integer> goalIds,
            LocalDate startDate,
            LocalDate endDate
    );

    List<Task> findAllByGoalIdAndTaskDateBetween(
            Integer goalId,
            LocalDate startDate,
            LocalDate endDate
    );
}

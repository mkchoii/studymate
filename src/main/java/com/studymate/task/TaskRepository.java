package com.studymate.task;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Integer> {

    Optional<Task> findByIdAndGoalUserId(Integer taskId, Integer userId);
}

package com.studymate.task;

import com.studymate.goal.Goal;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "tasks")
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "goal_id", nullable = false)
    private Goal goal;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private boolean isCompleted = false;

    @Column(nullable = false)
    private LocalDate taskDate;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {this.createdAt = LocalDateTime.now();}

    public Task(Goal goal, LocalDate taskDate, String content) {
        this.goal = goal;
        this.taskDate = taskDate;
        this.content = content;
    }

    public void updateContent(String content) {this.content = content;}

    public void updateCompleted(boolean isCompleted) {this.isCompleted = isCompleted;}
}

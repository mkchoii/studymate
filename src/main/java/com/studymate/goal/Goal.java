package com.studymate.goal;

import com.studymate.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "goals")
@NoArgsConstructor
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @Column(nullable = false)
    private String goalName;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Goal(Category category, String goalName, User user) {
        this.category = category;
        this.goalName = goalName;
        this.user = user;
    }

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }

    public void updateCategory(Category category) {
        this.category = category;
    }

    public void updateGoalName(String goalName) {
        this.goalName = goalName;
    }

}

package com.studymate.dashboard;

import com.studymate.BusinessException;
import com.studymate.dashboard.dto.*;
import com.studymate.goal.Goal;
import com.studymate.goal.GoalRepository;
import com.studymate.task.Task;
import com.studymate.task.TaskRepository;
import com.studymate.user.User;
import com.studymate.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final GoalRepository goalRepository;
    private final TaskRepository taskRepository;

    public DashboardResponse getDashboard(Integer userId, LocalDate date) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new BusinessException(
                        HttpStatus.NOT_FOUND,
                        "사용자를 찾을 수 없습니다."
                ));

        List<Goal> goals = goalRepository.findAllByUserId(userId);

        // 1. 주간 범위 계산
        LocalDate weekStart = date.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate weekEnd = date.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

        // 2. 주간 태스크 조회
        List<Task> weeklyTasks = taskRepository.findAllByGoalUserIdAndTaskDateBetween(
                userId,
                weekStart,
                weekEnd
        );

        // 3. weeklyProgress 계산
        int totalCount = weeklyTasks.size();
        int completedCount = (int) weeklyTasks.stream()
                .filter(Task::isCompleted)
                .count();
        int inProgressCount = totalCount - completedCount;
        int achievementRate = totalCount == 0 ? 0 : (int) (completedCount * 100.0 / totalCount);

        WeeklyProgressResponse weeklyProgress = new WeeklyProgressResponse(
                achievementRate,
                inProgressCount,
                completedCount
        );

        // 4. goalProgress 계산
        List<GoalProgressResponse> goalProgress = goals.stream()
                .map(goal -> {
                        List<Task> goalWeeklyTasks = weeklyTasks.stream()
                                .filter(task ->
                                        task.getGoal().getId().equals(goal.getId())
                                )
                                .toList();

                        int goalTotalCount = goalWeeklyTasks.size();
                        int goalCompletedCount = (int) goalWeeklyTasks.stream()
                                .filter(Task::isCompleted)
                                .count();
                        int goalAchievementRate = goalTotalCount == 0 ? 0 : (int) (goalCompletedCount * 100.0 / goalTotalCount);

                        return new GoalProgressResponse(
                                goal.getId(),
                                goal.getGoalName(),
                                goalAchievementRate
                        );
                })
                .toList();

        // 5. 선택한 날짜의 태스크 조회
        List<Task> dailyTasks = taskRepository.findAllByGoalUserIdAndTaskDate(
                userId,
                date
        );
        List<DashboardGoalResponse> dashboardGoals = goals.stream()
                .map(goal -> {
                        List<DashboardTaskResponse> tasks = dailyTasks.stream()
                                .filter(task ->
                                        task.getGoal().getId().equals(goal.getId())
                                )
                                .map(task -> new DashboardTaskResponse(
                                        task.getId(),
                                        task.getContent(),
                                        task.isCompleted(),
                                        task.getCreatedAt()
                                ))
                                .toList();

                        return new DashboardGoalResponse(
                                goal.getId(),
                                goal.getGoalName(),
                                goal.getCategory(),
                                tasks
                        );
                })
                .toList();

        return new DashboardResponse(
                user.getFinalGoal(),
                user.getNickname(),
                date,
                weeklyProgress,
                goalProgress,
                dashboardGoals
        );
    }
}

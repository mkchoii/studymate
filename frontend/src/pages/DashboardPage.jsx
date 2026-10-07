import { useEffect, useState } from 'react';
import { updateFinalGoal } from '../api/userApi';

import UserHeader from '../components/layout/UserHeader';
import GoalSummaryCard from '../components/dashboard/GoalSummaryCard';
// import PersonalizedProgressCard from '../components/dashboard/PersonalizedProgressCard';
import WeekCalendar from '../components/dashboard/WeekCalendar';
import TaskListCard from '../components/dashboard/TaskListCard';
import FinalGoalEditModal from '../components/modal/FinalGoalEditModal';

import vectorIcon from '../assets/icons/vector.svg';

import {
    getDashboard,
    updateTaskCompletion,
    updateTask,
} from '../api/dashboardApi';

import './DashboardPage.css';

function DashboardPage() {
    const [dashboard, setDashboard] = useState(null);

    const [topCardMode, setTopCardMode] = useState('finalGoal');

    const [
        isFinalGoalEditModalOpen,
        setIsFinalGoalEditModalOpen,
    ] = useState(false);

    const [finalGoalInput, setFinalGoalInput] = useState('');

    const loadDashboard = async (date) => {
        try {
            const data = await getDashboard(date);
            setDashboard(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    const handleClickMore = () => {
        setTopCardMode((prev) =>
            prev === 'finalGoal'
                ? 'personalized'
                : 'finalGoal'
        );
    };

    const handleSelectDate = (date) => {
        loadDashboard(date);
    };

    const handleCheckTask = async (taskId, isCompleted) => {
        try {
            const updatedTask = await updateTaskCompletion(
                taskId,
                !isCompleted
            );

            setDashboard((prev) => ({
                ...prev,
                goals: prev.goals.map((goal) => ({
                    ...goal,
                    tasks: goal.tasks.map((task) =>
                        task.taskId === updatedTask.taskId
                            ? {
                                ...task,
                                isCompleted: updatedTask.isCompleted,
                            }
                            : task
                    ),
                })),
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditTask = async (taskId, content) => {
        try {
            const updatedTask = await updateTask(taskId, content);

            setDashboard((prev) => ({
                ...prev,
                goals: prev.goals.map((goal) => ({
                    ...goal,
                    tasks: goal.tasks.map((task) =>
                        task.taskId === updatedTask.taskId
                            ? {
                                ...task,
                                content: updatedTask.content,
                            }
                            : task
                    ),
                })),
            }));

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    // 최종 목표 수정 팝업 열기
    const handleOpenFinalGoalEditPopup = () => {
        console.log('최종 목표 수정 클릭');

        setFinalGoalInput(dashboard.finalGoal ?? '');
        setIsFinalGoalEditModalOpen(true);
    };

    // 최종 목표 수정 팝업 닫기
    const handleCloseFinalGoalEditPopup = () => {
        setFinalGoalInput('');
        setIsFinalGoalEditModalOpen(false);
    };

    // 최종 목표 수정
    const handleConfirmFinalGoal = async () => {
        const trimmedValue = finalGoalInput.trim();

        // 빈 값이면 기존 값 유지하고 팝업만 닫기
        if (!trimmedValue) {
            setFinalGoalInput('');
            setIsFinalGoalEditModalOpen(false);
            return;
        }

        try {
            const updated = await updateFinalGoal(trimmedValue);

            setDashboard((prev) => ({
                ...prev,
                finalGoal: updated.finalGoal,
            }));

            setFinalGoalInput('');
            setIsFinalGoalEditModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    if (!dashboard) {
        return <div>대시보드를 불러오는 중입니다...</div>;
    }

    console.log(
        'isFinalGoalEditModalOpen:',
        isFinalGoalEditModalOpen
    );
    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <UserHeader />

                <main className="dashboard-content">
                    <button
                        type="button"
                        className="dashboard-more-button"
                        onClick={handleClickMore}
                    >
                        더보기

                        <img
                            src={vectorIcon}
                            alt=""
                            className="dashboard-more-icon"
                        />
                    </button>

                    {topCardMode === 'finalGoal' ? (
                        <GoalSummaryCard
                            finalGoal={dashboard.finalGoal}
                            weeklyProgress={dashboard.weeklyProgress}
                            onClickEditIcon={
                                handleOpenFinalGoalEditPopup
                            }
                        />
                    ) : (
                        <div className="personalized-progress-placeholder">
                            개인화 진행률
                        </div>
                    )}

                    <WeekCalendar
                        selectedDate={dashboard.selectedDate}
                        onSelectDate={handleSelectDate}
                    />

                    <TaskListCard
                        goals={dashboard.goals}
                        onCheckTask={handleCheckTask}
                        onEditTask={handleEditTask}
                    />
                </main>

                {isFinalGoalEditModalOpen && (
                    <FinalGoalEditModal
                        value={finalGoalInput}
                        onChangeText={setFinalGoalInput}
                        onConfirm={handleConfirmFinalGoal}
                        onClose={handleCloseFinalGoalEditPopup}
                    />
                )}
            </div>
        </div>
    );
}

export default DashboardPage;
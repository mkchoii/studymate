import GoalGroupedTaskList from './GoalGroupedTaskList';

function TaskListCard({ goals, onCheckTask, onEditTask }) {
    return (
        <section className="task-section">
            <button
                type="button"
                className="goal-manage-button"
            >
                세부목표 관리
            </button>
        
            <div className="task-list-card">
                {goals.slice(0, 3).map((goal) => (
                    <GoalGroupedTaskList
                        key={goal.goalId}
                        goal={goal}
                        onCheckTask={onCheckTask}
                        onEditTask={onEditTask}
                    />
                ))}
            </div>
        </section>
    );
}

export default TaskListCard;
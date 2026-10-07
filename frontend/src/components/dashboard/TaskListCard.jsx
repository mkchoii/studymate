import GoalGroupedTaskList from './GoalGroupedTaskList';

function TaskListCard({ 
    selectedDate, 
    goals, 
    onCheckTask, 
    onEditTask, 
    onDeleteTask, 
    onCreateTask,
}) {
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
                        selectedDate={selectedDate}
                        onCheckTask={onCheckTask}
                        onEditTask={onEditTask}
                        onDeleteTask={onDeleteTask}
                        onCreateTask={onCreateTask}
                    />
                ))}
            </div>
        </section>
    );
}

export default TaskListCard;
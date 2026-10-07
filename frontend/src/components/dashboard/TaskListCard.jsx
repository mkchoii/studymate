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
    );
}

export default TaskListCard;
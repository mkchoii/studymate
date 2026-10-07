import { useState } from 'react';
import TaskRow from './TaskRow';

import CategoryChip from '../CategoryChip';
import TaskDetailModal from '../modal/TaskDetailModal';

import chevronUpIcon from '../../assets/icons/chevron-up.svg';
import chevronDownIcon from '../../assets/icons/chevron-down.svg';
import addTaskIcon from '../../assets/icons/add.svg';

function GoalGroupedTaskList({ goal, onCheckTask, onEditTask }) {
    const [isExpanded, setIsExpanded] = useState(true);
    const sortedTasks = [...goal.tasks].sort((a, b) => {
        if (a.isCompleted !== b.isCompleted) {
            return a.isCompleted ? 1 : -1;
        }

        return a.createdAt.localeCompare(b.createdAt);
    });

    const [openTaskId, setOpenTaskId] = useState(null);
    const [taskText, setTaskText] = useState('');

    const handleClickTask = (task) => {
        setOpenTaskId(task.taskId);
        setTaskText(task.content);
    };

    const handleCloseTaskModal = () => {
        setOpenTaskId(null);
        setTaskText('');
    };

    const handleEditTask = async () => {
        const trimmedText = taskText.trim();

        if (!trimmedText) {
            return;
        }

        const success = await onEditTask(
            openTaskId,
            trimmedText
        );

        if (success) {
            setOpenTaskId(null);
            setTaskText('');
        }
    };

    return (
        <div className="goal-task-group">
            <div className="goal-task-header">
                <div className="goal-task-title-area">
                    <CategoryChip
                        category={{
                            value: goal.category,
                            label: goal.category,
                        }}
                        label={goal.goalName}
                    />

                    <button
                        type="button"
                        className="add-task-button"
                    >
                        <img
                            src={addTaskIcon}
                            alt=""
                            className="add-task-icon"
                        />
                    </button>
                </div>

                <button
                    type="button"
                    className="expand-button"
                    onClick={() => setIsExpanded((prev) => !prev)}
                    aria-label={isExpanded ? '접기' : '펼치기'}
                >
                    <img
                        src={isExpanded ? chevronDownIcon : chevronUpIcon}
                        alt=""
                        className="expand-icon"
                    />
                </button>
            </div>

            {isExpanded && (
                <div className="goal-task-rows">
                    {sortedTasks.map((task) => (
                        <TaskRow
                            key={task.taskId}
                            task={task}
                            onCheckTask={onCheckTask}
                            onClickTask={handleClickTask}
                        />
                    ))}
                </div>
            )}

            {openTaskId !== null && (
                <TaskDetailModal
                    text={taskText}
                    onChangeText={setTaskText}
                    onEdit={handleEditTask}
                    onDelete={() => {
                        // 삭제 API 연결 예정
                    }}
                    onClose={handleCloseTaskModal}
                />
            )}
        </div>
    );
}

export default GoalGroupedTaskList;

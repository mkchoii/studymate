import checkboxEmptyIcon from '../../assets/icons/checkbox-empty.svg';
import checkboxCheckedIcon from '../../assets/icons/checkbox-checked.svg';
import './TaskRow.css';

function TaskRow({ task, onCheckTask, onClickTask }) {
    return (
        <div className={`task-row ${task.isCompleted ? 'completed' : ''}`}>
            <button
                type="button"
                className="task-checkbox-button"
                role="checkbox"
                aria-checked={task.isCompleted}
                aria-label={`${task.content} 완료`}
                onClick={() => onCheckTask(task.taskId, task.isCompleted)}
                >
                    <img
                        src={task.isCompleted ? checkboxCheckedIcon : checkboxEmptyIcon}
                        alt=""
                        className="task-checkbox-icon"
                    />
                </button>

                <button
                    type="button"
                    className="task-name-button"
                    onClick={() => onClickTask(task)}
                >
                    {task.content}
                </button>
        </div>
    );
}

export default TaskRow;

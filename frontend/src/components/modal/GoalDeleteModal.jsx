import './GoalDeleteModal.css';
import closeIcon from '../../assets/icons/close.svg';

function GoalDeleteModal({
    goal,
    onConfirm,
    onClose,
}) {
    if (!goal) {
        return null;
    }

    return (
        <div className="goal-delete-overlay">
            <div className="goal-delete-modal">
                <button
                    type="button"
                    className="goal-delete-close"
                    onClick={onClose}
                >
                    <img src={closeIcon} alt="닫기" />
                </button>

                <div className="goal-delete-content">
                    <p className="goal-delete-title">
                        {goal.goalName} 목표를 삭제하시겠습니까?
                    </p>

                    <p className="goal-delete-description">
                        목표에 설정된 전체 태스크가 삭제됩니다
                    </p>

                    <button
                        type="button"
                        className="goal-delete-confirm"
                        onClick={() => onConfirm(goal.goalId)}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GoalDeleteModal;
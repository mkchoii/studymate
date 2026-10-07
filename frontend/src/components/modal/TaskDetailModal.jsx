import './TaskDetailModal.css';

import SmallButton from '../common/SmallButton';
import closeIcon from '../../assets/icons/close.svg';

function TaskDetailModal({
    text,
    onChangeText,
    onEdit,
    onDelete,
    onClose,
}) {
    return (
        <div className="task-detail-modal-overlay">
            <div className="task-detail-modal">
                <button
                    type="button"
                    className="task-detail-modal-close"
                    onClick={onClose}
                    aria-label="팝업 닫기"
                >
                    <img
                        src={closeIcon}
                        alt=""
                        className="task-detail-modal-close-icon"
                    />
                </button>

                <input
                    type="text"
                    className="task-detail-modal-input"
                    value={text}
                    onChange={(e) => onChangeText(e.target.value)}
                />

                <div className="task-detail-modal-buttons">
                    <SmallButton onClick={onEdit}>
                        수정하기
                    </SmallButton>

                    <SmallButton onClick={onDelete}>
                        삭제하기
                    </SmallButton>
                </div>
            </div>
        </div>
    );
}

export default TaskDetailModal;
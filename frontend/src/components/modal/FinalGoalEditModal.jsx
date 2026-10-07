import './FinalGoalEditModal.css';

import SmallButton from '../common/SmallButton';
import closeIcon from '../../assets/icons/close.svg';

function FinalGoalEditModal({
    value,
    onChangeText,
    onConfirm,
    onClose,
}) {
    return (
        <div className="final-goal-modal-overlay">
            <div className="final-goal-edit-modal">
                <button
                    type="button"
                    className="final-goal-modal-close"
                    onClick={onClose}
                    aria-label="팝업 닫기"
                >
                    <img
                        src={closeIcon}
                        alt=""
                        className="final-goal-modal-close-icon"
                    />
                </button>

                <input
                    type="text"
                    className="final-goal-edit-input"
                    value={value}
                    onChange={(e) => onChangeText(e.target.value)}
                />

                <SmallButton onClick={onConfirm}>
                    수정하기
                </SmallButton>
            </div>
        </div>
    );
}

export default FinalGoalEditModal;
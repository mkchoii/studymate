import { useId } from 'react';
import SmallButton from '../common/SmallButton';
import './WithdrawModal.css';

function WithdrawModal({ onWithdraw, onClose, isWithdrawing = false, errorMessage = '' }) {
    const titleId = useId();
    const descriptionId = useId();

    return (
        <div className="withdraw-modal-overlay">
            <div
                className="withdraw-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
            >
                <p id={titleId} className="withdraw-modal-title">
                    정말 탈퇴하시겠습니까?
                </p>
                <p id={descriptionId} className="withdraw-modal-description">
                    탈퇴 시 모든 기록이 삭제됩니다.
                </p>
                {errorMessage && (
                    <p className="withdraw-modal-error" role="alert">
                        {errorMessage}
                    </p>
                )}
                <div className="withdraw-modal-actions">
                    <SmallButton onClick={onWithdraw} disabled={isWithdrawing}>
                        탈퇴하기
                    </SmallButton>
                    <SmallButton onClick={onClose} disabled={isWithdrawing}>
                        유지하기
                    </SmallButton>
                </div>
            </div>
        </div>
    );
}

export default WithdrawModal;

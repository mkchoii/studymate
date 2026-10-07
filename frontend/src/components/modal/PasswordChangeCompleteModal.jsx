import { useId } from 'react';

import SmallButton from '../common/SmallButton';

import './PasswordChangeCompleteModal.css';

function PasswordChangeCompleteModal({ onComplete }) {
    const messageId = useId();

    return (
        <div className="password-complete-overlay">
            <div
                className="password-complete-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby={messageId}
            >
                <p id={messageId} className="password-complete-message">
                    비밀번호 변경이 완료되었습니다.
                </p>

                <SmallButton onClick={onComplete}>
                    확인
                </SmallButton>
            </div>
        </div>
    );
}

export default PasswordChangeCompleteModal;

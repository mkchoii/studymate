import SmallButton from '../common/SmallButton';
import './StudyJoinSuccessModal.css';

function StudyJoinSuccessModal({ studyName, onConfirm }) {
    return (
        <div className="study-join-success-overlay">
            <div
                className="study-join-success-modal"
                role="dialog"
                aria-modal="true"
                aria-label="스터디 가입 완료"
            >
                <div className="study-join-success-message">
                    <strong>{studyName}</strong>
                    <span>스터디 가입이 승인되었습니다.</span>
                    <span>팀 대시보드로 이동합니다.</span>
                </div>

                <div className="study-join-success-action">
                    <SmallButton onClick={onConfirm}>
                        확인
                    </SmallButton>
                </div>
            </div>
        </div>
    );
}

export default StudyJoinSuccessModal;
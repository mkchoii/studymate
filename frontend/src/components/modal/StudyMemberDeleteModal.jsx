import SmallButton from '../common/SmallButton';
import './StudyMemberDeleteModal.css';

function StudyMemberDeleteModal({
    member,
    onConfirm,
    onClose,
    isDeleting = false,
}) {
    if (!member) return null;

    return (
        <div className="study-member-delete-overlay">
            <div
                className="study-member-delete-modal"
                role="dialog"
                aria-modal="true"
                aria-label="멤버 강퇴 확인"
            >
                <div className="study-member-delete-message">
                    <strong>{member.nickname}</strong>
                    <span>정말 강퇴하시겠습니까?</span>
                </div>

                <div className="study-member-delete-buttons">
                    <SmallButton
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? '처리 중...' : '강퇴'}
                    </SmallButton>

                    <SmallButton
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        취소
                    </SmallButton>
                </div>
            </div>
        </div>
    );
}

export default StudyMemberDeleteModal;
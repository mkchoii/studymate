import { profileImages } from '../../assets/profile/profileImages';

import './StudyMemberRow.css';

function StudyMemberRow({ member, onMemberClick }) {
    const achievementRate = Math.max(
        0,
        Math.min(100, member.achievementRate ?? 0)
    );

    const profileImage = profileImages[member.profileImageId];

    return (
        <div className="study-member-row">
            <img
                src={profileImage || profileImages[1]}
                alt={`${member.nickname} 프로필`}
                className="study-member-avatar"
            />

            <div className="study-member-info">
                <button
                    type="button"
                    className="study-member-name"
                    onClick={() => onMemberClick?.(member)}
                >
                    {member.nickname}
                </button>

                <div className="study-member-progress">
                    <div
                        className="study-member-progress-track"
                        role="progressbar"
                        aria-label={`${member.nickname} 달성률`}
                        aria-valuenow={achievementRate}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        <div
                            className="study-member-progress-fill"
                            style={{ width: `${achievementRate}%` }}
                        />
                    </div>

                    <span className="study-member-progress-value">
                        {achievementRate}%
                    </span>
                </div>
            </div>
        </div>
    );
}

export default StudyMemberRow;
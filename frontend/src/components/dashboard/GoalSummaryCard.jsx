import editIcon from '../../assets/icons/edit.svg';

function GoalSummaryCard({ finalGoal, weeklyProgress, onClickEditIcon }) {
    const {
        achievementRate,
        inProgressCount,
        completedCount,
    } = weeklyProgress;

    return (
        <section className="goal-summary-card">
            <div className="final-goal-section">
                <button
                    type="button"
                    className="goal-edit-button"
                    onClick={onClickEditIcon}
                    aria-label="최종 목표 수정"
                >
                    <img
                        src={editIcon}
                        alt="수정"
                        className="goal-edit-icon"
                    />
                </button>

                <p className="goal-summary-label">최종 목표</p>

                <p className={`final-goal-text ${
                    !finalGoal ? 'empty' : ''
                }`}
                >
                    {finalGoal || '최종 목표를 설정해주세요.'}
                </p>
            </div>

            <div className="goal-summary-divider" />

            <div className="weekly-progress-section">
                <p className="weekly-progress-title">
                    주간 달성률 {achievementRate}%
                </p>

                <div className="weekly-progress-bar">
                    <div
                        className="weekly-progress-value"
                        style={{ width: `${achievementRate}%` }}
                    />
                </div>

                <div className="weekly-counts">
                    <div>
                        <span>진행중</span>
                        <strong>{inProgressCount}건</strong>
                    </div>

                    <div className="weekly-count-divider" />

                    <div className="completed-count">
                        <span>완료</span>
                        <strong>{completedCount}건</strong>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default GoalSummaryCard;

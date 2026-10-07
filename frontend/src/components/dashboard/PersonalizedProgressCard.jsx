import './PersonalizedProgressCard.css';
import PersonalizedMessageText from './PersonalizedMessageText';
import GoalProgressBarRow from './GoalProgressBarRow';

function PersonalizedProgressCard({
  nickname,
  selectedGoalId,
  goalProgress = [],
}) {
  const selectedGoal = goalProgress.find(
    (goal) => goal.goalId === selectedGoalId
  );

  return (
    <div className="personalized-progress-card">
      <PersonalizedMessageText
          nickname={nickname}
          selectedGoal={selectedGoal}
      />

      <div className="goal-progress-list">
        {goalProgress.map((goal) => (
          <GoalProgressBarRow
            key={goal.goalId}
            goalName={goal.goalName}
            category={goal.category}
            percent={goal.achievementRate}
          />
        ))}
      </div>
    </div>
  )
}

export default PersonalizedProgressCard;
import CategoryChip from '../CategoryChip';

function GoalProgressBarRow({
  goalName,
  category,
  percent,
}) {
  const categoryClass = `progress-${category.toLowerCase()}`;

  const categoryObject = {
    value: category,
    label: category,
  };

  return (
    <div className="goal-progress-row">
      <div className="goal-progress-header">
        <CategoryChip
          category={categoryObject}
          label={goalName}
          size="small"
        />

          <span className="goal-progress-percent">
            {percent ?? 0}%
          </span>
      </div>

      <div className="goal-progress-background">
        <div className={`goal-progress-fill ${categoryClass}`}
          style={{width: `${percent ?? 0}%`}}
        />
      </div>
    </div>
  );
}

export default GoalProgressBarRow;
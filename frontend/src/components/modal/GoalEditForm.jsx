import { useState } from 'react';
import { CATEGORIES } from '../../categories';
import CategoryChip from '../CategoryChip';
import './GoalEditForm.css';

function GoalEditForm({
    mode = 'edit',
    goal,
    onUpdate,
    onCreate,
    onComplete,
}) {
    const [goalName, setGoalName] = useState(
        goal?.goalName ?? ''
    );

    const [category, setCategory] = useState(
        goal?.category ?? null
    );

    const handleSubmit = async () => {
        const trimmedGoalName = goalName.trim();

        if (!trimmedGoalName || !category) {
            return;
        }

        let success;

        if (mode === 'add') {
            success = await onCreate(
                category,
                trimmedGoalName
            );
        } else {
            success = await onUpdate(
                goal.goalId,
                category,
                trimmedGoalName
            );
        }

        if (success) {
            onComplete();
        }
    };

    return (
        <div className="goal-edit-form">
            <div className="goal-edit-categories">
                {CATEGORIES.map((item) => (
                    <CategoryChip
                        key={item.value}
                        category={item}
                        isSelected={category === item.value}
                        onClick={() => setCategory(item.value)}
                    />
                ))}
            </div>

            <div className="goal-edit-input-row">
                <input
                    type="text"
                    className="goal-edit-input"
                    value={goalName}
                    onChange={(e) => setGoalName(e.target.value)}
                    placeholder='세부목표를 입력해주세요.'
                />

                <button
                    type="button"
                    className="goal-edit-submit"
                    onClick={handleSubmit}
                >
                    {mode === 'add'
                        ? '확인'
                        : '변경하기'}
                </button>
            </div>
        </div>
    );
}

export default GoalEditForm;
import { useState } from 'react';
import CategoryChip from '../CategoryChip';
import './GoalEditForm.css';

const categories = [
    { value: 'CERTIFICATE', label: '자격증' },
    { value: 'LANGUAGE', label: '어학' },
    { value: 'INTERVIEW', label: '면접' },
    { value: 'PORTFOLIO', label: '자기소개서·포트폴리오' },
    { value: 'CAREER_EXPLORATION', label: '직무·기업 탐색' },
    { value: 'ACTIVITY_PROJECT', label: '대외활동·프로젝트' },
    { value: 'STUDY', label: '공부' },
];

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
                {categories.map((item) => (
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
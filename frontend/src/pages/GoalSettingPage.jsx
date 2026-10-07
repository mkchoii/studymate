import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CategoryChip from '../components/CategoryChip';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import trashIcon from '../assets/icons/trash.svg';
import { createGoal } from '../api/goalApi';

import './GoalSettingPage.css';

const categories = [
    { value: 'CERTIFICATE', label: '자격증', placeholder: '정보처리기사, ADsP 등 입력'},
    { value: 'LANGUAGE', label: '어학', placeholder: '토익스피킹, OPIc, 토플 등 입력' },
    { value: 'INTERVIEW', label: '면접', placeholder: '기술 면접, 인성 면접 등 입력' },
    { value: 'PORTFOLIO', label: '자기소개서·포트폴리오', placeholder: '자기소개서, 포트폴리오 등 입력' },
    { value: 'CAREER_EXPLORATION', label: '직무·기업 탐색', placeholder: '백엔드 개발, 데이터 분석 등 입력' },
    { value: 'ACTIVITY_PROJECT', label: '대외활동·프로젝트', placeholder: '공모전, 팀 프로젝트 등 입력' },
    { value: 'STUDY', label: '공부', placeholder: '기타 공부 내용 입력' },
];

function GoalSettingPage() {
    const navigate = useNavigate();

    const nickname = location.state?.nickname;

    const [category, setCategory] = useState(null);
    const [goalName, setGoalName] = useState('');
    const [goalNameError, setGoalNameError] = useState('none');
    const selectedCategory = categories.find(
        (item) => item.value === category
    );

    const handleGoalNameChange = (e) => {
        const value = e.target.value;

        setGoalName(value);

        if (value.length > 10) {
            setGoalNameError('max_length');
        } else {
            setGoalNameError('none');
        }
    };

    const handleReset = () => {
        setCategory(null);
        setGoalName('');
        setGoalNameError('none');
    };

    const handleComplete = async () => {
        try {
            await createGoal(category, goalName);

            navigate('/signup-complete', {
                state: {
                    nickname: nickname,
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    const isDisabled =
        category === null ||
        goalName.trim() === '' ||
        goalNameError !== 'none';

    const errorMessage =
        goalNameError === 'max_length'
            ? '최대 10자 입력만 가능합니다'
            : '';

    return (
        <div className="goal-setting-page">
            <div className="goal-setting-container">

                <h1 className="auth-title">
                    StudyMate
                </h1>

                <p className="goal-setting-description">
                    나는 이런 목표를 달성하고 싶어요
                </p>

                <div className="goal-category-area">
                    <div className="goal-category-header">
                        <span>세부 목표 선택</span>

                        <button
                            type="button"
                            className="goal-reset-button"
                            onClick={handleReset}
                        >
                            <img
                                src={trashIcon}
                                alt="초기화"
                                className="trash-icon"
                            />
                        </button>
                    </div>

                    <div className="category-list">
                        {categories.map((item) => (
                            <CategoryChip
                                key={item.value}
                                category={item}
                                isSelected={category === item.value}
                                onClick={() => setCategory(item.value)}
                            />
                        ))}
                    </div>
                </div>

                <div className="goal-input-area">
                    <Input
                        value={goalName}
                        onChange={handleGoalNameChange}
                        placeholder={
                            selectedCategory
                                ? selectedCategory.placeholder
                                : '카테고리를 먼저 선택해주세요'
                        }
                        errorMessage={errorMessage}
                        disabled={category === null}
                        className="goal-name-input"
                    />
                </div>

                <div className="goal-button-area">
                    <Button
                        disabled={isDisabled}
                        onClick={handleComplete}
                    >
                        완료
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default GoalSettingPage;
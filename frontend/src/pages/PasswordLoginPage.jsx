import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import PasswordInput from '../components/common/PasswordInput';
import Button from '../components/common/Button';
import { login } from '../api/authApi';

import './AuthPage.css';

function PasswordLoginPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    const [pinValue, setPinValue] = useState('');
    const [errorState, setErrorState] = useState('none');

    const handlePinChange = (value) => {
        setPinValue(value);
    };

    const handlePinClick = () => {
        if (errorState === 'invalid') {
            setErrorState('none');
        }
    };

    const handleSubmit = async () => {
        try {
            const data = await login(email, pinValue);

            if (data.hasGoal) {
                navigate('/dashboard');
            } else {
                navigate('/goal-setting');
            }
        } catch (error) {
            setErrorState('invalid');
        }
    };

    const errorMessage =
        errorState === 'invalid'
            ? '비밀번호가 일치하지 않습니다.'
            : '';

    return (
        <div className="auth-page">
            <div className="auth-container">

                <h1 className="auth-title">
                    StudyMate
                </h1>

                <div className="auth-form">
                    <PasswordInput
                        value={pinValue}
                        onChange={handlePinChange}
                        onClick={handlePinClick}
                        placeholder="비밀번호 입력(숫자 4자리)"
                        errorMessage={errorMessage}
                    />

                    <Button
                        disabled={pinValue.length === 0}
                        onClick={handleSubmit}
                    >
                        로그인
                    </Button>
                </div>

            </div>
        </div>
    );
}

export default PasswordLoginPage;
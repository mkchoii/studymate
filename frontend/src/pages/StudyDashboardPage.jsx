import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getStudyDashboard, getStudyMemberDetail } from '../api/studyApi';

import UserHeader from '../components/layout/UserHeader';
import StudyProfileCard from '../components/study/StudyProfileCard';
import StudyMemberList from '../components/study/StudyMemberList';
import StudyMemberDetailModal from '../components/modal/StudyMemberDetailModal';

import './StudyDashboardPage.css';
import vectorIcon from '../assets/icons/vector.svg';

function StudyDashboardPage({ studyId }) {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const [selectedMember, setSelectedMember] = useState(null);
    const [isMemberLoading, setIsMemberLoading] = useState(false);
    const [memberError, setMemberError] = useState('');

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setIsLoading(true);
                setErrorMessage('');

                const data = await getStudyDashboard(studyId);
                setDashboard(data);
            } catch (error) {
                setErrorMessage(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboard();
    }, [studyId]);

    const handleMemberClick = async (member) => {
        try {
            setIsMemberLoading(true);
            setMemberError('');

            const data = await getStudyMemberDetail(
                studyId,
                member.studyMemberId
            );

            setSelectedMember(data);
        } catch (error) {
            setMemberError(error.message);
        } finally {
            setIsMemberLoading(false);
        }
    };

    return (
        <div className="study-dashboard-page">
            <div className="study-dashboard-container">
                <UserHeader />

                <main className="study-dashboard-content">
                    <button
                        type="button"
                        className="study-dashboard-list-button"
                        onClick={() => navigate('/study/list')}
                    >
                        스터디 목록
                        <img
                            src={vectorIcon}
                            alt=""
                            className="study-dashboard-list-icon"
                        />
                    </button>

                    {isLoading ? (
                        <p className="study-dashboard-message">
                            스터디 대시보드를 불러오는 중입니다.
                        </p>
                    ) : errorMessage ? (
                        <p className="study-dashboard-message">
                            {errorMessage}
                        </p>
                    ) : dashboard ? (
                        <>
                            <StudyProfileCard study={dashboard} />

                            <StudyMemberList 
                              members={dashboard.members}
                              onMemberClick={handleMemberClick} 
                            />
                        </>
                    ) : null}
                </main>
                {selectedMember && (
                    <StudyMemberDetailModal
                        member={selectedMember}
                        goals={selectedMember.goals}
                        onClose={() => setSelectedMember(null)}
                    />
                )}
            </div>
        </div>
    );
}

export default StudyDashboardPage;
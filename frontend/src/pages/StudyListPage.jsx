import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudies, joinStudy } from '../api/studyApi';

import UserHeader from '../components/layout/UserHeader';
import StudyCategoryFilter from '../components/study/StudyCategoryFilter';
import StudyCard from '../components/study/StudyCard';
import StudyGoalLinkModal from '../components/modal/StudyGoalLinkModal';
import StudyJoinSuccessModal from '../components/modal/StudyJoinSuccessModal';

import './StudyListPage.css';


function StudyListPage({ isJoined, onJoined }) {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [studies, setStudies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedStudy, setSelectedStudy] = useState(null);
    const [joinedStudy, setJoinedStudy] = useState(null);
    const [joinError, setJoinError] = useState('');
    const [isJoining, setIsJoining] = useState(false);

    useEffect(() => {
        const loadStudies = async () => {
            try {
                setIsLoading(true);

                const data = await getStudies(selectedCategory);

                setStudies(data.studies);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        loadStudies();
    }, [selectedCategory]);

    const handleJoinStudy = async (studyId, goalIds) => {
        if (isJoining) return;

        try {
            setIsJoining(true);
            setJoinError('');

            const result = await joinStudy(studyId, goalIds);

            if (result.joined) {
                setJoinedStudy({
                    ...selectedStudy,
                    studyId: result.studyId,
                });
                setSelectedStudy(null);
            }
        } catch (error) {
            setJoinError(error.message);
        } finally {
            setIsJoining(false);
        }
    };

    return (
        <div className="study-list-page">
          <div className="study-list-container">
            <UserHeader />

            <main className="study-list-content">
                <StudyCategoryFilter
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />

                <p className="study-list-description">
                    개인 대시보드에서 생성한 ‘세부 목표 카테고리’와
                    일치하는 스터디만 참여할 수 있습니다.
                </p>

                {isLoading ? (
                    <p className="study-list-message">
                        스터디를 불러오는 중입니다.
                    </p>
                ) : studies.length === 0 ? (
                    <p className="study-list-message">
                        해당 카테고리의 스터디가 없습니다.
                    </p>
                ) : (
                    <div className="study-card-list">
                        {studies.map((study) => (
                            <StudyCard
                              key={study.studyId}
                              study={study}
                              isJoined={isJoined}
                              onJoin={setSelectedStudy}
                            />
                        ))}
                    </div>
                )}
            </main>
            {selectedStudy && (
                <StudyGoalLinkModal
                    study={selectedStudy}
                    onClose={() => {
                        setSelectedStudy(null);
                        setJoinError('');
                    }}
                    onComplete={handleJoinStudy}
                    isSubmitting={isJoining}
                    submitError={joinError}
                />
            )}

            {joinedStudy && (
                <StudyJoinSuccessModal
                    studyName={joinedStudy.studyName}
                    onConfirm={() => {
                        onJoined(joinedStudy.studyId);
                        navigate('/study');
                    }}
                />
            )}
          </div>
        </div>
    );
}

export default StudyListPage;
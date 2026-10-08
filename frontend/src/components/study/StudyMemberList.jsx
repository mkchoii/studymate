import StudyMemberRow from './StudyMemberRow';

import './StudyMemberList.css';

function StudyMemberList({ members = [], onMemberClick }) {
    // 사용자 본인
    const myMember = members.find((member) => member.me);

    // 다른 멤버: 달성률 내림차순 정렬
    const otherMembers = members
        .filter((member) => !member.me)
        .sort((a, b) =>
            (b.achievementRate ?? 0) - (a.achievementRate ?? 0)
        );

    return (
        <section className="study-member-list">
            <div className="study-member-self">
                {myMember && (
                    <StudyMemberRow 
                      member={myMember}
                      onMemberClick={onMemberClick}
                    />
                )}
            </div>

            <div className="study-member-divider" />

            <div className="study-member-others">
                {otherMembers.map((member) => (
                    <StudyMemberRow
                        key={member.studyMemberId}
                        member={member}
                        onMemberClick={onMemberClick}
                    />
                ))}
            </div>

            <p className="study-member-notice">
                스터디 탈퇴는 관리자에게 문의해 주세요.
            </p>
        </section>
    );
}

export default StudyMemberList;
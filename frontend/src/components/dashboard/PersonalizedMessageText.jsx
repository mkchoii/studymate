function PersonalizedMessageText({
    nickname,
    selectedGoal,
}) {
    if (!selectedGoal) {
        return null;
    }

    const {
        goalName,
        achievementRate,
    } = selectedGoal;

    let message;

    if (achievementRate === null) {
        message =
            `${goalName} 태스크를 설정해서 목표를 달성해보세요.`;
    } else if (achievementRate === 100) {
        message =
            `${nickname}님, \n${goalName} 이번 주 목표를 달성하셨습니다🎉`;
    } else {
        const remainingPercent = 100 - achievementRate;

        message =
            `${nickname}님, \n${goalName} 주간 목표 달성까지 ` +
            `${remainingPercent}% 남았습니다!`;
    }

    return (
        <p className="personalized-message-text">
            {message}
        </p>
    );
}

export default PersonalizedMessageText;
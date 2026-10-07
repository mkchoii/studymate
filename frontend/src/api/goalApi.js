export async function createGoal(category, goalName) {
    const response = await fetch('http://localhost:8080/goals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            category,
            goalName,
        }),
    });

    if (!response.ok) {
        let message = '목표 생성에 실패했습니다.';

        try {
            const data = await response.json();
            message = data.message || message;
        } catch {
            // 응답 body 없음
        }

        throw new Error(message);
    }

    return await response.json();
}
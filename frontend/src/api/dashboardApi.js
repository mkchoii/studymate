export async function getDashboard(date) {
    const url = date
        ? `http://localhost:8080/dashboard?date=${date}`
        : 'http://localhost:8080/dashboard';

    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        let message = '대시보드를 불러오지 못했습니다.';

        try {
            const data = await response.json();
            message = data.message || message;
        } catch {
            // 응답 body가 없는 경우
        }

        throw new Error(message);
    }

    const data = await response.json();
    return {
        ...data,
        goals: data.goals.map((goal) => ({
            ...goal,
            tasks: goal.tasks.map((task) => ({
                ...task,
                isCompleted: task.completed ?? task.isCompleted ?? false,
            })),
        })),
    };
}

export async function updateTaskCompletion(taskId, isCompleted) {
    const response = await fetch(
        `http://localhost:8080/tasks/${taskId}/completion`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                isCompleted,
            }),
        }
    );

    if (!response.ok) {
        let message = '태스크 상태를 변경하지 못했습니다.';

        try {
            const data = await response.json();
            message = data.message || message;
        } catch {
            // response body가 없는 경우
        }

        throw new Error(message);
    }

    const data = await response.json();
    return {
        ...data,
        isCompleted: data.completed ?? data.isCompleted ?? isCompleted,
    };
}

export async function updateTask(taskId, content) {
    const response = await fetch(
        `http://localhost:8080/tasks/${taskId}`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                content,
            }),
        }
    );

    if (!response.ok) {
        let message = '태스크를 수정하지 못했습니다.';

        try {
            const data = await response.json();
            message = data.message || message;
        } catch {
            // response body가 없는 경우
        }
        
        throw new Error(message);
    }

    return await response.json();
}
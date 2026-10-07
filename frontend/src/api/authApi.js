export async function checkEmail(email) {
    const response = await fetch('http://localhost:8080/auth/email-check', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
        },

        credentials: 'include',

        body: JSON.stringify({
            email: email,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

export async function signup(email, password) {
    const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            email,
            password
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

export async function login(email, password) {
    const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
            email,
            password
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;
}

export async function logout() {
    const response = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('로그아웃에 실패했습니다.');
    }
}

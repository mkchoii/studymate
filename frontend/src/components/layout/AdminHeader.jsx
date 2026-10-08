import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/authApi';

import Header from './Header';
import './AdminHeader.css';

function AdminHeader() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('로그아웃 실패:', error);
            alert('로그아웃에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <div className="admin-header">
            <Header />

            <button
                type="button"
                className="admin-logout-button"
                onClick={handleLogout}
            >
                관리자 로그아웃
            </button>
        </div>
    );
}

export default AdminHeader;
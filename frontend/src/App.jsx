import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginEmailPage from './pages/LoginEmailPage';
import PasswordSetupPage from './pages/PasswordSetupPage';
import PasswordLoginPage from './pages/PasswordLoginPage';
import GoalSettingPage from './pages/GoalSettingPage';
import SignupCompletePage from './pages/SignupCompletePage';
import MyPage from './pages/MyPage';
import PasswordChangePage from './pages/PasswordChangePage';
import DashboardPage from './pages/DashboardPage';
import StudyPage from './pages/StudyPage';
import StudyListPage from './pages/StudyListPage';
import AdminStudyListPage from './pages/AdminStudyListPage';
import AdminStudyManagePage from './pages/AdminStudyManagePage';
import AdminStudyCreatePage from './pages/AdminStudyCreatePage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginEmailPage />} />
                <Route path="/signup/password" element={<PasswordSetupPage />} />
                <Route path="/login/password" element={<PasswordLoginPage />} />
                <Route path="/goal-setting" element={<GoalSettingPage />} />
                <Route path="/signup-complete" element={<SignupCompletePage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/password-change" element={<PasswordChangePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/study/*" element={<StudyPage />} />
                <Route path="/admin" element={<AdminStudyListPage />} />
                <Route path="/admin/studies/:studyId" element={<AdminStudyManagePage />} />
                <Route path="/admin/studies/new" element={<AdminStudyCreatePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
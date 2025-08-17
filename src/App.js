import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Homepage from './pages/webpage/Homepage';
import Detailpage from './pages/webpage/Detailpage';
import Sellingpost from './pages/webpage/Sellingpost';
import Paymentpage from './pages/webpage/Paymentpage';
import PaymentComplete from './pages/webpage/PaymentComplete';
import Mypage from './pages/webpage/Mypage';
import Market from './pages/webpage/Market';
import Chat from './pages/webpage/Chat';
import LoginPage from './pages/webpage/LoginPage';
import SignUpPage from './pages/webpage/SignUpPage';
import FindPWPage from './pages/webpage/FindPWPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('auth') === '1';
  });

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('auth', '1');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('auth');
  };

  return (
    <div className="website-main-content">
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              isLoggedIn={isLoggedIn}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          }
        />
        <Route path="/detail/:id" element={<Detailpage />} />
        <Route path="/sellingpost" element={<Sellingpost />} />
        <Route path="/payment" element={<Paymentpage />} />
        <Route path="/paymentcomplete" element={<PaymentComplete />} />
        <Route path="/mypage" element={<Mypage />} />

        <Route
          path="/pagination"
          element={
            <Market
              isLoggedIn={isLoggedIn}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          }
        />

        <Route path="/chat" element={<Chat />} />

        {/* LoginPage에 onLogin 전달 → 로그인 성공 시 App 상태 변경 */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/findpw" element={<FindPWPage />} />
      </Routes>
    </div>
  );
}

export default App;

import Homepage from './pages/webpage/Homepage';
import { Routes, Route } from 'react-router-dom';
import Detailpage from './pages/webpage/Detailpage';
import Sellingpost from './pages/webpage/Sellingpost';
import Paymentpage from './pages/webpage/Paymentpage';
import PaymentComplete from './pages/webpage/PaymentComplete';
import Mypage from './pages/webpage/Mypage';
import Market from './pages/webpage/Market'; // ✅ 추가
import Chat from './pages/webpage/Chat';
import LoginPage from './pages/webpage/LoginPage';
import SignUpPage from './pages/webpage/SignUpPage';
import FindPWPage from './pages/webpage/FindPWPage';

function App() {
  return (
    <div className="website-main-content">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/detail" element={<Detailpage />} />
        <Route path="/sellingpost" element={<Sellingpost/>} />
        <Route path="/payment" element={<Paymentpage/>} />
        <Route path="/paymentcomplete" element={<PaymentComplete/>} />
        <Route path="/mypage" element={<Mypage/>} />
        <Route path="/pagination" element={<Market />} /> {/* ✅ 추가 */}
        <Route path="/chat" element={<Chat />} /> {/* ✅ 이 줄 추가 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/findpw" element={<FindPWPage />} />
      </Routes>
    </div>
  );
}

export default App;

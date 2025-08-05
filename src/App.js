import Homepage from './pages/webpage/Homepage';
import { Routes, Route } from 'react-router-dom';
import Detailpage from './pages/webpage/Detailpage';
import Sellingpost from './pages/webpage/Sellingpost';
import Paymentpage from './pages/webpage/Paymentpage';
import PaymentComplete from './pages/webpage/PaymentComplete';
import Mypage from './pages/webpage/Mypage';

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
      </Routes>
    </div>
  );
}

export default App;

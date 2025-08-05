import Homepage from './pages/webpage/Homepage';
import { Routes, Route } from 'react-router-dom';
import Detailpage from './pages/webpage/Detailpage';
import Sellingpost from './pages/webpage/Sellingpost';
import Paymentpage from './pages/webpage/Paymentpage';
import PaymentComplete from './pages/webpage/PaymentComplete';
import Mypage from './pages/webpage/Mypage';
import ProtectedRoute from './components/webpage/ProtectedRoute';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="website-main-content">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/detail" element={<Detailpage />} />
        <Route
          path="/sellingpost"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Sellingpost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Paymentpage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/paymentcomplete"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <PaymentComplete />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Mypage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

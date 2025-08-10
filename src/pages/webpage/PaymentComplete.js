import './PaymentComplete.css';
import Header from '../../components/webpage/Header';
import { useNavigate } from 'react-router-dom';

const PaymentComplete = () => {
  const navigate = useNavigate();

  return (
    <div className="paymentComplete">
      <div className="container">
        <Header />
        <main className="main-grid">
          <div className="payment-complete">
            <div className="success-icon">✓</div>
            <h2 className="completion-title">결제가 완료되었습니다.</h2>
            <p className="completion-desc">
              주문 내역은 마이페이지에서 확인 가능합니다.
            </p>
            <div className="button-group">
              <button
                className="browse-btn"
                onClick={() => navigate('/pagination')}
              >
                둘러보기
              </button>
              <button
                className="payment-mypage-btn"
                onClick={() => navigate('/mypage')}
              >
                마이페이지로 이동하기
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentComplete;

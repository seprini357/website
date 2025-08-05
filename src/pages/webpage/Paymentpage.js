import './Paymentpage.css';
import Header from '../../components/webpage/Header';
import { useState } from 'react';

const Paymentpage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    zipCode: '',
    address: ''
  });
  
  const [quantity, setQuantity] = useState(1);
  const basePrice = 10000; // 임시 포인트 설정

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handlePayment = () => {
    // 결제 로직 추가 
    console.log('Payment submitted:', { formData, quantity, totalAmount: quantity * basePrice });
  };

  return (
    <div className="paymentpage">
      <div className="container">
        <Header />
        <div className="main-grid">
          <section className="title-section">
            <h2 className="form-title">결제하기</h2>
            <div className="form-desc">배송지 정보를 입력해 주세요.</div>
          </section>
          
          <section className="delivery-form">         
            <div className="delivery-form-group">
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="이름을 입력하세요"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="delivery-form-group">
              <label htmlFor="phone">전화번호</label>
              <div className="phone-input">
                <span className="phone-prefix">+82</span>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="전화번호를 입력하세요"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="delivery-form-group">
              <label htmlFor="zipCode">우편번호</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                placeholder="우편번호를 입력하세요"
                value={formData.zipCode}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="delivery-form-group">
              <label htmlFor="address">주소</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="주소를 입력하세요"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </section>
          
          <section className="payment-section">
            <div className="order-details">
              <div className="product-item">
                <div className="product-info">
                  <div className="product-details">
                    <h4>농작물 상품</h4>
                  </div>
                </div>
                <div className="quantity-control">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange('decrease')}
                  >
                    —
                  </button>
                  <input
                    type="number"
                    className="quantity-input"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    min="1"
                  />
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange('increase')}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            
            <div className="payment-amount">
              <label htmlFor="paymentPoints">결제 금액</label>
              <div id="paymentPoints" className="payment-amount-display">
                {quantity * basePrice} 포인트
              </div>
            </div>
            
            <div className="recipient-info">
              <div className="recipient-avatar">판매자</div>
              <div className="recipient-name">판매자 닉네임</div>
            </div>
            
            <button className="payment-button" onClick={handlePayment}>
              결제하기
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Paymentpage;
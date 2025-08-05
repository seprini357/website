import './Mypage.css';
import Header from '../../components/webpage/Header';
import { useState } from 'react';

const Mypage = () => {
  const [activeTab, setActiveTab] = useState('wishlist');
  const [showPointPopup, setShowPointPopup] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('100.00');
  const [customAmount, setCustomAmount] = useState('0');
  const [point, setPoint] = useState(0);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
    // 프로필 수정 로직 추가
  };

  const handleHeartClick = (productId) => {
    console.log('Heart clicked for product:', productId);
    // 찜 해제 로직 추가
  };

  const handlePointClick = () => {
    setShowPointPopup(true);
  };

  const handleClosePopup = () => {
    setShowPointPopup(false);
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(amount);
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
  };

  const handleTopup = () => {
    const add = parseFloat(customAmount) || 0;
    setPoint(prev => prev + add);
    setShowPointPopup(false);
  };

  // 주문 데이터
  const orderData = [
    {
      id: 1,
      productId: "",
      seller: "",
      purchaseDate: "",
      quantity: "",
      amount: ""
    }
  ];

  const renderWishlistContent = () => (
    <div className="content-section">
      <div className="products-grid">
        {[1, 2, 3].map((item) => (
          <div key={item} className="product-card">
            <div className="wish-product-image">
              상품 이미지
              <div 
                className="heart-icon"
                onClick={() => handleHeartClick(item)}
              >
                ♥
              </div>
            </div>
            <div className="wish-product-info">
              <div className="wish-product-name">상품</div>
              <div className="wish-product-price">$100</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSellingContent = () => (
    <div className="content-section">
      <div className="products-grid">
        {[1, 2, 3].map((item) => (
          <div key={item} className="product-card">
            <div className="selling-product-image">
              판매 상품 이미지
            </div>
            <div className="selling-product-info">
              <div className="selling-product-name">판매 상품</div>
              <div className="selling-product-price">0</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOrderHistoryContent = () => (
    <div className="content-section">
      <div className="order-table-container">
        <table className="order-table">
          <thead>
            <tr>
              <th></th>
              <th>상품명</th>
              <th>판매자</th>
              <th>구매일자</th>
              <th>수량</th>
              <th>금액</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order) => (
              <tr key={order.id}>
                <td>{order.productId}</td>
                <td>{order.seller}</td>
                <td>{order.purchaseDate}</td>
                <td>{order.quantity}</td>
                <td>{order.amount}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="mypage">
      <div className="container">
        <Header />       
        <main className="main-grid">
          <section className="user-info-section">
            <h2 className="user-info-title">내 정보</h2>
            
            <div className="user-nickname-section">
              <div className="user-nickname">닉네임</div>
              <button className="edit-btn" onClick={handleEditProfile}>
                ✏️ 수정하기
              </button>
            </div>
            
            <div className="user-profile-stats">
              <div className="profile-image">
                프로필 이미지
              </div>
              
              <div className="user-stats">
                <div className="stat-item">
                  <div className="stat-label">포인트</div>
                  <div className="stat-value" onClick={handlePointClick} style={{cursor: 'pointer'}}>{point}</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">상품</div>
                  <div className="stat-value">0</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">판매수</div>
                  <div className="stat-value">0</div>
                </div>
              </div>
            </div>
            
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'wishlist' ? 'active' : ''}`}
                onClick={() => handleTabChange('wishlist')}
              >
                찜 상품
              </button>
              <button 
                className={`tab ${activeTab === 'selling' ? 'active' : ''}`}
                onClick={() => handleTabChange('selling')}
              >
                판매 상품
              </button>
              <button 
                className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => handleTabChange('orders')}
              >
                주문내역
              </button>
            </div>
          </section>
          
          {activeTab === 'wishlist' && renderWishlistContent()}
          {activeTab === 'selling' && renderSellingContent()}
          {activeTab === 'orders' && renderOrderHistoryContent()}
        </main>
      </div>

      {/* 포인트 충전 팝업 */}
      {showPointPopup && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="point-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <div className="popup-title">포인트 충전하기</div>
              <div className="popup-close" onClick={handleClosePopup}>×</div>
            </div>
            
            <div className="popup-content">
              <div className="topup-section">
                <p className="section-desc">충전할 포인트 금액을 선택해주세요.</p>
                
                <div className="amount-input">
                  <input 
                    type="text" 
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    placeholder="0"
                  />
                </div>
                
                <div className="amount-buttons">
                  <button 
                    className={`amount-btn ${selectedAmount === '10.00' ? 'selected' : ''}`}
                    onClick={() => handleAmountSelect('10.00')}
                  >
                    10.00
                  </button>
                  <button 
                    className={`amount-btn ${selectedAmount === '50.00' ? 'selected' : ''}`}
                    onClick={() => handleAmountSelect('50.00')}
                  >
                    50.00
                  </button>
                  <button 
                    className={`amount-btn ${selectedAmount === '100.00' ? 'selected' : ''}`}
                    onClick={() => handleAmountSelect('100.00')}
                  >
                    100.00
                  </button>
                  <button 
                    className={`amount-btn ${selectedAmount === '200.00' ? 'selected' : ''}`}
                    onClick={() => handleAmountSelect('200.00')}
                  >
                    200.00
                  </button>
                </div>
              </div>
              
              <div className="total-section">
                <h3 className="section-title">포인트 총합</h3>
                <div className="total-input">
                  <input 
                    type="text" 
                    value={customAmount}
                    readOnly
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            
            <div className="popup-footer">
              <button className="topup-btn" onClick={handleTopup}>
                충전하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mypage;
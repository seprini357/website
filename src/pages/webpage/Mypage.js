import './Mypage.css';
import Header from '../../components/webpage/Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('wishlist');
  const [showPointPopup, setShowPointPopup] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('100.00');
  const [customAmount, setCustomAmount] = useState('0');
  const [point, setPoint] = useState(0);
  const [userNickname, setUserNickname] = useState('닉네임');
  const [wishlist, setWishlist] = useState([]);
  const [sellingProducts, setSellingProducts] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  // ❌ API 연동 시 삭제: 포인트 더미데이터 불러오기
  useEffect(() => {
    const storedPoints = parseInt(localStorage.getItem("myPoints") || "0", 10);
    setPoint(storedPoints);
  }, []);

  // 사용자 닉네임 불러오기
  useEffect(() => {
    const fetchUserNickname = async () => {
      try {
        /*
        // api 수정
        const res = await fetch('/api/user/profile', {
          method: 'GET',
          credentials: 'include',
        });
          
        if (!res.ok) {
          console.log('사용자 정보 api 가져오기 실패');
        }
        const data = await res.json();
        }
        */

        // ❌ API 연동 시 삭제: 사용자 닉네임 더미데이터 불러오기
        const storedUserInfo = localStorage.getItem("userInfo");
        if (storedUserInfo) {
          try {
            const userInfo = JSON.parse(storedUserInfo);
            if (userInfo.nickname) {
              setUserNickname(userInfo.nickname);
            }
          } catch (error) {
            console.log("사용자 정보 파싱 실패:", error);
          }
        }

      } catch (error) {
        console.log("사용자 정보 API 호출 실패:", error);
        
        // ❌ API 연동 시 삭제: 에러 시 사용자 닉네임 더미데이터
        const storedUserInfo = localStorage.getItem("userInfo");
        if (storedUserInfo) {
          try {
            const userInfo = JSON.parse(storedUserInfo);
            if (userInfo.nickname) {
              setUserNickname(userInfo.nickname);
            }
          } catch (error) {
            console.log("사용자 정보 파싱 실패:", error);
          }
        }
      }
    };

    fetchUserNickname();
  }, []);

  // 찜 상품 목록 불러오기
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        /*
        // api 수정
        const res = await fetch('/api/user/wishlist', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!res.ok) {
          tconsole.log('찜 상품 목록 api 불러오기 실패');
        }
        const data = await res.json();
        setWishlist(data.wishlist);
        */

        // ❌ API 연동 시 삭제: 찜 상품 더미데이터 
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlist(storedWishlist);

      } catch (error) {
        console.log("찜 상품 API 호출 실패");
        
        // ❌ API 연동 시 삭제: 에러 시 찜 상품 더미데이터
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        setWishlist(storedWishlist);
      }
    };

    fetchWishlist();
  }, []);

  // 판매 상품 목록 불러오기
  useEffect(() => {
    const fetchSellingProducts = async () => {
      try {
        /*
        // api 수정
        const res = await fetch('/api/user/selling-products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!res.ok) {
          console.log('판매상품 목록 api 가져오기 실패');
        }
        const data = await res.json();
        setSellingProducts(data.products);
        */

        // ❌ API 연동 시 삭제: 판매 상품 더미데이터
        const storedSellingProducts = JSON.parse(localStorage.getItem("sellingProducts") || "[]");
        setSellingProducts(storedSellingProducts);

      } catch (error) {
        console.log("판매 상품 API 호출 실패");
        
        // ❌ API 연동 시 삭제: 에러 시 판매 상품 더미데이터
        const storedSellingProducts = JSON.parse(localStorage.getItem("sellingProducts") || "[]");
        setSellingProducts(storedSellingProducts);
      }
    };

    fetchSellingProducts();

    // ❌ API 연동 시 삭제: localStorage 변경 감지 (더미데이터 전용)
    const handleStorageChange = () => {
      const storedSellingProducts = JSON.parse(localStorage.getItem("sellingProducts") || "[]");
      setSellingProducts(storedSellingProducts);
      
      // 주문 내역도 함께 업데이트
      const storedOrderHistory = JSON.parse(localStorage.getItem("orderHistory") || "[]");
      setOrderHistory(storedOrderHistory);
      
      // 사용자 정보도 함께 업데이트
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        try {
          const userInfo = JSON.parse(storedUserInfo);
          if (userInfo.nickname) {
            setUserNickname(userInfo.nickname);
          }
        } catch (error) {
          console.log("사용자 정보 파싱 실패:", error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // 주문 내역 불러오기
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        /*
        // api 수정
        const res = await fetch('/api/user/order-history', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!res.ok) {
          console.log('주문 내역 api 연결 실패');
        }
        const data = await res.json();
        setOrderHistory(data.orders);
        */

        // ❌ API 연동 시 삭제: 주문 내역 더미데이터
        const storedOrderHistory = JSON.parse(localStorage.getItem("orderHistory") || "[]");
        setOrderHistory(storedOrderHistory);

      } catch (error) {
        console.log("주문 내역 API 호출 실패");
        
        // ❌ API 연동 시 삭제: 에러 시 주문 내역 더미데이터
        const storedOrderHistory = JSON.parse(localStorage.getItem("orderHistory") || "[]");
        setOrderHistory(storedOrderHistory);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  const handleChat = () => {
    navigate('/chat');
  };

  // 찜 상품 해제 함수
  const handleHeartClick = async (productId) => {
    try {
      /*
      // api 수정
      const res = await fetch(`/api/user/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });   
      if (!res.ok) {
        console.log('찜상품 해제 api 가져오기 실패 ');
      }
      */

      // ❌ API 연동 시 삭제: 찜 해제 더미데이터 처리
      const updatedWishlist = wishlist.filter(item => item.id !== productId);
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    } catch (error) {
      console.log("찜 해제 API 호출 실패");
      
      // ❌ API 연동 시 삭제: 에러 시 찜 해제 더미데이터 처리
      const updatedWishlist = wishlist.filter(item => item.id !== productId);
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  // 판매 상품 삭제 함수
  const handleDeleteSellingProduct = async (productId) => {
    try {
      /*
      // api 수정
      const res = await fetch(`/api/user/selling-products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) {
        console.log('판매 상품 삭제 api 연결 실패');
      }
      */

      // ❌ API 연동 시 삭제: 판매 상품 삭제 더미데이터 처리
      const updatedSellingProducts = sellingProducts.filter(item => item.id !== productId);
      setSellingProducts(updatedSellingProducts);
      localStorage.setItem("sellingProducts", JSON.stringify(updatedSellingProducts));

    } catch (error) {
      console.log("판매 상품 삭제 API 호출 실패");
      
      // ❌ API 연동 시 삭제: 에러 시 판매 상품 삭제 더미데이터 처리
      const updatedSellingProducts = sellingProducts.filter(item => item.id !== productId);
      setSellingProducts(updatedSellingProducts);
      localStorage.setItem("sellingProducts", JSON.stringify(updatedSellingProducts));
    }
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

  // 포인트 충전 함수
  const handleTopup = async () => {
    const add = parseFloat(customAmount) || 0;
    
    try {
      /*
      // api 수정
      const res = await fetch('/api/user/topup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: add })
      });
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const result = await res.json();
      setPoint(result.newBalance);
      */

      // ❌ API 연동 시 삭제: 포인트 충전 더미데이터 처리
      const newTotal = point + add;
      setPoint(newTotal);
      localStorage.setItem("myPoints", newTotal.toString());

    } catch (error) {
      console.log("포인트 충전 API 호출 실패");
      
      // ❌ API 연동 시 삭제: 에러 시 포인트 충전 더미데이터 처리
      const newTotal = point + add;
      setPoint(newTotal);
      localStorage.setItem("myPoints", newTotal.toString());
    }
    
    setShowPointPopup(false);
  };

  // 찜 상품 탭 렌더링
  const renderWishlistContent = () => (
    <div className="content-section">
      {wishlist.length === 0 ? (
        <div className="empty-state">
          <p>찜한 상품이 없습니다.</p>
        </div>
      ) : (
        <div className="products-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="product-card">
              <div className="wish-product-image">
                {item.image || '상품 이미지'}
                <div 
                  className="heart-icon active"
                  onClick={() => handleHeartClick(item.id)}
                > ♥
                </div>
              </div>
              <div className="wish-product-info">
                <div className="wish-product-name">{item.title}</div>
                <div className="wish-product-price">{item.price.toLocaleString()} P</div>
                <div className="wish-product-seller">판매자: {item.sellerNickname}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // 판매 상품 탭 렌더링
  const renderSellingContent = () => (
    <div className="content-section">
      {sellingProducts.length === 0 ? (
        <div className="empty-state">
          <p>판매 중인 상품이 없습니다.</p>
        </div>
      ) : (
        <div className="products-grid">
          {sellingProducts.map((item) => (
            <div key={item.id} className="product-card">
              <div className="selling-product-image">
                {item.images || '판매 상품 이미지'}
              </div>
              <div className="selling-product-info">
                <div className="selling-product-name">{item.title}</div>
                <div className="selling-product-price">{item.price.toLocaleString()} P</div>
                <div className="selling-product-details">
                  <span className="selling-product-category">{item.product_name}</span>
                  <span className="selling-product-status">{item.status}</span>
                </div>
                <div className="selling-product-date">
                  등록일: {new Date(item.createdAt).toLocaleDateString()}
                </div>
                <button
                  className="delete-selling-product-btn"
                  onClick={() => handleDeleteSellingProduct(item.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
  // 주문 내역 탭 렌더링
  const renderOrderHistoryContent = () => (
    <div className="content-section">
      {orderHistory.length === 0 ? (
        <div className="empty-state">
          <p>주문 내역이 없습니다.</p>
        </div>
      ) : (
        <div className="order-table-container">
          <table className="order-table">
            <thead>
              <tr>
                <th>상품명</th>
                <th>판매자</th>
                <th>구매일자</th>
                <th>수량</th>
                <th>금액</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map((order) => (
                <tr key={order.id}>
                  <td>{order.productTitle}</td>
                  <td>{order.sellerNickname}</td>
                  <td>{new Date(order.orderDate).toLocaleDateString('ko-KR')}</td>
                  <td>{order.quantity}개</td>
                  <td>{order.totalAmount.toLocaleString()} P</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
              <div className="user-nickname">{userNickname}</div>
              <div className="button-group">
                <button className="edit-btn" onClick={handleEditProfile}>
                  ✏️ 수정하기
                </button>
                <button className="mypage-chat-btn" onClick={handleChat}>
                  채팅하기
                </button>
              </div>
            </div>
            
            <div className="user-profile-stats">
              <div className="profile-image">
                프로필 이미지
              </div>
              
              <div className="user-stats">
                <div className="stat-item">
                  <div className="stat-label">포인트</div>
                  <div className="stat-value" onClick={handlePointClick} style={{cursor: 'pointer'}}>{point.toLocaleString()} P</div>
                </div>
              </div>
            </div>
            
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'wishlist' ? 'active' : ''}`}
                onClick={() => handleTabChange('wishlist')}>
                찜 상품 ({wishlist.length})
              </button>
              <button 
                className={`tab ${activeTab === 'selling' ? 'active' : ''}`}
                onClick={() => handleTabChange('selling')}>
                판매 상품 ({sellingProducts.length})
              </button>
              <button 
                className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => handleTabChange('orders')}>
                주문내역 ({orderHistory.length})
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
                  >10.00
                  </button>
                  <button 
                    className={`amount-btn ${selectedAmount === '50.00' ? 'selected' : ''}`}
                    onClick={() => handleAmountSelect('50.00')}
                  >50.00
                  </button>
                  <button 
                    className={`amount-btn ${selectedAmount === '100.00' ? 'selected' : ''}`}
                    onClick={() => handleAmountSelect('100.00')}
                  >100.00
                  </button>
                  <button 
                    className={`amount-btn ${selectedAmount === '200.00' ? 'selected' : ''}`}
                    onClick={() => handleAmountSelect('200.00')}
                  >200.00
                  </button>
                </div>
              </div>
              
              <div className="total-section">
                <h3 className="section-title">포인트 총합</h3>
                <div className="total-breakdown">
                  <div className="breakdown-item">
                    <span className="breakdown-label">현재 포인트:</span>
                    <span className="breakdown-value">{point.toLocaleString()} P</span>
                  </div>
                  <div className="breakdown-item">
                    <span className="breakdown-label">추가 포인트:</span>
                    <span className="breakdown-value">{parseFloat(customAmount || 0).toLocaleString()} P</span>
                  </div>
                  <div className="breakdown-item total">
                    <span className="breakdown-label">총 포인트:</span>
                    <span className="breakdown-value">{(point + parseFloat(customAmount || 0)).toLocaleString()} P</span>
                  </div>
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
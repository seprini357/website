import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../../components/webpage/Header';
import Pagination from '../../components/webpage/Pagination';
import Button from '../../components/webpage/Button';
import Heart from '../../components/webpage/Heart';
import ArrowUpCircle from '../../components/webpage/ArrowUpCircle';
import styles from './Market.module.css';

const Market = () => {
  const navigate = useNavigate();
  const handleChatClick = () => navigate('/chat');
  const handleWriteClick = () => navigate('/Sellingpost');
  const handleProductClick = (id) => navigate(`/detail/${id}`);
  const handleSendMessage = () => console.log('검색 실행');

  const [productList, setProductList] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]); // ✅ 좋아요 상태 저장

  // ✅ 비로그인 접근 차단: 마켓 진입 시 로그인 여부 검사
  useEffect(() => {
    const authed = localStorage.getItem('auth') === '1';
    if (!authed) {
      alert('로그인 후 이용할 수 있습니다.');
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const toggleLike = (id) => {
    setLikedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((pid) => pid !== id)
        : [...prev, id]
    );
  };

  //❌ 더미 데이터 연동 후 삭제
  const dummyData = [
    { id: 0, title: "맛있는 가지 팝니다", price: 400, images: ["/images/sample-product.jpg"], description: "농약 없이 키운 가지", seller: { id: 123, nickname: "농부김씨" } },
    { id: 1, title: "신선한 토마토 판매합니다", price: 800, images: ["/images/sample-product.jpg"], description: "햇볕 듬뿍 토마토", seller: { id: 124, nickname: "토마토농장" } },
    { id: 2, title: "유기농 상추 팝니다", price: 300, images: ["/images/sample-product.jpg"], description: "깨끗한 상추", seller: { id: 125, nickname: "초록농장" } }
  ];

  useEffect(() => {
    setProductList(dummyData);
  }, []);

  // ✅ Header에 실제 로그인 상태 반영
  const isLoggedIn = localStorage.getItem('auth') === '1';

  return (
    <>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Header
          isLoggedIn={isLoggedIn}
          onLogout={() => {
            localStorage.removeItem('auth');
            navigate('/', { replace: true });
          }}
        />
      </div>

      <div className={styles.pageWrapper}>
        <main className={styles.mainContent}>
          {/* 왼쪽 버튼들 */}
          <div className={styles.leftButtons}>
            <button className={styles.topButton} onClick={handleWriteClick}>+ 글쓰기</button>
            <button className={`${styles.topButton} ${styles.active}`}>채팅</button>
            <div className={styles.searchContainer}>
              <input className={styles.searchInput} type="text" placeholder="Search" />
              <button className={styles.sendButton} onClick={handleSendMessage}>
                <ArrowUpCircle size={32} />
              </button>
            </div>
          </div>

          {/* 오른쪽 상품 카드 영역 */}
          <div className={styles.productCardsParent}>
            {productList.length > 0 ? (
              productList.map((product) => (
                <div
                  className={styles.productCards}
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div onClick={(e) => { e.stopPropagation(); toggleLike(product.id); }}>
                    <Heart size={36} liked={likedProducts.includes(product.id)} />
                  </div>

                  <div className={styles.productDetails}>
                    <div className={styles.image20Parent}>
                      <img
                        className={styles.image20}
                        src={product.images?.[0] || "/images/sample-product.jpg"}
                        alt={product.title}
                        onError={(e) => { e.target.src = "/images/sample-product.jpg"; }}
                      />
                      <div className={styles.parent}>
                        <h3 className={styles.h3}>{product.title}</h3>
                        <h3 className={styles.h3}>{product.price.toLocaleString()} 포인트</h3>
                      </div>
                      <div className={styles.frameChild} />
                    </div>
                    <Button
                      onClick={(e) => { e.stopPropagation(); handleChatClick(); }}
                      size="Medium" state="Default" variant="Primary"
                      label="채팅 보내기"
                      buttonHeight="40px" buttonWidth="100%" buttonBorder="1px solid #2c2c2c"
                      buttonFontSize="16px" buttonFontWeight="600"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px', color: '#666' }}>
                등록된 상품이 없습니다.
              </div>
            )}
          </div>
        </main>

        <div className={styles.paginationWrapper}>
          <Pagination size="16" size1="16" />
        </div>
      </div>
    </>
  );
};

export default Market;




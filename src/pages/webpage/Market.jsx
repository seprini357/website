import { useNavigate } from 'react-router-dom';
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
  const handleSendMessage = () => {
    console.log('검색 실행');
    // 검색 기능 구현 가능
  };

  return (
    <>
      {/* ✅ Header 중앙 정렬 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Header isLoggedIn={true} />
      </div>

      <div className={styles.pageWrapper}>
        <main className={styles.mainContent}>
          {/* 왼쪽 버튼들 */}
          <div className={styles.leftButtons}>
            <button className={styles.topButton} onClick={handleWriteClick}>
              + 글쓰기
            </button>
            <button className={`${styles.topButton} ${styles.active}`}>
              채팅
            </button>
            <div className={styles.searchContainer}>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search"
              />
              <button className="send-button" onClick={handleSendMessage}>
                <ArrowUpCircle size={40} />
              </button>
            </div>
          </div>

          {/* 오른쪽 상품 카드 영역 */}
          <div className={styles.productCardsParent}>
            {[...Array(6)].map((_, index) => (
              <div className={styles.productCards} key={index}>
                <Heart size={36} />
                <div className={styles.productDetails}>
                  <div className={styles.image20Parent}>
                    <img
                      className={styles.image20}
                      src="/images/sample-product.jpg"
                      alt="상품 이미지"
                    />
                    <div className={styles.parent}>
                      <h3 className={styles.h3}>상품명</h3>
                      <h3 className={styles.h3}>₩20,000</h3>
                    </div>
                    <div className={styles.frameChild} />
                  </div>
                  <Button
                    onClick={handleChatClick}
                    size="Medium"
                    state="Default"
                    variant="Primary"
                    label="채팅 보내기"
                    hasIconStart={false}
                    hasIconEnd={false}
                    buttonHeight="40px"
                    buttonWidth="100%"
                    buttonBorder="1px solid #2c2c2c"
                    buttonAlignSelf="center"
                    buttonMargin="0"
                    buttonFontSize="16px"
                    buttonFontWeight="600"
                    size1="16"
                    starDisplay="none"
                    size2="16"
                    xDisplay="none"
                  />
                </div>
              </div>
            ))}
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

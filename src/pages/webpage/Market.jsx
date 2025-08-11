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
  const handleSendMessage = () => {
    console.log('검색 실행');
  };

  const [productList, setProductList] = useState([]);


  //❌ 더미 데이터 연동 후 삭제 
  const dummyData = [
    {
      id: 0,
      title: "맛있는 가지 팝니다",
      product_title: "가지",
      price: 400,
      images: [
        "/images/sample-product.jpg",
        "/images/sample-product2.jpg"
      ],
      description: " 농약 없이 키운 유기농 가지로, 직접 농장에서 재배하여 신선도가 뛰어납니다. 요리에 활용하시면 부드러운 식감과 깊은 맛을 느끼실 수 있습니다.",
      isNew: true,
      seller: {
        id: 123,
        nickname: "농부김씨"
      },
      status: "판매중"
    },
    {
      id: 1,
      title: "신선한 토마토 판매합니다",
      product_title: "토마토",
      price: 800,
      images: [
        "/images/sample-product.jpg"
      ],
      description: "햇볕을 듬뿍 받고 자란 신선한 토마토입니다. 당도가 높고 과즙이 풍부합니다.",
      isNew: true,
      seller: {
        id: 124,
        nickname: "토마토농장"
      },
      status: "판매중"
    },
    {
      id: 2,
      title: "유기농 상추 팝니다",
      product_title: "상추",
      price: 300,
      images: [
        "/images/sample-product.jpg"
      ],
      description: "농약을 사용하지 않고 키운 깨끗한 상추입니다. 쌈 채소로 최고입니다.",
      isNew: false,
      seller: {
        id: 125,
        nickname: "초록농장"
      },
      status: "판매중"
    }
  ];

  useEffect(() => {
    const getProducts = async () => {
      /* 상품 불러오기
      try {
        const res = await fetch('http://localhost:3000/api/market'); // API 수정
        const data = await res.json();
        if(!res.ok) {
          console.log('상품 api 불러오기 실패');
        }setProductList(data);
      } catch (error) {
        console.log(error);
      }
      */

      // ❌더미 데이터 사용, 연동 후 삭제
      console.log('더미 데이터');
      setProductList(dummyData);
    };
    getProducts();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  
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
            {productList && productList.length > 0 ? (
              productList.map((product, index) => (
                <div 
                  className={styles.productCards} 
                  key={product.id || index}
                  onClick={() => handleProductClick(product.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <Heart size={36} />
                  <div className={styles.productDetails}>
                    <div className={styles.image20Parent}>
                      <img
                        className={styles.image20}
                        src={product.images?.[0] || "/images/sample-product.jpg"}
                        alt={product.title || "상품 이미지"}
                        onError={(e) => {
                          e.target.src = "/images/sample-product.jpg";
                        }}
                      />
                      <div className={styles.parent}>
                        <h3 className={styles.h3}>
                          {product.title || '상품명'}
                        </h3>
                        <h3 className={styles.h3}>
                          {product.price ? `${product.price.toLocaleString()}포인트` : '가격'}
                        </h3>
                      </div>
                      <div className={styles.frameChild} />
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleChatClick();
                      }}
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
              ))
            ) : (
              <div style={{ 
                gridColumn: '1 / -1', 
                textAlign: 'center', 
                padding: '50px',
                color: '#666'
              }}>
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

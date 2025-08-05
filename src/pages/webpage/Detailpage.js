import './Detailpage.css';
import Header from '../../components/webpage/Header';

const Detailpage = () => {
  return (
    <div className="detailpage">
      <div className="container">
        <Header />
        <div className="main-grid">
          <section className="detail-left">
            <div className="breadcrumb">홈페이지 &gt; 농작물마켓 &gt; 상품명</div>
            <div className="image-slider">
              <img alt="상품" />
              <button className="slider-arrow left">{'<'}</button>
              <button className="slider-arrow right">{'>'}</button>
              <div className="slider-indicator">
                <span className="active"></span>
                <span></span>
              </div>
            </div>
          </section>
          <section className="detail-right">
            <div className="category-badge">초특가</div>
            <div className="product-title-main">제목</div>
            <div className="product-row">
              <div className="product-title">상품명</div>
              <div className="product-price">₩가격</div>
            </div>
            <div className="product-desc-label">상품 설명</div>
            <div className="product-desc">상품 설명 공간</div>
            <button className="chat-btn">채팅 보내기</button>
            <div className="product-actions">
              <button className="wish-btn">♡ 상품 찜하기</button>
            </div>
          </section>
        </div>
        <div className="detail-bottom-grid">
          <section className="bottom-left">
            <div className="bottom-title">상품 설명</div>
            <div className="bottom-divider"></div>
            <div className="bottom-desc-box"></div>
          </section>
          <section className="bottom-right">
            <div className="bottom-title">판매자 정보</div>
            <div className="bottom-divider"></div>
            <div className="seller-profile">
              <div className="profile-img"></div>
              <div className="seller-name">판매자 닉네임</div>
            </div>
            <button className="chat-btn bottom">채팅 보내기</button>
            <button className="wish-btn bottom">♥ 상품 찜하기</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Detailpage;
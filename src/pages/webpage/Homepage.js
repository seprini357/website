import './Homepage.css';
import diversity from '../../icons/diversity.svg';
import Header from '../../components/webpage/Header';
import AI from '../../icons/AI image.svg';
import market from '../../icons/market image.svg';
import smartfarm from '../../icons/smart farm image.svg';
import groceries from '../../icons/groceries 2.png';
import Footer from '../../components/webpage/Footer';
import Selectvege from '../../components/webpage/Selectvege';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleFeatureClick = (page) => {
    navigate(page);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEnterClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCropSelection = (selectedCrop) => {
    console.log('Selected crop:', selectedCrop);
    // 대시보드 로직 추가
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="homepage">
      <div className="container">
        <Header
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        <main className="main-grid">
          <section className="left-col">
            <h1 className="main-title">
              당신만의
              <br /> <span className="green">스마트 농장</span>,<br />
              지금 시작하세요
            </h1>
            <p className="subtitle">
              환경 데이터부터 농사 기반 챗봇까지
              <br />
              스마트팜 대시보드에서 한눈에 확인할 수 있어요.
            </p>
            <form
              className="serial-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleEnterClick();
              }}
            >
              <input
                type="text"
                placeholder="디바이스 일련번호를 입력하세요."
              />
              <button type="submit">들어가기</button>
            </form>
          </section>
          <section className="right-col">
            <img
              className="main-image-placeholder"
              src={groceries}
              alt="작물"
            />
          </section>
        </main>
        <section className="features-section">
          <div className="feature-card" onClick={() => handleFeatureClick('/')}>
            <img
              className="feature-icon"
              src={smartfarm}
              alt="smartfarm이미지"
            />
            <div className="feature-title">스마트팜 대시보드</div>
            <div className="feature-desc">
              농작물 상태와 환경 정보를 한눈에 확인하고 편리하게 관리하세요.
            </div>
          </div>
          <div
            className="feature-card"
            onClick={() => handleFeatureClick('/pagination')}
          >
            <img className="feature-icon" src={market} alt="market 이미지" />
            <div className="feature-title">농작물 마켓</div>
            <div className="feature-desc">
              수확한 작물을 손쉽게 거래할 수 있어요.
            </div>
          </div>

          <div
            className="feature-card"
            onClick={() => handleFeatureClick('/price')}
          >
            <img className="feature-icon" src={AI} alt="AI 이미지" />
            <div className="feature-title">가격 예측</div>
            <div className="feature-desc">
              AI가 가격변동을 예측해 최적의 농작물 가격을 알려드립니다.
            </div>
          </div>
        </section>
        <section className="grow-section">
          <h2 className="grow-title">Grow Anything, Anytime</h2>
          <p className="grow-desc">
            당신이 키우고 싶은 모든 작물, 이곳에서 시작됩니다.
            <br />
            스마트팜으로 언제든지 가능합니다.
          </p>
          <div className="grow-images">
            <img className="img-vege" src={diversity} alt="작물" />
          </div>
        </section>
      </div>

      <Selectvege
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onEnter={handleCropSelection}
      />
      <Footer />
    </div>
  );
};

export default Homepage;

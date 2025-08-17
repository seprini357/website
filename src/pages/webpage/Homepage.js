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

const Homepage = ({ isLoggedIn, onLogin, onLogout }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serialNumber, setSerialNumber] = useState('');

  // ✅ 수정: 비로그인 상태에서 농작물 마켓(/pagination) 접근 막기
  const handleFeatureClick = (page) => {
    if (!isLoggedIn && page === '/pagination') {
      alert('로그인 후 이용할 수 있습니다.');
      navigate('/login');
      return;
    }
    navigate(page);
  };

  const handleEnterClick = async () => {
    if (!serialNumber.trim()) {
      alert('시리얼 번호를 입력해주세요.');
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3000/api/device/${serialNumber}`
      );
      const data = await res.json();
      if (!res.ok) {
        console.log('디바이스 조회 실패');
        return;
      }
      if (data.success) {
        console.log('디바이스 정보:', data.device);
        setIsModalOpen(true);
      } else {
        alert('디바이스 조회 실패');
      }
    } catch (error) {
      console.log('API 호출 에러');
      alert('서버와 연결할 수 없습니다.');
    }
  };

  const handleModalClose = () => setIsModalOpen(false);
  const handleCropSelection = (selectedCrop) => {
    console.log('선택한 작물', selectedCrop);
  };

  return (
    <div className="homepage">
      <div className="container">
        {/* ← App에서 받은 로그인 상태/핸들러 전달 */}
        <Header isLoggedIn={isLoggedIn} onLogin={onLogin} onLogout={onLogout} />

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
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
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

import './FindPWPage.css';
import { useNavigate } from 'react-router-dom';

export default function FindPasswordPage() {
  const navigate = useNavigate();

  return (
    <div className="find-container">
      <div className="find-box">
        <div className="find-section">
          <h2 className="find-title">아이디 찾기</h2>
          <div className="find-input-wrapper">
            <input
              type="text"
              className="find-input"
              placeholder="이메일 입력"
            />
            <button className="find-button" onClick={() => navigate('/login')}>
              <img src="/Icon.svg" alt="전송" className="find-icon" />
            </button>
          </div>
        </div>

        <div className="find-section">
          <h2 className="find-title">비밀번호 재설정</h2>
          <div className="find-input-wrapper">
            <input
              type="text"
              className="find-input"
              placeholder="아이디 입력"
            />
            <button className="find-button" onClick={() => navigate('/login')}>
              <img src="/Icon.svg" alt="전송" className="find-icon" />
            </button>
          </div>
        </div>

        <button className="back-button" onClick={() => navigate('/login')}>
          로그인으로 돌아가기
        </button>
      </div>
    </div>
  );
}

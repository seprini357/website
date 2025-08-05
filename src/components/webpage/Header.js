import './Header.css'
import { Link } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogin, onLogout }) => {
  return (
    <header className="header">
      <Link className="logo" to="/">ASAP</Link>
      <nav className="menu">
        {/*route 추가시 link로 변경하기 */}
        <a className="menu-item" href="market">농작물 마켓</a>
        <a className="menu-item" href="price">가격 예측</a>
      </nav>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <>
            <a className="mypage-btn" href="/mypage">마이페이지</a>
            <button className="logout-btn" onClick={onLogout}>로그아웃</button>
          </>
        ) : (
          <>
            <button type="button" className="login-btn" onClick={onLogin}>로그인</button>
            <button className="signup-btn">회원가입</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
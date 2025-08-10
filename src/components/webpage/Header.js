import './Header.css';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate(); 

  return (
    <header className="header">
      <Link className="logo" to="/">ASAP</Link>
      <nav className="menu">
        {/*route 추가시 link로 변경하기 */}
        <Link className="menu-item" to="/pagination">농작물 마켓</Link>
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
            <button type="button" className="login-btn" onClick={() => navigate("/login")}>로그인</button>
            <button className="signup-btn" onClick={() => navigate("/signup")}>회원가입</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;


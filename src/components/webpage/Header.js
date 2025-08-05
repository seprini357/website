import './Header.css'

const Header = ({ isLoggedIn, onLogin, onLogout }) => {
  return (
    <header className="header">
      <div className="logo">ASAP</div>
      <nav className="menu">
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
import { useState } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // TODO: 실제 로그인 API 연동 후 성공 시 아래 실행
    onLogin();           // ← App의 isLoggedIn = true
    navigate("/");       // ← 홈으로 이동
  };

  const handleSignUp = () => navigate("/signup");
  const handleFindCredentials = () => navigate("/findpw");

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">ASAP</h2>
        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">로그인</button>
        </form>
        <div className="sub-buttons">
          <button className="sub-button" onClick={handleSignUp}>회원가입</button>
          <button className="sub-button" onClick={handleFindCredentials}>아이디/비밀번호 찾기</button>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import "./SignUpPage.css";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("회원가입 시도:", { userId, password, confirmPassword });
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">회원가입</h2>
        <form onSubmit={handleSubmit}>
          <label className="signup-label">이름</label>
          <input className="signup-input" type="text" placeholder="이름을 입력하세요." />

          <label className="signup-label">닉네임</label>
          <input className="signup-input" type="text" placeholder="닉네임을 입력하세요." />

          <label className="signup-label">전화번호</label>
          <input className="signup-input" type="text" placeholder="전화번호를 입력하세요." />

          <label className="signup-label">이메일</label>
          <input className="signup-input" type="email" placeholder="이메일을 입력하세요." />

          <label className="signup-label">아이디</label>
          <input
            className="signup-input"
            type="text"
            placeholder="아이디를 입력하세요."
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <label className="signup-label">비밀번호</label>
          <input
            className="signup-input"
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label className="signup-label">비밀번호 재확인</label>
          <input
            className="signup-input"
            type="password"
            placeholder="비밀번호를 다시 입력하세요."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button className="signup-button" onClick={() => navigate("/login")}>회원가입</button>
        </form>
      </div>
    </div>
  );
}


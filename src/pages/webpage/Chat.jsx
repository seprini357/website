import { useState } from "react";
import ArrowUpCircle from "../../components/webpage/ArrowUpCircle";
import Header from "../../components/webpage/Header";
import "./Chat.css";

const Chat = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("보낸 메시지:", message);
      setMessage("");
    }
  };

  return (
    <>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        <Header isLoggedIn={true} />
      </div>

      <div className="chat-page">
        <div className="product-section">
          <div className="product-image" />
          <div className="product-info">
            <h3>상품명</h3>
            <h3>상품가격</h3>
          </div>
          <div className="product-description">
            <h3>상품설명</h3>
          </div>
        </div>

        <div className="chat-section">
          <div className="chat-window">{/* 채팅 내용이 들어갈 자리 */}</div>
          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지를 입력하세요."
            />
            <button className="send-button" onClick={handleSendMessage}>
              <ArrowUpCircle size={40} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;


import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/" className="footer-link">웹사이트</a>
          <a href="/" className="footer-link">웹사이트</a>
          <a href="/" className="footer-link">웹사이트</a>
          <a href="/" className="footer-link">웹사이트</a>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-copyright">
          © Copyright 2025, All Rights Reserved by ASAP
        </div>
      </div>
    </footer>
  );
};

export default Footer;
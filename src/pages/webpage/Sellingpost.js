import './Sellingpost.css';
import Header from '../../components/webpage/Header';
import { useState } from 'react';

const Sellingpost = () => {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  
  const productOptions = [
    '상추',
    '토마토',
    '감자',
    '당근',
    '마늘',
    '가지'
  ];

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsProductDropdownOpen(false);
  };

  return(
    <div className="sellingpost">
      <div className="container">
        <Header />
        <main className="main-grid">
          <section className="title-section">
            <h2 className="form-title">상품 등록</h2>
            <div className="form-desc">상품에 대한 자세한 정보를 입력해 주세요.</div>
          </section>
          <section className="upload-section">
            <div className="upload-title">사진 올리기</div>
            <div className="upload-box">
              <div className="upload-icon"></div>
              <div className="upload-desc">업로드할 사진을 선택하세요</div>
              <button className="upload-btn">+</button>
            </div>
          </section>
          <section className="form-section">
            <form className="product-form">
              <div className="form-group">
                <label>제목</label>
                <input type="text" placeholder="제목을 입력 해주세요" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>상품명</label>
                  <div className="dropdown-container">
                    <div 
                      className="dropdown-input"
                      onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                    >
                      <span className={selectedProduct ? 'selected-text' : 'placeholder-text'}>
                        {selectedProduct || '상품을 선택하세요'}
                      </span>
                      <span className="dropdown-arrow">▼</span>
                    </div>
                    {isProductDropdownOpen && (
                      <div className="dropdown-list">
                        {productOptions.map((product, index) => (
                          <div 
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleProductSelect(product)}
                          >
                            {product}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label>수량</label>
                  <input type="number" placeholder="수량을 입력하세요." />
                </div>
              </div>
              <div className="form-group">
                <label>가격</label>
                <input type="text" placeholder="₩ 가격을 입력 해주세요" />
              </div>
              <div className="form-group">
                <label>상품 설명란</label>
                <textarea placeholder="상품 설명을 입력하세요." rows={4}></textarea>
              </div>
              <button className="submit-btn" type="submit">등록하기</button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Sellingpost;
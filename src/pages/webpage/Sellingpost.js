import './Sellingpost.css';
import Header from '../../components/webpage/Header';
import React, { useState, useCallback } from 'react';

const Sellingpost = ({ isLoggedIn = true }) => {
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [showImg, setShowImg] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_IMAGES = 6;
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const productOptions = [
    '상추',
    '토마토',
    '감자',
    '당근',
    '마늘',
    '가지',
    '기타'
  ];
    // 신상 여부 결정 함수 (24시간 내 등록시 true 이후 false)
    const determineIsNew = () => {
      return true; 
    };

  const handleProductSelect = (product) => { setSelectedProduct(product);
    setIsProductDropdownOpen(false);
  };

  const validateFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert('파일 크기는 5MB 이하로 업로드해주세요.');
      return false;
    }
    return true;
  };

  const handleAddImg = useCallback((e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles = Array.from(files);
    const validFiles = newFiles.filter(validateFile);
    
    if (validFiles.length === 0) {
      e.target.value = null;
      return;
    }

    const remainingImgs = MAX_IMAGES - selectedFiles.length;
    if (remainingImgs <= 0) {
      alert(`최대 ${MAX_IMAGES}장까지만 업로드 가능합니다.`);
      e.target.value = null;
      return;
    }

    const filesToUpload = validFiles.slice(0, remainingImgs);
    if (filesToUpload.length < validFiles.length) {
      alert(`최대 ${MAX_IMAGES}장까지만 업로드 가능하여 ${filesToUpload.length}장만 추가됩니다.`);
    }

    const newFileUrls = filesToUpload.map(file => URL.createObjectURL(file));

    setSelectedFiles(prev => [...prev, ...filesToUpload]);
    setShowImg(prev => [...prev, ...newFileUrls]);

    e.target.value = null;
  }, [selectedFiles.length, validateFile]);

   // 사진 삭제시 메모리 누수 방지 URL 해제
  const handleDeleteImg = (index) => {
    URL.revokeObjectURL(showImg[index]);

    setSelectedFiles(prev => prev.filter((_, idx) => idx !== index));
    setShowImg(prev => prev.filter((_, idx) => idx !== index));
  };

  const validateForm = (formData) => {
    const title = formData.get('title')?.trim();
    const price = formData.get('price')?.trim();

    if (!title) {
      alert('제목을 입력해주세요.');
      return false;
    }
    if (!selectedProduct) {
      alert('상품명을 선택해주세요.');
      return false;
    }
    if (!price) {
      alert('가격을 입력해주세요.');
      return false;
    }
    if (isNaN(price) || parseInt(price) < 0) {
      alert('올바른 가격을 입력해주세요.');
      return false;
    }
    return true;
  };

  const resetForm = (form) => {
    setSelectedFiles([]);
    setShowImg([]);
    setSelectedProduct('');
    form.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // 중복 제출 방지
    const formData = new FormData();
    formData.append('title', e.target.title.value.trim());
    formData.append('product_title', selectedProduct);
    formData.append('price', parseInt(e.target.price.value.trim()));
    formData.append('description', e.target.description.value.trim());

    if (!validateForm(formData)) return;

    // 이미지 파일들 추가
    selectedFiles.forEach((file, index) => {
      formData.append('images', file);
    });

    setIsSubmitting(true);

    try {
      /*
      // api 수정
      const res = await fetch('http://localhost:3000/api/sellingpost', {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) {
        console.log('상품 등록 api 연결에 실패');
      }
      const result = await res.json();
      if (result.success) {
        alert('상품이 성공적으로 등록되었습니다!');
        resetForm(e.target);
        navigate('/pagination');
      } else {
        alert("상품 등록에 실패했습니다");
      }
      */

      // ❌ API 연동 시 삭제: 더미 데이터 처리
      const newProduct = {
        id: Date.now(), 
        title: e.target.title.value.trim(),
        product_title: selectedProduct,
        price: parseInt(e.target.price.value.trim()),
        description: e.target.description.value.trim(),
        images: selectedFiles.length, 
        status: '판매중',
        isNew: determineIsNew(),
        createdAt: new Date().toISOString(),
        sellerNickname: '닉네임'
      };

      // ❌ API 연동 시 삭제: localStorage에 판매 상품 추가
      const existingSellingProducts = JSON.parse(localStorage.getItem("sellingProducts") || "[]");
      const updatedSellingProducts = [...existingSellingProducts, newProduct];
      localStorage.setItem("sellingProducts", JSON.stringify(updatedSellingProducts));

      console.log('등록할 상품 정보:', newProduct);

      setTimeout(() => {
        alert('상품이 성공적으로 등록되었습니다!');
        resetForm(e.target);
      }, 1000);

    } catch (error) {
      console.log("상품 등록 API 호출 실패");
    }
  };

  // 전체 showImg의 Object URL 정리
  React.useEffect(() => {
    return () => {
      showImg.forEach(url => URL.revokeObjectURL(url));
    };
  }, [showImg]);

  return (
    <div className="sellingpost">
      <div className="container">
        <Header />
        <main className="main-grid">
          <section className="title-section">
            <h2 className="form-title">상품 등록</h2>
            <div className="form-desc">상품에 대한 자세한 정보를 입력해 주세요.</div>
          </section>
          
          <section className="upload-section">
            <div className="upload-title">
              사진 올리기 
              <span className="upload-count">({selectedFiles.length}/{MAX_IMAGES})</span>
            </div>
            <div className="upload-box">
              {showImg.length === 0 ? (
                <label 
                  htmlFor='img' 
                  className="upload-btn"
                >+</label>) : (
                
                <div className="preview-images">
                  {showImg.map((image, idx) => (
                    <div key={idx} className="imgBox">
                      <img src={image} alt={`상품 이미지 ${idx + 1}`} />
                      <button
                        onClick={() => handleDeleteImg(idx)}
                        className="delete-btn"
                        aria-label={`이미지 ${idx + 1} 삭제`}
                        type="button"
                      >
                        <span className="material-symbols-outlined">X</span>
                      </button>
                    </div>
                  ))}

                  {selectedFiles.length < MAX_IMAGES && (
                    <div className="imgBox add-more-box">
                      <label 
                        htmlFor='img' 
                        className="add-more-btn"
                      >+</label>
                    </div>)}
                </div>)}
              <input
                id='img'
                type='file'
                accept='image/*'
                multiple
                onChange={handleAddImg}
                disabled={selectedFiles.length >= MAX_IMAGES}
                style={{ display: 'none' }}/>
            </div>
          </section>

          <section className="form-section">
            <form className="product-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">제목 *</label>
                <input 
                  id="title"
                  type="text" 
                  name="title" 
                  placeholder="제목을 입력해주세요" 
                  required 
                  maxLength={100}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>상품명 *</label>
                  <div className="dropdown-container">
                    <div
                      className="dropdown-input"
                      onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          setIsProductDropdownOpen(!isProductDropdownOpen);
                        }
                      }}
                    >
                      <span className={selectedProduct ? 'selected-text' : 'placeholder-text'}>
                        {selectedProduct || '상품을 선택하세요'}
                      </span>
                      <span className={`dropdown-arrow ${isProductDropdownOpen ? 'open' : ''}`}>
                        ▼
                      </span>
                    </div>
                    {isProductDropdownOpen && (
                      <div className="dropdown-list">
                        {productOptions.map((product, index) => (
                          <div
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleProductSelect(product)}
                            role="option"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleProductSelect(product);
                              }
                            }}
                          >
                            {product}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="price">가격 *</label>
                <input 
                  id="price"
                  type="number" 
                  name="price" 
                  placeholder="포인트 가격을 입력해주세요" 
                  required 
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">상품 설명란 *</label>
                <textarea 
                  id="description"
                  name="description" 
                  placeholder="판매 수량을 포함하여 자세한 상품 설명을 입력해주세요" 
                  rows={4} 
                  required
                  maxLength={3000}
                />
              </div>
              <button 
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                type="submit"
                disabled={isSubmitting || !isLoggedIn}
              >등록하기
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Sellingpost;
import './Selectvege.css'
import { useState } from 'react';

const Selectvege = ({ isOpen, onClose, onEnter }) => {
  const [selectedCrop, setSelectedCrop] = useState(0); 

  const handleEnter = () => {
    if (selectedCrop !== null) {
      onEnter(selectedCrop);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-layout" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">스마트팜 대시보드 들어가기</h2>
          <p className="modal-subtitle">메인화면을 선택하시오.</p>
          <p className="modal-instruction">하나를 고르세요</p>
        </div>
        
        <div className="crop-selection">
          {[1, 2, 3, 4].map((cropIndex) => (
            <label key={cropIndex} className="crop-option">
              <input
                type="radio"
                name="crop"
                value={cropIndex}
                checked={selectedCrop === cropIndex}
                onChange={() => setSelectedCrop(cropIndex)}
              />
              <span className="radio-custom"></span>
              <span className="crop-label">작물명</span>
            </label>
          ))}
        </div>
        
        <button 
          className="enter-button"
          onClick={handleEnter}
        >
          들어가기
        </button>
      </div>
    </div>
  );
};

export default Selectvege;
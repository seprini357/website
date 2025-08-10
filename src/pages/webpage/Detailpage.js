import './Detailpage.css';
import Header from '../../components/webpage/Header';
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Detailpage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isWished, setIsWished] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // ❌ API 연동 시 삭제: 더미 데이터
  const dummyData = [
    {
      id: 0,
      title: "맛있는 가지 팝니다",
      product_title: "가지",
      price: 400,
      images: [
        "/images/sample-product.jpg",
        "/images/sample-product2.jpg"
      ],
      description: " 농약 없이 키운 유기농 가지로, 직접 농장에서 재배하여 신선도가 뛰어납니다. 요리에 활용하시면 부드러운 식감과 깊은 맛을 느끼실 수 있습니다.",
      isNew: true,
      seller: {
        id: 123,
        nickname: "농부김씨",
        profile_img: "/images/seller-profile.jpg"
      },
      status: "판매중"
    },
    {
      id: 1,
      title: "신선한 토마토 판매합니다",
      product_title: "토마토",
      price: 800,
      images: [
        "/images/sample-product.jpg"
      ],
      description: "햇볕을 듬뿍 받고 자란 신선한 토마토입니다. 당도가 높고 과즙이 풍부합니다.",
      isNew: true,
      seller: {
        id: 124,
        nickname: "토마토농장",
        profile_img: "/images/seller-profile2.jpg"
      },
      status: "판매중"
    },
    {
      id: 2,
      title: "유기농 상추 팝니다",
      product_title: "상추",
      price: 300,
      images: [
        "/images/sample-product.jpg"
      ],
      description: "농약을 사용하지 않고 키운 깨끗한 상추입니다. 쌈 채소로 최고입니다.",
      isNew: false,
      seller: {
        id: 125,
        nickname: "초록농장",
        profile_img: "/images/seller-profile3.jpg"
      },
      status: "판매중"
    }
  ];

  const getDetailpage = async () => {
    try {
      /*
      // api 변경
      const res = await fetch(`http://localhost:3000/api/detail/${id}`);
      
      if (!res.ok) {
        console.log('디테일 페이지 api 연결 실패');
      }
      const data = await res.json();

      if (data.success) {
        setProduct(data.data);
      } else {
        console.error('상품을 찾을 수 없습니다:', data.error);
        setProduct(null);
      }
      */  
    } catch (error) {
      console.log("상품 상세 정보 API 호출 실패");
      
      // ❌ API 연동 시 에러 시 더미 데이터 사용
      let foundProduct = dummyData.find(item => item.id === parseInt(id));
      
      // ❌ API 연동 시 에러 시 더미 데이터 사용 Sellingpost에서 등록된 상품인지 확인 
      if (!foundProduct) {
        const sellingProducts = JSON.parse(localStorage.getItem("sellingProducts") || "[]");
        const sellingProduct = sellingProducts.find(item => item.id === parseInt(id));
        
        if (sellingProduct) {
          foundProduct = {
            ...sellingProduct,
            product_title: sellingProduct.product_name,
            images: sellingProduct.images > 0 ? ["/images/sample-product.jpg"] : [],
            seller: {
              id: Date.now(),
              nickname: sellingProduct.sellerNickname || '판매자',
              profile_img: "/images/default-profile.jpg"
            }
          };
        }
      }
      
      setProduct(foundProduct || null);
    }
  }

  // 로그인 상태 확인 함수
  const checkLoginStatus = () => {
    /*
    // api 변경 
    const token = localStorage.getItem("token");
    if (token) {
      fetch('/api/auth/verify')
      .then(res => res.ok ? setIsLoggedIn(true) : setIsLoggedIn(false))
      .catch(() => setIsLoggedIn(false));
    } else {
      setIsLoggedIn(false);
    }
    */

    // ❌ API 연동 시 삭제: localStorage 기반 로그인 확인
    const userInfo = localStorage.getItem("userInfo");
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!(userInfo && token));
  };

  const loadWishStatus = () => {
    /*
    // api 수정 - 찜 상태 API 확인
    fetch(`/api/user/wishlist/check/${id}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => setIsWished(data.isWished))
    .catch(error => console.log("찜 상태 확인 실패:", error));
    */

    // ❌ API 연동 시 삭제: localStorage 기반 찜 상태 확인
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsWished(wishlist.some(item => item.id === parseInt(id)));
  };

  const handleChatClick = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }else{
      navigate("/chat");
    }
  };

  const handleWishClick = async () => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    try {
      if (isWished) {
        // 찜 해제
        /*
        // api 수정
        const res = await fetch(`/api/user/wishlist/${product.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!res.ok) {
          console.log('찜해제 api 연결 실패');
        }
        
        setIsWished(false);
        console.log('찜이 해제되었습니다.');
        */

        // ❌ API 연동 시 삭제: 찜 해제 더미 데이터 처리
        let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        wishlist = wishlist.filter(item => item.id !== product.id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        setIsWished(false);
        
        console.log('찜이 해제되었습니다.');

      } else {
        // 찜하기
        /*
        // api 수정
        const wishData = {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.images?.[0] || '',
          sellerNickname: product.seller?.nickname || ''
        };

        const res = await fetch('/api/user/wishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(wishData)
        });
        
        if (!res.ok) {
          throw new Error('찜하기 데이터 api 연결 실패');
        }
        
        setIsWished(true);
        console.log('찜이 추가되었습니다.');
        */

        // ❌ API 연동 시 삭제: 찜하기 더미 데이터 처리
        let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        wishlist.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images?.[0] || '',
          sellerNickname: product.seller?.nickname || ''
        });
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        setIsWished(true);
        
        console.log('찜이 추가되었습니다.');
      }

    } catch (error) {
      console.log("찜하기 API 호출 실패");
      
      // ❌ API 연동 시 삭제: 에러 시 더미 데이터로 처리
      if (isWished) {
        let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        wishlist = wishlist.filter(item => item.id !== product.id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        setIsWished(false);
      } else {
        let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        wishlist.push({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images?.[0] || '',
          sellerNickname: product.seller?.nickname || ''
        });
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        setIsWished(true);
      }
    }
  };

  useEffect(() => {
    getDetailpage();
    checkLoginStatus();
  }, [id]);

  useEffect(() => {
    if (isLoggedIn && product) {
      loadWishStatus();
    }
  }, [isLoggedIn, product, id]);

  // 여러장의 이미지를 위한 이미지 배열화
  const imageList = product?.images?.length > 0
    ? product.images
    : ["/images/sample-product.jpg"];

  return (
    <div className="detailpage">
      <div className="container">
        <Header />
        <div className="main-grid">
          <section className="detail-left">
            <div className="image-slider">
              <img
                src={imageList[0]}
                alt={product?.product_title || "상품"}
                onError={(e) => {
                  e.target.src = "/images/sample-product.jpg";
                }}
              />
              <button className="slider-arrow left">{'<'}</button>
              <button className="slider-arrow right">{'>'}</button>
              <div className="slider-indicator">
                {imageList.map((_, index) => (
                  <span
                    key={index}
                    className={index === 0 ? 'active' : ''}
                  ></span>
                ))}
              </div>
            </div>
          </section>
          <section className="detail-right">
            <div className="category-badge">
              {product?.isNew ? '신상' : '일반'}
            </div>
            <div className="product-title-main">
              {product?.title || '제목'}
            </div>
            <div className="product-row">
              <div className="product-title">
                {product?.product_title || '상품명'}
              </div>
              <div className="product-price">
                {product?.price ? `${product.price.toLocaleString()}포인트` : '가격'}
              </div>
            </div>
            <div className="product-desc-label">상품 설명</div>
            <div className="product-desc">
              {product?.description || '상품에 대한 설명이 없습니다.'}
            </div>
            <button 
              className="chat-btn" 
              onClick={handleChatClick}
              title={!isLoggedIn ? "로그인이 필요한 서비스입니다." : ""}
            >
              채팅 보내기
            </button>
            <div className="product-actions">
              <button 
                className={`wish-btn ${isWished ? 'wished' : ''}`}
                onClick={handleWishClick}
                title={!isLoggedIn ? "로그인이 필요한 서비스입니다." : ""}
              >
                {isWished ? (
                  <>❤️ 상품 찜하기</>
                ) : (
                  <>♡ 상품 찜하기</>
                )}
              </button>
            </div>
          </section>
        </div>
        <div className="detail-bottom-grid">
          <section className="bottom-left">
            <div className="bottom-title">상품 설명</div>
            <div className="bottom-divider"></div>
            <div className="bottom-desc-box">
              {product?.description || '상품에 대한 설명이 없습니다.'}
            </div>
          </section>
          <section className="bottom-right">
            <div className="bottom-title">판매자 정보</div>
            <div className="bottom-divider"></div>
            <div className="seller-profile">
              <div className="profile-img">
                {product?.seller?.profile_img && (
                  <img
                    src={product.seller.profile_img}
                    alt=""
                    onError={(e) => {
                      e.target.src = "/images/default-profile.jpg";
                    }}
                  />
                )}
              </div>
              <div className="seller-info">
                <div className="seller-name">
                  {product?.seller?.nickname || '판매자 닉네임'}
                </div>
              </div>
            </div>
            <button 
              className="chat-btn bottom"
              onClick={handleChatClick}
              title={!isLoggedIn ? "로그인이 필요한 서비스입니다." : ""}
            >
              채팅 보내기
            </button>
            <button 
              className={`wish-btn bottom ${isWished ? 'wished' : ''}`}
              onClick={handleWishClick}
              title={!isLoggedIn ? "로그인이 필요한 서비스입니다." : ""}
            >
              {isWished ? (
                <>❤️ 상품 찜하기</>
              ) : (
                <>♡ 상품 찜하기</>
              )}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Detailpage;

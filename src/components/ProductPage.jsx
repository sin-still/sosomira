import { BiLoader } from "react-icons/bi";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductPage.scss";
import { API_URL } from "../config/constants";
import dayjs from "dayjs";
import { Button, message, Modal, Input } from "antd";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const getProduct = () => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        setProduct(result.data.product); // 데이터 구조에 맞게 .product를 추가합니다.
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("결제가 완료되었습니다.");
      })
      .catch((error) => {
        message.error(`에러가 발생했습니다.${error.message}`);
      });
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    const correctPassword = process.env.REACT_APP_PASSWORD; // 실제 올바른 비밀번호로 대체해주세요
    if (passwordInput === correctPassword) {
      setIsModalVisible(false);
      onDeleteProduct();
    } else {
      message.error("현재 비밀번호는 123입니다 (임시).");
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const onClickDelete = () => {
    showModal();
  };

  const onDeleteProduct = () => {
    axios
      .delete(`${API_URL}/products/${id}`)
      .then((result) => {
        message.info("상품을 삭제하였습니다.");
        navigate(-1); // 삭제 후 이전 페이지로 이동
      })
      .catch((error) => {
        message.error(`에러가 발생했습니다.${error.message}`);
      });
  };

  

  if (product === null) {
    return (
      <h2>
        상품정보를 받고 있습니다
        <BiLoader className="loadingIcon" />
      </h2>
    );
  }

  return (
    <div className="detailPage">
      <h2>상세페이지</h2>
      <button onClick={() => navigate(-1)} id="back-btn" style={{ cursor: "pointer" }}>
        이전페이지
      </button>
      <div className="detailPage-box">
        {product.soldout === 1 ? (
          <div className="product-blur">
            <span>SOLD OUT</span>
          </div>
        ) : null}
        <div id="image-box">
          <img src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
        </div>
        
        <div id="contents-box" className="contents-box">
          <div id="name" className="content-item">{product.name}</div>
          <div id="description">{product.description}</div>
          <div id="price" className="content-item">
            <span className="title">판매가 </span>
            {product.price}원
          </div>
          <div id="product-seller" className="content-item">
            <span className="title">판매자</span>
            {product.seller}
          </div>
          <div id="createAt" className="content-item">
          <span className="title">업로드 날짜</span>
            {dayjs(product.createdAt).format("YYYY년 MM월 DD일")}
          </div>
          <div id="payBtn">
            <Button
              type="primary"
              danger
              className="payment pay-btn"
              size="large"
              onClick={onClickPurchase}
              disabled={product.soldout === 1 ? true : false}
            >
              결제하기
            </Button>
            <Button
              type="primary"
              danger
              className="delete pay-btn"
              onClick={onClickDelete}
              size="large"
            >
              삭제하기
            </Button>
          </div>
          <Modal
            title="비밀번호 입력"
            visible={isModalVisible}
            onOk={handleModalOk}
            onCancel={handleModalCancel}
          >
            <Input
              type="password"
              value={passwordInput}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력하세요."
            />
          </Modal>
          
          
        </div>
      </div>
      <h3>{id}번째 페이지입니다.</h3>
    </div>
  );
};

export default ProductPage;

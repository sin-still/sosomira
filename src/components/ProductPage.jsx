import { BiLoader } from "react-icons/bi";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./ProductPage.scss";
import { API_URL } from "../config/constants";
import dayjs from "dayjs";

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`${ API_URL }/products/${id}`)
            .then((result) => {
                setProduct(result.data.product); // 데이터 구조에 맞게 .product를 추가합니다.
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    console.log(product);

    if (product === null) {
        return <h2>상품정보를 받고 있습니다<BiLoader className="loadingIcon" /></h2>;
    }

    return (
        <div>
            <button onClick={() => navigate(-1)} id="back-btn">이전페이지</button>
            <div id="image-box">
                <img src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
            </div>
            <div id="profile-box">
                <img src="/img/products/avatar.png" alt={product.seller} />
                <span className="product-seller">{product.seller}</span>
            </div>
            <div id="contents-box">
                <div id="name">{product.name}</div>
                <div id="price">{product.price}</div>
                <div id="createAt">{dayjs(product.createdAt).format('YYYY년 MM월 DD일')}</div>
                <div id="description">{product.description}</div>
            </div>
            <h2>상세페이지</h2>
            <h3>{id}번째 페이지입니다.</h3>
        </div>
    );
};

export default ProductPage;
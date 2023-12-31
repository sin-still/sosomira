import { AiOutlineMinus } from "react-icons/ai"; 
import { BiPlus } from "react-icons/bi"; 
import { AiFillAliwangwang } from "react-icons/ai"; 
import React, { useEffect, useState } from 'react';
import MainSlide from './MainSlide';
import Magazine from './Magazine';
import Mdpick from './Mdpick';
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config/constants";
import Screen from "./Screen";

const MainPage = () => {
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    
    const [showAllProducts, setShowAllProducts] = useState(false);
    // 보여지는 프로덕트 총개수
    const [visibleCount, setVisibleCount] = useState(8);
    Screen(setVisibleCount);

    useEffect(() => {
        let url = `${ API_URL }/products`;
        axios.get(url)
            .then((result) => {
                const products = result.data.product;
                setProducts(products);

                // Only update displayedProducts when not showing all products
                if (!showAllProducts) {
                    setDisplayedProducts(products.slice(0, visibleCount));
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [visibleCount, showAllProducts]);

    const handleLoadMore = () => {
        if (visibleCount + 4 <= products.length) {
            setDisplayedProducts(products.slice(0, visibleCount + 4));
            setVisibleCount(visibleCount + 4);
        } else {
            setDisplayedProducts(products);
            setVisibleCount(products.length);
            setShowAllProducts(true);
        }
    };

    const handleToggleProducts = () => {
        setShowAllProducts(!showAllProducts);
        if (!showAllProducts) {
            setDisplayedProducts(products.slice(0, visibleCount + 4)); // Show limited products with the next batch
        } else {
            setDisplayedProducts(products.slice(0, visibleCount)); // Show limited products
        }
    };

    return (
        <div>
            <MainSlide />
            <Mdpick />
            <div className="banner">
                <p>
                    
                </p>
            </div>
            <div className="products">
                <h2 className="products-title">Products</h2>
                <div id="product-list" className="p-list">
                    {displayedProducts.map((product, idx) => {
                        idx++
                        return (
                            <div className="product-card" key={product.id}>
                                {product.soldout === 1? <div className="product-blur"><span>SOLD OUT</span></div> : null}
                                <Link className="product-link" to={`/productpage/${product.id}`}>
                                    <div className="product-imgBox">
                                        <img src={`${API_URL}/${product.imageUrl}`} alt="프로덕트이미지01"  className="product-img" />
                                    </div>
                                    <div className="product-contents">
                                        <div className="product-name"er>{product.name}</div>
                                        <div className="product-price">{product.price}원</div>
                                        <div className="product-seller">
                                            <AiFillAliwangwang className="product-avatar" />
                                            <span className="seller">{product.seller}</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })} 
                </div>
                <div className="productsBtnBox">
                    {visibleCount < products.length && (
                        <button onClick={handleLoadMore} className="productsBtn">
                            <BiPlus />
                        </button>
                    )}
                    {visibleCount >= products.length && null
                    /* (
                        <button onClick={handleToggleProducts} className="productsBtn">
                            
                        </button>
                    ) */
                    }
                </div>
            </div>
            <Magazine />
        </div>
    );
};

export default MainPage;

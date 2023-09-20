import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config/constants";
import { AiFillAliwangwang } from "react-icons/ai"; 
import { BiPlus } from "react-icons/bi"; 
import { AiOutlineMinus } from "react-icons/ai"; 
import { Radio } from 'antd';

const Kitchen = () => {
    
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [visibleCount, setVisibleCount] = useState(12);
    const [showAllProducts, setShowAllProducts] = useState(false);
    const [selectedValue, setSelectedValue] = useState("a")
    const categoryData = () => {
        if (selectedValue === 'a') {
            return 'C02';
        } else if (selectedValue === 'b') {
            return 'C0201';
        } else if (selectedValue === 'c') {
            return 'C0202';
        } else {
            return 'Unknown Category';
        }
    };
    console.log(categoryData());
    useEffect(() => {
        let url = `${ API_URL }/products`;
        axios.get(url)
            .then((result) => {
                const products = result.data.product.filter(item => item.category.includes(categoryData())) ;
                console.log(categoryData())
                setProducts(products);
                setDisplayedProducts(products.slice(0, visibleCount));
            })
            .catch((error) => {
                console.log(error);
            });
    }, [visibleCount, selectedValue]);

    const handleLoadMore = () => {
        if (visibleCount + 12 < products.length) {
            setVisibleCount(visibleCount + 12);
        } else {
            setVisibleCount(products.length);
            setShowAllProducts(true);
        }
    };

    const handleToggleProducts = () => {
        setShowAllProducts(!showAllProducts);
        if (!showAllProducts) {
            setVisibleCount(products.length);
        } else {
            setVisibleCount(4);
        }
    };
    const onChange = (e) => {
        const value = e.target.value; // 선택된 라디오 버튼의 값
        setSelectedValue(value); // selectedValue를 업데이트
    
        console.log(`radio checked: ${value}`);
    };
    return (
        <div>

            <div className="products">
                <h2 className="products-title">주방용품</h2>
                <div className='products-tab'>
                    <Radio.Group onChange={onChange} defaultValue={selectedValue} className='products-tab-menu'>
                        <Radio.Button className='products-tab-item' value="a">ALL</Radio.Button>
                        <Radio.Button className='products-tab-item' value="b">티세트</Radio.Button>
                        <Radio.Button className='products-tab-item' value="c">그릇/접시</Radio.Button>
                    </Radio.Group>
                </div>
                <div id="product-list" className="p-list">
                    {displayedProducts.map((product) => {
                        
                        return (
                            <div className="product-card" key={product.id}>
                                {product.soldout === 1? <div className="product-blur"><span>SOLD OUT</span></div> : null}
                                <Link className="product-link" to={`/productpage/${product.id}`}>
                                    <div className="product-imgBox">
                                        <img src={`${API_URL}/${product.imageUrl}`} alt="프로덕트이미지01"  className="product-img" />
                                    </div>
                                    <div className="product-contents">
                                        <div className="product-name">{product.name}</div>
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
                    {/* {visibleCount >= products.length && (
                        <button onClick={handleToggleProducts} className="productsBtn">
                        </button>
                    )} */}
                </div>
            </div>
        </div>
    );
};

export default Kitchen;
import React from 'react';

const Mdpick = () => {
    return (
        <div>
            <div className='mdpick'>
                <h2>MD Pick</h2>
                <div className="mdList">
                    <ul>
                        <li>
                            <span className='md-img'><img src="img/products/product37.jpg" alt="dd" /></span>
                            <div className='md-info'>
                                <span className='md-name'>여우 오브제</span>
                                <span className='md-price'>118000</span>
                            </div>
                        </li>
                        <li>
                            <span className='md-img'><img src="img/products/product09.jpg" alt="dd" /></span>
                            <div className='md-info'>
                                <span className='md-name'>플라워글라스</span>
                                <span className='md-price'>78000</span>
                            </div>
                        </li>
                        <li>
                            <span className='md-img'><img src="img/products/product36.jpg" alt="dd" /></span>
                            <div className='md-info'>
                                <span className='md-name'>선인장 로보</span>
                                <span className='md-price'>98000</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Mdpick;
import React from 'react';
import { Link, NavLink } from 'react-router-dom';



const Navbar = ({hideLoginModal, showLoginModal, isLoginModalOpen, setIsLoginModalOpen, accessResult, logout, user_id}) => {
    const activeStyle = {
        color : '#ed6363'
    }
    
    return (
        <nav className='nav'>
            <ul className='listWrap'>
                <li><NavLink to='/'style={({isActive}) =>( isActive ? activeStyle : undefined )}>HOME</NavLink></li>
                <li><NavLink to='/interior' style={({isActive}) =>( isActive ? activeStyle : undefined )}>인테리어</NavLink></li>
                <li><NavLink to='/kitchen' style={({isActive}) =>( isActive ? activeStyle : undefined )}>주방용품</NavLink></li>
                <li><NavLink to='/light' style={({isActive}) =>( isActive ? activeStyle : undefined )}>조명</NavLink></li>
                <li><NavLink to='/fabric' style={({isActive}) =>( isActive ? activeStyle : undefined )}>페브릭/생활</NavLink></li>
                <li className={`mobileSgin ${accessResult == true ? 'none' : null}`} >
                    <ul>
                        <li onClick={showLoginModal} className="sign-in">로그인</li>
                        <li className="sign-up">
                            <Link to='/signup'>회원가입</Link>
                        </li>
                    </ul>
                </li>
                <li className={`mobileSgin ${accessResult == true ? 'show' : 'none'}`} >
                    <ul>
                        <li className="user-info">{user_id}님 반갑습니다</li>
                        <li className="logout-box">
                            <div className="logout" onClick={()=>logout()}>로그아웃</div>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
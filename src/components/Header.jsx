import { AiOutlineClose } from "react-icons/ai"
import { GiHamburgerMenu } from "react-icons/gi"
import { CgSoftwareDownload } from "react-icons/cg"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../img/sosomira1.svg"
import Navbar from "./Navbar"
import { CSSTransition } from "react-transition-group"
import "./DropdownMenu.css"
import ScrollPosition from "../event/ScrollPosition"
import { Button, Modal } from "antd"
import LoginModal from "./LoginModal"
import { isActiveToken } from "./AccessTokenContext"

const Header = () => {
   const [accessResult, setAccessResult] = useState(null);
   const [user_id, setUserId] = useState(null);
   function logout(){
      localStorage.removeItem('accessToken');
      setAccessResult(false);
      window.location.href = '/';
   }
   const accessToken = localStorage.getItem('accessToken');
   
   useEffect(() => {
      // AccessToken을 사용하는 코드
      
      
      const verifyToken = async () => {
        const result = await isActiveToken(accessToken);
        setAccessResult(result.accessResult); // 결과를 상태로 설정 (true, false)
        setUserId(result.user_id);
      };
      
      verifyToken();
    }, [accessToken, accessResult]);
   const scrollPosition = ScrollPosition()
   const navigate = useNavigate()
   const [icon, setIcon] = useState(true)
   const toggleMenu = () => {
      setIcon((prevIcon) => !prevIcon)
   }
   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
   const showLoginModal = () => {
      setIsLoginModalOpen(true)
   }
   const hideLoginModal = () => {
      setIsLoginModalOpen(false)
   }

   useEffect(() => {
     
   }, [icon])
   useEffect(() => {
      // 페이지가 이동될 때마다 icon 상태를 초기화
      setIcon(true);
    }, [window.location.pathname]);

   
   
   if(accessResult == true){
      return (
         <header className={`header ${scrollPosition > 0 ? "h-fixed" : ""}`}>
            <div className='container'>
               <h1 className='logoBox'>
                  <Link to='/'>
                     <img className='logo' src={logo} alt='logo' />
                  </Link>
               </h1>
               <Navbar 
                  hideLoginModal={hideLoginModal} 
                  showLoginModal={showLoginModal} 
                  isLoginModalOpen={isLoginModalOpen} 
                  setIsLoginModalOpen={setIsLoginModalOpen} 
                  accessResult={accessResult} 
                  logout={logout} 
                  user_id={user_id}
               />
               <div className='mobileBar'>
                  {icon ? (
                     <GiHamburgerMenu
                        className='hamburgerIcon'
                        onClick={toggleMenu}
                     />
                  ) : (
                     <AiOutlineClose className='closeIcon' onClick={toggleMenu} />
                  )}
                  <CSSTransition
                     in={!icon}
                     timeout={300}
                     classNames='menu'
                     unmountOnExit
                  >
                     <Navbar 
                        hideLoginModal={hideLoginModal} 
                        showLoginModal={showLoginModal} 
                        isLoginModalOpen={isLoginModalOpen} 
                        setIsLoginModalOpen={setIsLoginModalOpen} 
                        accessResult={accessResult} 
                        logout={logout} 
                        user_id={user_id}
                     />
                  </CSSTransition>
               </div>
               <div className="signArea-user">
                  <ul className="signList">
                     <li className="user-info">{user_id}님 반갑습니다</li>
                     <li className="logout-box">
                        <div className="logout" onClick={()=>logout()}>로그아웃</div>
                     </li>
                  </ul>
               </div>
               <button className='btn' onClick={() => navigate("/uploadpage")}>
                  <CgSoftwareDownload />
               </button>
            </div>
            <LoginModal isOpen={isLoginModalOpen} onClose={hideLoginModal} />
         </header>
      )
   } else {
      return (
         <header className={`header ${scrollPosition > 0 ? "h-fixed" : ""}`}>
            <div className='container'>
               <h1 className='logoBox'>
                  <Link to='/'>
                     <img className='logo' src={logo} alt='logo' />
                  </Link>
               </h1>
               <Navbar 
                  hideLoginModal={hideLoginModal} 
                  showLoginModal={showLoginModal} 
                  isLoginModalOpen={isLoginModalOpen} 
                  setIsLoginModalOpen={setIsLoginModalOpen}
               />
               <div className='mobileBar'>
                  {icon ? (
                     <GiHamburgerMenu
                        className='hamburgerIcon'
                        onClick={toggleMenu}
                     />
                  ) : (
                     <AiOutlineClose className='closeIcon' onClick={toggleMenu} />
                  )}
                  <CSSTransition
                     in={!icon}
                     timeout={300}
                     classNames='menu'
                     unmountOnExit
                  >
                     <Navbar 
                        hideLoginModal={hideLoginModal} 
                        showLoginModal={showLoginModal} 
                        isLoginModalOpen={isLoginModalOpen} 
                        setIsLoginModalOpen={setIsLoginModalOpen}
                     />
                  </CSSTransition>
               </div>
               <div className="signArea">
                  <ul className="signList">
                     <li onClick={showLoginModal} className="sign-in">로그인</li>
                     <li className="sign-up">
                        <Link to='/signup'>회원가입</Link>
                     </li>
                  </ul>
               </div>
            </div>
            <LoginModal isOpen={isLoginModalOpen} onClose={hideLoginModal} />
         </header>
      )
   }
}

export default Header

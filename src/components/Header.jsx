import { AiOutlineClose } from "react-icons/ai"; 
import { GiHamburgerMenu } from "react-icons/gi"; 
import { CgSoftwareDownload } from "react-icons/cg"; 
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../img/sosomira1.svg';
import Navbar from './Navbar';
import { CSSTransition } from 'react-transition-group';
import './DropdownMenu.css'



const Header = () => {
    const navigate = useNavigate()
    const [ icon, setIcon ] = useState(true);
    const toggleMenu = ()=>{
        setIcon(prevIcon => !prevIcon);
    }
    useEffect(() => {
        console.log('Navbar is rendered');
    }, [icon]);
  
    return (
        <header className='header'>
            <div className='container'>
                <h1 className='logoBox'><Link to="/"><img className='logo' src={logo} alt="logo" /></Link></h1>
                <Navbar/>
                <div className="mobileBar">
                    {icon ? <GiHamburgerMenu className="hamburgerIcon"  onClick={toggleMenu}/> : <AiOutlineClose className="closeIcon" onClick={toggleMenu}/>}
                    <CSSTransition
                  in={!icon}
                  timeout={300}
                  classNames="menu"
                  unmountOnExit
                  ><Navbar /></CSSTransition>

                </div>
                <button className='btn' onClick={()=> navigate('/uploadpage')}><CgSoftwareDownload/></button>
            </div>
        </header>
    );
};

export default Header;
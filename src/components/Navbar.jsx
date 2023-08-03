import React from 'react';
import { NavLink } from 'react-router-dom';



const Navbar = () => {
    const activeStyle = {
        color : '#ed6363'
    }
    return (
        <nav className='nav'>
            <ul className='listWrap'>
                <li><NavLink to='/'style={({isActive}) =>( isActive ? activeStyle : undefined )}>HOME</NavLink></li>
                <li><NavLink to='/interior' style={({isActive}) =>( isActive ? activeStyle : undefined )}>인테리어</NavLink></li>
                <li><NavLink to='/kitchen' style={({isActive}) =>( isActive ? activeStyle : undefined )}>주방용품</NavLink></li>
                <li><NavLink to='/office' style={({isActive}) =>( isActive ? activeStyle : undefined )}>사무용품</NavLink></li>
                <li><NavLink to='/fabric' style={({isActive}) =>( isActive ? activeStyle : undefined )}>페브릭/생활</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;
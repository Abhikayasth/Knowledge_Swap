import React from 'react';
import Logo from '../img/Logo.png'; 
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='navbar'>
      <img src={Logo} alt="" />
      <ul className='nav-menu'>
        <Link to="/signup"><li>SignUp</li></Link>
        <Link to="/signin"><li>SignIn</li></Link>
        <Link to="/profile"><li>Profile</li></Link>
        <Link to="/CreatePost"><li>Create-Post</li></Link>
      </ul>
    </div>
  )
}

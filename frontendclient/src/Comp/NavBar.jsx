import React, { useState } from 'react'
import './Style/Navbar.css'

import Logo from './Logo.png'
import {useRef} from 'react'
import { Link } from 'react-router-dom'
import {FaBars,FaTimes} from 'react-icons/fa'


function MyNavBar(){
  const NavRef=useRef();
  const {toogle} = useState(true);
  const shownavbar=()=>{
    NavRef.current.classList.toggle("responsive_nav");
  }

  return (
    <header className='navbar'>
        <a>
          <Link to="/">
            <img src={Logo} alt="logo" height={90}/>
          </Link>
        </a>
         <nav className='nav-menu' ref={NavRef}>
            <a><Link to="/">Acceuil</Link></a>

            <a><Link to="/services">Service apres vente</Link></a>

            <a><Link to="/help">Guide/Aide</Link></a>

            <a><Link to="/contact">Contact</Link></a>

            <button className="nav-btn nav-close-btn" onClick={shownavbar}><FaTimes/></button>
          </nav>
          <button className="nav-btn" onClick={shownavbar} ><FaBars/></button>
    </header>
  );
}

export default MyNavBar
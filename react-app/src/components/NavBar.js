import React from 'react';
import LogoutButton from './auth/LogoutButton';
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div id='nav_container'>
    <nav id='nav_home'>
      <Link to="/home"><div id='nav_logo_home'></div></Link>
      <div id='nav_logout_home'><LogoutButton /></div>
    </nav>
    </div>
  );
}

export default NavBar;

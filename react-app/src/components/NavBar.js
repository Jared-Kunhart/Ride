
import React from 'react';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  return (
    <div id='nav_container'>
    <nav id='nav_home'>
      <div id='nav_logo_home'></div>
      <div id='nav_logout_home'><LogoutButton /></div>
    </nav>
    </div>
  );
}

export default NavBar;

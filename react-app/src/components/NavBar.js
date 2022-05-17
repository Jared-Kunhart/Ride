import React, { useState } from 'react';
import LogoutButton from './auth/LogoutButton';
import { Spin as Hamburger } from 'hamburger-react'
import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const [isOpen, setOpen] = useState(false)

  const onToggle = () => {
    setOpen(false)
  }

  return (
    <div id='nav_container'>
    <nav id='nav_home'>
      <Link to="/home"><div id='nav_logo_home'></div></Link>

        <div id='nav_logout_home'>
          <Popup
            position="bottom right"
            nested
            trigger={
            <div>
            <Hamburger
              className="button"
              color="#FFFFFF"
              toggled={isOpen}
              toggle={setOpen}
              label="Show menu"
              direction="left"
              rounded
            />
            </div>}
          >
          <div id='nav_popup_content'>
            <Link onClick={onToggle} id='home_link' to="/home">Home</Link>
              <div id='kitt'>
                <div class='one'></div>
                <div class='two'></div>
                <div class='three'></div>
                <div class='four'></div>
                <div class='five'></div>
                <div class='six'></div>
                <div class='seven'></div>
                <div class='eight'></div>
                <div class='nine'></div>
                <div class='ten'></div>
              </div>
            <Link onClick={onToggle} id='profile_link' to={`/home/${user.id}`}>Profile</Link>
            <LogoutButton />
          </div>
          </Popup>
        </div>
    </nav>
    </div>
  );
}

export default NavBar;

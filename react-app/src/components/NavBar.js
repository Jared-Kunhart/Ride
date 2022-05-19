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
            on="hover"
            contentStyle={{ padding: '0px', border: 'none' }}
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
            onClose={onToggle}
          >
          <div id='nav_popup_content'>
            <Link onClick={onToggle} id='home_link' to="/home">Home</Link>
              <div id='kitt'>
                <div className='one'></div>
                <div className='two'></div>
                <div className='three'></div>
                <div className='four'></div>
                <div className='five'></div>
                <div className='six'></div>
                <div className='seven'></div>
                <div className='eight'></div>
                <div className='nine'></div>
                <div className='ten'></div>
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

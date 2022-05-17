import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import Review from './RideReview';
import './User.css'

function User() {
  const somethingclever = useSelector(state => state.session.user)
  const [user, setUser] = useState({});
  const { userId }  = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <>
    {user && somethingclever?.id === +userId ?
      <div id='user_content'>
        <div id='user_content_container'>
          <div id='user_left_side_content'>
            <div id='user_left_side_profile'>
              <div className='profile_div'>
              <img id='profile_placeholder' alt='' src='/static/images/profile_placeholder.png' />
              </div>
              <div className='profile_div'>
              {user.firstname} {user.lastname}
              </div>
              <div id='email_div' className='profile_div'>
              {user.email}
              </div>
            </div>
          </div>
          <div id='user_right_side_content'>
            <div id='user_right_side_reviews'>
              <Review />
            </div>
            </div>
        </div>
      </div>
      : <Redirect to="/home" />}
    </>
  );
}
export default User;

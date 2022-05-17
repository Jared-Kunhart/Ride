import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Review from './RideReview';
import './User.css'

function User() {
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
      <div id='user_content'>
        <div id='user_content_container'>
          <div id='user_left_side_content'>
            <div id='user_left_side_profile'>
              {user.firstname}{user.lastname}
              <div>
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
    </>
  );
}
export default User;

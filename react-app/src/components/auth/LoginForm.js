import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './index.css'


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='sign_up_page_layout'>
      <div className='sign_up_container'>
        <div className='sign_up_panel'>
          <div className='ride_logo_form'><Link to='/'><img className='ride_logo_small' alt='' src='/static/images/rideblack.png'></img></Link>
            <div className='login_welcome_text'><h1>Welcome back to Ride!</h1>
              <div className='filler_text'>Please enter your email and password.</div>
    <form id='login_form' onSubmit={onLogin}>
      <div id='error_div'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <input
          className='login_input'
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <input
          className='login_input'
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
       <div id='robot_div'>
      <input id='login_checkboxa' type='checkbox'></input>
      <label className='login_label'>Keep me signed in.</label>
      </div>
      <div id='button_align_center'>
        <button className='blue_login_button' type='submit'>Login</button>
        <Link to='/demo'><button className='blue_login_button'>Demo</button></Link>
      </div>
      </div>
    </form>
    <div className='footer_login'>Ride. A lyft clone by<a id="dev-link" target="_blank" href='https://github.com/Jared-Kunhart'> Jared Kunhart.</a></div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default LoginForm;

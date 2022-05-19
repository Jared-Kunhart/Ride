import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './index.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const is_driver = false
  const is_available = false

  const onSignUp = async (e) => {
    e.preventDefault();
      const data = await dispatch(signUp(email, firstname, lastname, password, repeatPassword, is_driver, is_available));
      if (data) {
        setErrors(data)
      }
  };

  const updatefirstname = (e) => {
    setFirstname(e.target.value);
  };

  const updatelastname = (e) => {
    setLastname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='sign_up_page_layout'>
    <div className='sign_up_container'>
      <div className='sign_up_panel_large'>
        <div className='ride_logo_form'><Link to='/'><img className='ride_logo_small' alt='' src='/static/images/rideblack.png'></img></Link>
          <div className='signup_welcome_text'><h1>Sign up to Ride!</h1>
            <div className='filler_text'>Whether you've been riding with us or it's your first time, let's get your info.</div>
    <form onSubmit={onSignUp}>
      <div id='error_div'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='signup_name'>
      <div>
        <input
          className='signup_input_name'
          id='input_name'
          type='text'
          name='firstname'
          onChange={updatefirstname}
          value={firstname}
          placeholder='First name*'
        ></input>
      </div>
      <div>
        <input
          className='signup_input_name'
          type='text'
          name='lastname'
          onChange={updatelastname}
          value={lastname}
          placeholder='Last name*'
        ></input>
      </div>
      </div>
      <div>
        <input
          className='login_input'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
          placeholder='Email address*'
        ></input>
      </div>
      <div>
        <input
          className='login_input'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
          placeholder='Password*'
        ></input>
      </div>
      <div>
        <input
          className='login_input'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
          placeholder='Password*'
        ></input>
      </div>
      <div id='button_align_center'>
      <button className='blue_login_button' type='submit'>Sign Up</button>
        <Link to='/demo'><button className='blue_login_button'>Demo</button></Link>
      </div>
    </form>
    <div className='footer_signup'>Ride. A lyft clone by<a id="dev-link" rel="noreferrer" target="_blank" href='https://github.com/Jared-Kunhart'> Jared Kunhart.</a></div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default SignUpForm;

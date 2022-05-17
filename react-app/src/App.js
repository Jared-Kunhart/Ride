import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import LandingPage from './components/Landing/LandingPage';
import LogoutButton from './components/auth/LogoutButton';
import Ride from './components/Ride/Ride';
import { getKey } from './store/key';
import LoginForm from './components/auth/LoginForm';
import Demo from './components/auth/Demo';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import User from './components/User';

function App() {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getKey())
  },[dispatch])

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  const Splash = () => {
    return (
      <div id="landing_page_wrapper">
        <LandingPage />
      </div>
    )
  }

  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {user ? <Redirect to="/home" /> : <Splash />}
          </Route>
          <ProtectedRoute path='/home' exact={true} >
            <NavBar />
            <Ride />
          </ProtectedRoute>
          <ProtectedRoute exact path="/home/:userId">
            <NavBar />
            <User />
          </ProtectedRoute>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/rider">
            <SignUpForm />
          </Route>
          <Route path="/driver">
            {/* <DriverSignUp /> */}
          </Route>
          <Route path="/demo">
            <Demo />
          </Route>
          {user ?
          <>
            <Switch>
              <Route>
                <h2>404 error</h2>
              </Route>
            </Switch>
          </>
          : <Redirect to="/" /> }
      </Switch>
    </BrowserRouter>
  );
}

export default App;

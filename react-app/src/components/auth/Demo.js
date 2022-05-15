import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './index.css'

const Demo = () => {
  const dispatch = useDispatch();
  const email = "rider@ride.com"
  const password = "password"

  const Login = async (e) => {
    const data = await dispatch(login(email, password));
    return data
  }
  Login()
  return (
      <Redirect to="/home" />
  )
}


export default Demo;

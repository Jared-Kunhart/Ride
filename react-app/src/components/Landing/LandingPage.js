import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import './landing.css'

export default function LandingPage() {
    return (
        <div>
            <div>
                LOGIN
            </div>
            <LoginForm />
            <div>
                SIGNUP
            </div>
            <SignUpForm />
        </div>
    )
}

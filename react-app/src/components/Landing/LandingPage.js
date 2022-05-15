import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import './landing.css'

export default function LandingPage() {
    return (
        <div id='landing_page'>
            <div id='main_content'>
                <div id='nav'>
                    <div id='nav_content'>
                        <div id='nav_logo'>Ride Logo</div>
                        <div id='nav_driver'>DRIVER</div>
                        <div id='nav_rider'>RIDER</div>
                        <div id='nav_login'>LOGIN</div>
                        <div id='nav_demo'>DEMO RIDER</div>
                    </div>
                </div>
                <div id='page_content'>
                    <div id='page_content_main_picture'>Picture</div>
                    <div id='page_content_side_content'>
                    <div id='page_content_text'>Let's Ride</div>
                    <div id='page_content_driver_signup_button'>Apply to drive</div>
                    <div id='page_content_rider_signup_button'>Sign up to ride</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

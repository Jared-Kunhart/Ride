import { Link } from 'react-router-dom';
import './landing.css'

export default function LandingPage() {

    return (
        <div id='landing_page'>
            <div id='main_content'>
                <div id='nav'>
                    <div id='nav_content'>
                        <div id='nav_logo'><Link to="/"><div id='ride_logo_png'></div></Link></div>
                        <div id='nav_driver'>DRIVER</div>
                        <div id='nav_rider'><Link to='/rider'>RIDER</Link></div>
                        <div id='nav_login'><Link to='/login'>LOGIN</Link></div>
                        <div id='nav_demo'><Link to='/demo'>DEMO RIDER</Link></div>
                    </div>
                </div>
                <div id='page_content'>
                    <div id='page_content_main_picture'><img id='roger' alt='' src='/static/images/roger.jpg' /></div>
                    <div id='page_content_side_content'>
                    <div id='page_content_text'><h1>Let's ride !</h1></div>
                    <div id='page_content_buttons'>
                    <div id='page_content_driver_signup_button'><button id='button_drive'>Apply to drive</button></div>
                    <div id='page_content_rider_signup_button'><Link className='no_text_decoration' to='/rider'><button id='button_ride'>Sign up to ride</button></Link></div>
                    </div>
                    </div>
                </div>
                <div id='sub_page_content'>

                </div>
            </div>
        </div>
    )
}

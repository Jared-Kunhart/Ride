import { Link } from 'react-router-dom';
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import "./styles.css";
import './landing.css'
import { useState } from 'react';

export default function LandingPage() {
    // const [source, setSource] = useState();

    // function randomImg() {
    // let images = [
    // "/static/images/backgrounds/chris.jpg",
    // "/static/images/backgrounds/roger.jpg",
    // "/static/images/backgrounds/2825802.gif"
    // ]
    // let random = images[Math.floor(Math.random() * images.length)];
    // document.querySelector("#roger").style.backgroundImage = 'url(' + random + ')';
    // setSource(random)
    // }
    // <div id='nav_driver'>DRIVER</div>
    //
    return (
        <div id='landing_page'>
            <div id='main_content'>
                <div id='nav'>
                    <div id='nav_content'>
                        <div id='nav_logo'><Link to="/"><div id='ride_logo_png'></div></Link></div>
                        <div id='nav_rider'><Link to='/rider'>RIDER</Link></div>
                        <div id='nav_login'><Link to='/login'>LOGIN</Link></div>
                        <div id='nav_demo'><Link to='/demo'>DEMO RIDER</Link></div>
                    </div>
                </div>
                <div id='page_content'>
                    <div id='page_content_main_picture'><img id='roger' alt='' src="/static/images/backgrounds/2825802.gif" type='image/jpeg' /></div>
                    <div id='page_content_side_content'>
                    <div id='page_content_text'><h1>Let's ride !</h1></div>

                    <div id='page_content_buttons'>
                    <div id='page_content_driver_signup_button'><Link className='no_text_decoration' to='/login'><button id='button_drive'>Login to Ride</button></Link></div>
                    <div id='page_content_rider_signup_button'><Link className='no_text_decoration' to='/rider'><button id='button_ride'>Sign up to Ride</button></Link></div>
                    </div>
                    </div>
                </div>
                <div id='sub_page_content'>
                <div id='sub_page_carousel'>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={60}
                    navigation={true}
                    height={"500px"}
                    autoplay={false}
                    loop={true}
                    pagination={{
                    clickable: true,
                    }}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                    <div><div className='slider_pics'>
                    <a href='https://fiasco071.github.io/Portfolio/' target="_blank" rel="noreferrer"><img alt='' id='slider_jfif' src='/static/images/steve.jfif'/></a></div>
                    “I thrive and perform well in pressure and approach every task with a sense of ownership. I am a full stack developer currently working on a React/redux and Flask project and various python DSA exercises.” {"\n"}
                    {"\n"}
                     — Steve
                    {"\n"}
                    Driving with Ride Since 1984.
                    </div>
                    </SwiperSlide>
                    <SwiperSlide><div><div className='slider_pics'>
                    <a href='https://jaydrojas.github.io/' target="_blank" rel="noreferrer"><img alt='' id='slider_jfif' src='/static/images/damian.jfif'/></a></div>
                    “I'm Damian Rojas, I am from Albuquerque, New mexico. I really enjoy learning programming languages and frameworks like React and Angular. Machine learning and artificial intelligence are technologies I hope to learn in the future.” {"\n"}
                    {"\n"}
                    — Damian
                    {"\n"}
                    Driving with Ride since 1954.
                    </div>
                    </SwiperSlide>
                    <SwiperSlide><div><div className='slider_pics'>
                    <a href='https://rogercamps.github.io' target="_blank" rel="noreferrer"><img alt='' id='slider_jfif' src='/static/images/roger.jfif'/></a></div>
                    “Born and raised in Barcelona, currently residing in SoCal. Coding full time and enjoying the sun and waves part time!”{"\n"}
                    {"\n"}
                    — Roger
                    {"\n"}
                     Driving with Ride since WW2.
                     </div>
                     </SwiperSlide>
                    <SwiperSlide><div><div className='slider_pics'>
                    <a href='https://jdvien.github.io/' target="_blank" rel="noreferrer"><img alt='' id='slider_jfif' src='/static/images/jason.jfif'/></a></div>
                    "I am a software developer who has never been happier where he is than here and now. I love spending my time building something, with a keyboard or with my hands."
                    {"\n"}
                    {"\n"}
                    — Jason
                    {"\n"}
                    Driving with Ride since 2014.
                    </div>
                    </SwiperSlide>
                    <SwiperSlide><div><div className='slider_pics'>
                    <a href='https://chrismizelldev.software/' target="_blank" rel="noreferrer"><img alt='' id='slider_jfif' src='/static/images/chris.jfif'/></a></div>
                    "Backend Engineer, based in San Francisco Bay area. Passion for learning and fixing broken projects! Debugging and building upon my existing skills is a skill I take great pride in."
                    {"\n"}
                    {"\n"}
                    — Chris
                    {"\n"}
                    Driving with Ride since 1999.
                    </div>
                    </SwiperSlide>
                </Swiper>

                </div>
                </div>
            </div>
        </div>

    )
}

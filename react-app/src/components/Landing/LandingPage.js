import { Link } from 'react-router-dom';
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import "./styles.css";
import './landing.css'

export default function LandingPage() {
    // <div id='nav_driver'>DRIVER</div>
    // <div id='page_content_driver_signup_button'><button id='button_drive'>Apply to drive</button></div>
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
                    <div id='page_content_main_picture'><img id='roger' alt='' src='/static/images/chris.jpg' /></div>
                    <div id='page_content_side_content'>
                    <div id='page_content_text'><h1>Let's ride !</h1></div>
                    <div id='page_content_buttons'>

                    <div id='page_content_rider_signup_button'><Link className='no_text_decoration' to='/rider'><button id='button_ride'>Sign up to ride</button></Link></div>
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
                    <img alt='' id='slider_jfif' src='/static/images/steve.jfif'/></div>
                    “As a student, it's hard to complete my class work around a schedule. I started driving more with Lyft and realized it was the perfect opportunity to make money and work on my own time! Driving with Lyft gives me freedom in my schedule to focus on school, which is my main priority.” {"\n"}
                    {"\n"}
                     — Steve
                    {"\n"}
                    Driving with Lyft Since 1984.
                    </div>
                    </SwiperSlide>
                    <SwiperSlide><div><div className='slider_pics'>
                    <img alt='' id='slider_jfif' src='/static/images/damian.jfif'/></div>
                    “My motto is very simple. It doesn't cost you a penny to be nice and kind, but it will cost you everything if you're not. If I'm free and somebody needs my help, I'll be the first one to jump in, in a heartbeat.” {"\n"}
                    {"\n"}
                    — Damian
                    {"\n"}
                    Driving with Ride since 1954.
                    </div>
                    </SwiperSlide>
                    <SwiperSlide><div><div className='slider_pics'>
                    <img alt='' id='slider_jfif' src='/static/images/roger.jfif'/></div>
                    “Driving with Lyft is the perfect way to make money and be there for my family's needs. I love providing a way to get my passengers from point A to B. Independence is key for me, and I enjoy meeting new people while driving!”{"\n"}
                    {"\n"}
                    — Roger
                    {"\n"}
                     Driving with Ride since WW2.
                     </div>
                     </SwiperSlide>
                    <SwiperSlide><div><div className='slider_pics'>
                    <img alt='' id='slider_jfif' src='/static/images/jason.jfif'/></div>
                    "I got to the drop-off address, and he said it wasn't where he lived. He couldn't communicate an address because he was so drunk. He told me to turn on certain streets, but we were going in circles. We approached a liquor store, and he told me to stop so he could go in. Then he threatened me and left his food in the car."
                    {"\n"}
                    {"\n"}
                    — Jason
                    {"\n"}
                    Driving with Ride since 2014.
                    </div>
                    </SwiperSlide>
                    <SwiperSlide><div><div className='slider_pics'>
                    <img alt='' id='slider_jfif' src='/static/images/chris.jfif'/></div>
                    "I picked up this guy who was drunk, and he asked me to take him to this bar. It was the bar he had just come out of."
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

import React from 'react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
// import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles

import 'swiper/swiper.min.css';
import Four from '../../Image/four.jpg';
import One from '../../Image/one.jpg';
import Three from '../../Image/three.jpg';
import Two from '../../Image/two.jpg';
import './header.css';

SwiperCore.use([Pagination, Autoplay]);

// create project header
const Header = () => (
    <div className="headers" id="home">
        <div className="header_slider">
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop
                style={{ height: '600px', width: '100%' }}
            >
                <SwiperSlide>
                    <img src={One} alt="ss" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Two} alt="sss" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Three} alt="ssss" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={Four} alt="ss" />
                </SwiperSlide>
            </Swiper>
        </div>
    </div>
);

export default Header;

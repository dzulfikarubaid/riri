import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
const MySwiper = () => {
  return (
    <Swiper
  
      className='h-fit text-[50px] text-white py-10 '
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 2000,
        pauseOnMouseEnter: true,
      }}
      effect='fade'
      fadeEffect={{crossFade: true}}
      onSlideChange={(swiper) =>
        isNaN(swiper.realIndex) && swiper.slideTo(0)
      }
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <div className='hover:underline'>
          <h1 >Experience is not necessarily Experiential.</h1>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className=""><h1 className='hover:underline'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores voluptates aliquid dolore laboriosam amet mollitia ea quis ad corrupti perspiciatis odio quasi doloremque ipsa, inventore quam necessitatibus facere. Quis, esse?</h1></div>
      </SwiperSlide>
      <div className="swiper-pagination"></div>
    </Swiper>
  );
};

export default MySwiper;

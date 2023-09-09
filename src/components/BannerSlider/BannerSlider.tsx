import React from 'react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/swiper-bundle.min.css';

import './BannerSlider.scss';
import { BannerItem } from '../BannerItem';

const banners = [
  'img/banners/banner-1.webp',
  'img/banners/banner-2.webp',
  'img/banners/banner-3.webp',
];

SwiperCore.use([Autoplay]);

export const BannerSlider: React.FC = () => {
  return (
    <div className="bannerSlider">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {banners.map((banner) => (
          <React.Fragment key={banner}>
            <SwiperSlide className="bannerSlider__slide">
              <BannerItem banner={banner} />
            </SwiperSlide>
          </React.Fragment>
        ))}
      </Swiper>
    </div>
  );
};

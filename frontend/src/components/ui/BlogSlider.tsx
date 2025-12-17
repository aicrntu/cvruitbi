"use client";

import { useEffect } from "react";
import Swiper from "swiper";
import {
  Pagination,
  Mousewheel,
  EffectFade,
  Autoplay
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./blog-slider.css";

export default function BlogSlider() {
  useEffect(() => {
    new Swiper(".blog-slider", {
      modules: [Pagination, Mousewheel, EffectFade, Autoplay],
      spaceBetween: 30,
      effect: "fade",
      loop: true,
      autoplay: {
        delay: 2500, // 2.5 seconds
        disableOnInteraction: false,
      },
      mousewheel: { invert: false },
      pagination: {
        el: ".blog-slider__pagination",
        clickable: true,
      },
    });
  }, []);

  return (
    <div className="blog-slider">
      <div className="blog-slider__wrp swiper-wrapper">
        
        {/* first div */}
        <div className="blog-slider__item swiper-slide">
          <div className="blog-slider__img">
            <img
              src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759872/kuldar-kalvik-799168-unsplash.webp"
              alt=""
            />
          </div>
          <div className="blog-slider__content">
            <span className="blog-slider__code">26 December 2019</span>
            <div className="blog-slider__title">Lorem Ipsum Dolor</div>
            <div className="blog-slider__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
            <a href="#" className="blog-slider__button">READ MORE</a>
          </div>
        </div>

        {/* second div */}
        <div className="blog-slider__item swiper-slide">
          <div className="blog-slider__img">
            <img
              src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/jason-leung-798979-unsplash.webp"
              alt=""
            />
          </div>
          <div className="blog-slider__content">
            <span className="blog-slider__code">26 December 2019</span>
            <div className="blog-slider__title">Lorem Ipsum Dolor2</div>
            <div className="blog-slider__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
            <a href="#" className="blog-slider__button">READ MORE</a>
          </div>
        </div>

        {/* third div */}
        <div className="blog-slider__item swiper-slide">
          <div className="blog-slider__img">
            <img
              src="https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1535759871/alessandro-capuzzi-799180-unsplash.webp"
              alt=""
            />
          </div>
          <div className="blog-slider__content">
            <span className="blog-slider__code">26 December 2019</span>
            <div className="blog-slider__title">Lorem Ipsum Dolor</div>
            <div className="blog-slider__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
            <a href="#" className="blog-slider__button">READ MORE</a>
          </div>
        </div>

      </div>

      <div className="blog-slider__pagination"></div>
    </div>
  );
}

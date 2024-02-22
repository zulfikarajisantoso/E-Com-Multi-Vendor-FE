import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";


// import required modules
import { Pagination, Autoplay} from "swiper/modules";

const Collec = () => {
  return (
    <div className="" style={{ paddingTop: "90px" }}>
      <div className="container ">
        <div style={{height:'500px'}} className="p-4">
          <Swiper
            direction={"vertical"}
            pagination={{
              clickable: true,
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
            style={{height:'100%'}}
          >
            <SwiperSlide className="">Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Collec;

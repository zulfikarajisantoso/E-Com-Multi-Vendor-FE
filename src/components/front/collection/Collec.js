import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { FaCartArrowDown } from "react-icons/fa6";
import { IoFilterCircleOutline, IoLocation } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import p1 from "../../../images/promo/p1.jpg";
import p2 from "../../../images/promo/p2.jpg";
import p3 from "../../../images/promo/p3.jpg";
import p4 from "../../../images/promo/p4.jpg";
import p5 from "../../../images/promo/p5.jpg";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

const Collec = () => {
  const data = [p1, p2, p3, p4, p4];
  return (
    <div className="" style={{ paddingTop: "90px", minHeight: "100vh" }}>
      <div className="container ">
        <div style={{ height: "500px" }} className="">
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
            style={{ height: "100%" }}
          >
            {data.map((data, i) => (
              <SwiperSlide key={i} className="">
                {
                  <img
                    src={data}
                    className="w-100"
                    style={{ objectFit: "cover" }}
                  />
                }
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="row  mt-4 ">
          <div className="col-md-3 shadow">
            <div className="d-flex gap-2 p-2 ">
              <IoFilterCircleOutline />
              <h6>Filter</h6>
            </div>
            <div className="p-2" style={{ cursor: "pointer" }}>
              <div className="d-flex justify-content-between">
                <div>
                  <h6>Baju Kain</h6>
                </div>
                <IoIosArrowBack />
              </div>
            </div>
            <div className="px-4">
              <h6>Data 1</h6>
              <h6>Data 2</h6>
            </div>
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-3 ">
                <div
                  className=" w-100 shadow"
                  style={{ backgroundColor: "#ffff", position: "relative" }}
                >
                  <img src={p1} className="w-100" />
                  <div className="p-2">
                    <h6 style={{ fontWeight: "600", fontSize: "20px" }}>
                      daksgf
                    </h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <div style={{ fontWeight: "800", fontSize: "18px" }}>
                        Rp 170.000
                      </div>
                      <div
                        style={{
                          textDecoration: "line-through",
                          fontSize: "9px",
                        }}
                      >
                        {" "}
                        Rp 100.000
                      </div>
                    </div>
                    <div
                      className="d-flex align-items-center gap-1 mt-1"
                      style={{ fontWeight: "700" }}
                    >
                      <IoLocation />
                      <div>Toraja</div>
                    </div>
                  </div>
                  <div
                    style={{ position: "absolute", top: "0", right: "10px" }}
                  >
                    <div className="p-1 cart">
                      <FaCartArrowDown />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collec;

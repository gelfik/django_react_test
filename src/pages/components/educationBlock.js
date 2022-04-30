import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import Style from "./educationBlock.module.scss";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import {
  EffectCoverflow,
  FreeMode,
  Keyboard,
  Mousewheel,
  Pagination,
} from "swiper";
import "swiper/swiper.min.css";
import "swiper/modules/pagination/pagination.min.css";
import "swiper/modules/effect-coverflow/effect-coverflow.min.css";

const EducationBlock = inject(
  "mainPageStore",
  "uiStore"
)(
  observer((store) => {
    const { mainPageStore, uiStore } = store;

    useEffect(() => {
      if (mainPageStore.educationData.length === 0) {
        mainPageStore.loadEducationData();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mainPageStore.educationData]);

    const getItemEducation = () => {
      return mainPageStore.educationData.map((item, i) => (
        <SwiperSlide key={i} className={Style.education__card}>
          <div className={Style.education__card__body}>
            <div className={Style.icon}>
              {item?.svg && (
                <Link to={`/courses?type=${item?.name}`}>
                  <svg height="141" width="212">
                    <use xlinkHref={`#${item?.svg}`} />
                  </svg>
                </Link>
              )}
            </div>
            <Link className={Style.title} to={`/courses?type=${item?.name}`}>
              {item?.name}
            </Link>
            <h3 className={Style.shortDescription}>{item?.shortDescription}</h3>
            <p className={Style.description}>{item?.description}</p>
            <p className={Style.time}>
              {item?.duration}
              {item?.recruitmentStatus && (
                <span className={Style.time__badge}>Набор</span>
              )}
            </p>
          </div>
        </SwiperSlide>
      ));
    };

    return (
      <div className="new-section">
        <div className={Style.education}>
          <div className={Style.education__title}>форматы обучения</div>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={uiStore.deviceType === "desktop" ? 3 : 2}
            spaceBetween={0}
            mousewheel={true}
            rewind={true}
            loop={true}
            keyboard={{
              enabled: true,
            }}
            // freeMode={true}
            coverflowEffect={{
              rotate: 100,
              stretch: 0,
              depth: uiStore.deviceType === "desktop" ? 100 : 0,
              modifier: 3,
              slideShadows: true,
            }}
            pagination={false}
            modules={[
              Keyboard,
              FreeMode,
              Mousewheel,
              EffectCoverflow,
              Pagination,
            ]}
          >
            {getItemEducation()}
          </Swiper>
        </div>
      </div>
    );
  })
);

export default EducationBlock;

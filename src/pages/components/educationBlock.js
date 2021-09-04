import React, {useEffect, useRef, useState} from "react";
import {inject, observer} from "mobx-react";
import Carousel from "react-multi-carousel";
import {Link} from "react-router-dom";

const EducationBlock = inject(
    "userStore",
    "mainPageStore",
    "uiStore"
)(
    observer((store) => {
        const {mainPageStore, uiStore} = store;
        const [deviceType, setDeviceType] = useState(true);

        const carouselRef = useRef();

        useEffect(() => {
            if (mainPageStore.educationData.length === 0) {
                mainPageStore.loadEducationData();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [mainPageStore.educationData]);

        useEffect(() => {
            if (uiStore.deviceType === "mobile") {
                setDeviceType(false);
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [uiStore.deviceType]);

        const responsive = {
            desktop: {
                breakpoint: {max: 4000, min: 769},
                items: 3,
                partialVisibilityGutter: 40,
                slidesToSlide: 1,
            },
            mobile: {
                breakpoint: {max: 769, min: 0},
                items: 1,
                partialVisibilityGutter: 80,
                slidesToSlide: 1,
            },
        };

        const getItemEducation = () => {
            return mainPageStore.educationData.map((item, i) => (
                <div
                    className={"training-formats__slide"}
                    style={{minHeight: "400px"}}
                    key={i}
                >
                    <Link className={"card-format card-format--orange"} to={`/courses?type=${item?.name}`}>
                        <div className="card-format__icon">
                            {item?.svg &&
                            <svg height="141" width="212">
                                <use xlinkHref={`#${item?.svg}`}/>
                            </svg>}
                        </div>
                        <p className="display-3 text-white">{item?.name}</p>
                        <h3 className={"card-format__title"}>{item?.shortDescription}</h3>
                        <p className="card-format__desc">{item?.description}</p>
                        <p className="card-format__term position-relative">
                            {item?.duration}
                            {item?.recruitmentStatus && (
                                <span
                                    className="position-absolute bottom-0 end-0 badge rounded-pill bg-white text-dark lead"
                                    style={{transform: "rotate(-20deg)"}}
                                >
              Набор
            </span>
                            )}
                        </p>
                    </Link>
                </div>
            ));
        };
        // const goToSlide = (e) => {
        //     const number = 5
        //     // carouselRef.goToSlide()
        //     console.log()
        //     carouselRef?.current?.goToSlide(number)
        // }

        return (
            <>
                <div className="new-section ">
                    <h2 className={"text-white training-formats__title container pb-3"}>
                        форматы обучения
                    </h2>
                    <Carousel
                        responsive={responsive}
                        ref={carouselRef}
                        arrows={false}
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={10000}
                        partialVisible={true}
                        centerMode={false}
                        containerClass={!deviceType && "container scroll_y_off"}
                        itemClass={deviceType && "px-3"}
                        renderArrowsWhenDisabled={true}
                        showDots={false}
                        removeArrowOnDeviceType={["mobile"]}
                    >
                        {getItemEducation()}

                        {/*<div className={'text-dark bg-dark w-100 d-flex align-items-center justify-content-center'}*/}
                        {/*     style={{height: '200px'}}>5*/}
                        {/*</div>*/}
                        {/*<div className={'text-dark bg-primary w-100 d-flex align-items-center justify-content-center'}*/}
                        {/*     style={{height: '200px'}}>6*/}
                        {/*</div>*/}
                        {/*<div className={'text-dark bg-success w-100 d-flex align-items-center justify-content-center'}*/}
                        {/*     style={{height: '200px'}}>7*/}
                        {/*</div>*/}
                        {/*<div className={'text-dark bg-light w-100 d-flex align-items-center justify-content-center'}*/}
                        {/*     style={{height: '200px'}}>8*/}
                        {/*</div>*/}
                        {/*<div className={'text-dark bg-danger w-100 d-flex align-items-center justify-content-center'}*/}
                        {/*     style={{height: '200px'}}>9*/}
                        {/*</div>*/}
                        {/*<div className={'text-dark bg-warning w-100 d-flex align-items-center justify-content-center'}*/}
                        {/*     style={{height: '200px'}}>1*/}
                        {/*</div>*/}
                        {/*<div className={'text-dark bg-secondary w-100 d-flex align-items-center justify-content-center'}*/}
                        {/*     style={{height: '200px'}}>0*/}
                        {/*</div>*/}
                    </Carousel>
                </div>
            </>
        );
    }));

export default EducationBlock;

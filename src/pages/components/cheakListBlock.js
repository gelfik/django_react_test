import React, {useEffect, useRef, useState} from "react";
import {inject, observer} from "mobx-react";
import Carousel from 'react-multi-carousel';


const CheakListBlock = inject('userStore', 'mainPageStore', 'UiStore')(observer((store) => {
    const {mainPageStore, uiStore} = store
    const [activeEducation, setActiveEducation] = useState(0)

    const carouselRef = useRef()

    useEffect(() => {
        if (mainPageStore.educationData.length === 0) {
            mainPageStore.loadEducationData()
        }
    }, [mainPageStore.educationData])


    const responsive = {
        desktop: {
            breakpoint: {max: 4000, min: 1300},
            items: 5,
            partialVisibilityGutter: 40,
            slidesToSlide: 3
        },
        laptop: {
            breakpoint: {max: 1300, min: 767},
            items: 3,
            partialVisibilityGutter: 40,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: {max: 767, min: 0},
            items: 1,
            partialVisibilityGutter: 40,
            slidesToSlide: 1
        }
    };

    const getItemEducation = () => {
        return mainPageStore.educationData.map((item, i) =>
            <div className={'training-formats__slide'} key={i}>
                <a className={'card-format card-format--neon-blue'} href={'/'}>
                    <div>
                        <p className="display-3 text-white">{item?.name}{item?.recruitmentStatus && <span
                            className="position-absolute top-0 end-100  badge rounded-pill bg-secondary lead">Набор</span>}</p>
                        {/*{item?.recruitmentStatus && <span*/}
                        {/*    className="position-absolute top-0 end-100  badge rounded-pill bg-secondary lead">Набор</span>}*/}
                    </div>
                    <h3 className={'card-format__title'}>{item?.shortDescription}</h3>
                    <p className="card-format__desc">{item?.description}</p>
                    <p className="card-format__term">{item?.duration}</p>
                </a>
            </div>
        )
    }

    // const goToSlide = (e) => {
    //     const number = 5
    //     // carouselRef.goToSlide()
    //     console.log()
    //     carouselRef?.current?.goToSlide(number)
    // }

    return (
        <>
            <div className="new-section ">
                <h1 className={'text-white container pb-5'}>Форматы обучения {uiStore.deviceType}</h1>
                <Carousel responsive={responsive} ref={carouselRef} arrows={false} infinite={true} autoPlay={true}
                          autoPlaySpeed={10000} partialVisible={true} centerMode={false} containerClass={'container'}
                          renderArrowsWhenDisabled={true} showDots={false} removeArrowOnDeviceType={['mobile']}>
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
    )

}))

export default CheakListBlock;
import React, {useEffect, useRef} from "react";
import {inject, observer} from "mobx-react";
import Carousel from "react-multi-carousel";

const TestBlock = inject('testStore', 'lessonStore', 'modalStore')(observer((store) => {
    const {testStore, lessonStore, modalStore} = store
    const carouselRef = useRef();

    useEffect(() => {
        testStore.setAskActive(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessonStore.lessonType])

    const responsive = {
        desktop: {
            breakpoint: {max: 4000, min: 769},
            items: 10,
            partialVisibilityGutter: 40,
            slidesToSlide: 1,
        },
        mobile: {
            breakpoint: {max: 769, min: 0},
            items: 7,
            partialVisibilityGutter: 80,
            slidesToSlide: 1,
        },
    };

    const getItemStepList = () => {
        return lessonStore.getTest()?.askList?.map((item, i) => (
            <div key={i}
                 className={`LessonList__Right__Data__Homework__Step__Wrapper ${testStore.askActive === i ? 'active' : ''}`}
                 onClick={() => {
                     testStore.setAskActive(i)
                 }}>
                    <span>
                        {i + 1}
                    </span>
            </div>
        ));
    };

    const getItemTestsList = () => {
        return lessonStore.getTest()?.askList?.map((item, i) => (
            <div key={i}
                 className={`LessonList__Right__Data__Homework__Test ${testStore.askActive !== i ? 'IsHide' : ''}`}>
                <div className="LessonList__Right__Data__Homework__Test__Block">
                    <div className="LessonList__Right__Data__Homework__Test__Wrapper">
                        <h3 className="LessonList__Right__Data__Homework__Test__Title">
                            {i + 1}. {item.id}
                        </h3>
                        <div className="LessonList__Right__Data__Homework__Test__Ask">
                            <p>{item.ask}</p>
                        </div>

                        {item?.askPicture && <div className="LessonList__Right__Data__Homework__Test__Ask">
                            <img src={item?.askPicture} alt={item.ask}/>
                        </div>}
                    </div>
                </div>
                <div className="LessonList__Right__Data__Homework__Test__Block">
                    <div className="LessonList__Right__Data__Homework__Test__Wrapper">
                        <div className="LessonList__Right__Data__Homework__Test__Answer">
                            {item.answerInput &&
                                <span className={'mb-3'}>Ответ: <b>{item.answerInput}</b></span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        ));
    };


    return (<div className="LessonList__Right__Data__Homework">
        <div className="LessonList__Right__Data__Homework__Step">
            <Carousel
                responsive={responsive}
                ref={carouselRef}
                arrows={false}
                infinite={true}
                autoPlay={false}
                partialVisible={true}
                centerMode={false}
                containerClass={'LessonList__Right__Data__Homework__Step__Slider'}
                sliderClass={'LessonList__Right__Data__Homework__Step__Slider__Wrapper'}
                itemClass={'LessonList__Right__Data__Homework__Step__Slide'}
                renderArrowsWhenDisabled={false}
                showDots={false}
            >
                {getItemStepList()}
                {!lessonStore.getTest()?.isOpen &&
                <div
                    className={`LessonList__Right__Data__Homework__Step__Wrapper`}
                    onClick={() => {
                        modalStore.ATestAskAddModalShow()
                    }}>
                    <span>
                        +
                    </span>
                </div>
                }
            </Carousel>
        </div>
        {getItemTestsList()}
    </div>)
}))

export default TestBlock;
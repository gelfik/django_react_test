import React, {useEffect, useRef, useState} from "react";
import {inject, observer} from "mobx-react";
import Carousel from "react-multi-carousel";

const LessonHomeworkBlock = inject('purchaseStore', 'purCoursePageStore', 'lessonStore', 'uiStore')(observer((store) => {
    const {purCoursePageStore, lessonStore, uiStore} = store

    const [deviceType, setDeviceType] = useState(true);

    const carouselRef = useRef();

    useEffect(() => {
        if (uiStore.deviceType === "mobile") {
            setDeviceType(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uiStore.deviceType]);


    useEffect(() => {
        purCoursePageStore.setAskActive(undefined)
        purCoursePageStore.setAskCount(undefined)
        purCoursePageStore.setAskAnswerCount(undefined)
        if (lessonStore.lessonData?.homework) {
            purCoursePageStore.setAskActive(lessonStore.lessonData?.homework?.askList[0]?.id)
            purCoursePageStore.setAskCount(lessonStore.lessonData?.homework?.askList?.length)
            purCoursePageStore.setAskAnswerCount(0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // const getItemFiles = (fileList) => {
    //     return fileList?.map((item, i) =>
    //         <p key={i}>
    //             <a href={`${item.file}`} rel="noreferrer" target="_blank">{item.name}</a>
    //         </p>
    //     )
    // }

    const responsive = {
        desktop: {
            breakpoint: {max: 4000, min: 769},
            items: 14,
            partialVisibilityGutter: 40,
            slidesToSlide: 1,
        },
        mobile: {
            breakpoint: {max: 769, min: 0},
            items: 8,
            partialVisibilityGutter: 80,
            slidesToSlide: 1,
        },
    };

    const getItemStepList = () => {
        return lessonStore.lessonData?.homework?.askList?.map((item, i) => (
            <div key={i}
                className={`LessonList__Right__Data__Homework__Step__Wrapper ${purCoursePageStore.askActive === item.id ? 'active' : ''}`}
                onClick={() => {
                    purCoursePageStore.setAskActive(item.id)
                }}>
                    <span>
                        {i + 1}
                    </span>
            </div>
        ));
    };


    return (<div className="LessonList__Right__Data__Homework">
        <div className="LessonList__Right__Data__Homework__Status">
            <p>Решено {purCoursePageStore.askAnswerCount} заданий из {purCoursePageStore.askCount}</p>
        </div>
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
            </Carousel>
        </div>
        <div className="LessonList__Right__Data__Homework__Tests">

        </div>
    </div>)
}))

export default LessonHomeworkBlock;
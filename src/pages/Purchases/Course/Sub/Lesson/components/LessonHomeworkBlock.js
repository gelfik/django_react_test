import React, {useEffect, useRef} from "react";
import {inject, observer} from "mobx-react";
import Carousel from "react-multi-carousel";
import {useForm} from "react-hook-form";
import {Form, FloatingLabel} from "react-bootstrap";

const LessonHomeworkBlock = inject('purchaseStore', 'purCoursePageStore', 'lessonStore')(observer((store) => {
    const {purCoursePageStore, lessonStore} = store

    const carouselRef = useRef();

    const {register, getValues, handleSubmit} = useForm();
    const onSubmit = (data) => console.log(JSON.stringify(data));

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

    const changeAnswer = (e) => {
        purCoursePageStore.setAskAnswerCount(0)
        for (let key in getValues()) {
            if (getValues(`${key}`) && getValues(`${key}`)?.length > 0) {
                purCoursePageStore.setAskAnswerCount(purCoursePageStore.askAnswerCount + 1)
            }
        }
    }

    // const setActiveAskForButton = () => {
    //     for (let key in getValues()) {
    //         if (getValues(`${key}`) && getValues(`${key}`)?.length > 0) {
    //             purCoursePageStore.setAskAnswerCount(purCoursePageStore.askAnswerCount + 1)
    //         }
    //     }
    // }


    const getItemStepList = () => {
        return lessonStore.lessonData?.homework?.askList?.map((item, i) => (
            <div key={i}
                 className={`LessonList__Right__Data__Homework__Step__Wrapper ${purCoursePageStore.askActive === item.id ? 'active' : ''} 
                 ${(getValues(`${item.id}`) && getValues(`${item.id}`)?.length > 0) ? 'SuccesAnswer' : ''}`}
                 onClick={() => {
                     purCoursePageStore.setAskActive(item.id)
                 }}>
                    <span>
                        {i + 1}
                    </span>
            </div>
        ));
    };

    const getItemTestsList = () => {
        return lessonStore.lessonData?.homework?.askList?.map((item, i) => (
            <div key={i}
                 className={`LessonList__Right__Data__Homework__Test ${purCoursePageStore.askActive !== item.id ? 'IsHide' : ''}`}>
                <div className="LessonList__Right__Data__Homework__Test__Block">
                    <div className="LessonList__Right__Data__Homework__Test__Wrapper">
                        <h3 className="LessonList__Right__Data__Homework__Test__Title">
                            {i + 1}. {item.id}
                        </h3>
                        <div className="LessonList__Right__Data__Homework__Test__Ask">
                            <p>{item.ask}</p>
                        </div>

                        {item?.askPicture && <div className="LessonList__Right__Data__Homework__Test__Ask">
                            <img src={`http://192.168.1.64:8000${item?.askPicture}`} alt={item.ask}/>
                        </div>}

                        <div className="LessonList__Right__Data__Homework__Test__Answer">

                            {item.answerInput && <FloatingLabel controlId={`answer_${item.id}`} label="введите ответ">
                                <Form.Control  {...register(`${item.id}`)} type="text" placeholder="введите ответ"/>
                            </FloatingLabel>}
                            {!item.answerInput && <>{getItemAnswerList(item.answerList, item.id)}</>}

                        </div>

                        {purCoursePageStore.askAnswerCount === purCoursePageStore.askCount &&
                        <button className={'LessonList__Right__Data__Homework__Test__SuccesButton'} type={"submit"}>
                            отправить решение
                        </button>}

                        {purCoursePageStore.askAnswerCount !== purCoursePageStore.askCount &&
                        <button className={'LessonList__Right__Data__Homework__Test__SuccesButton'} >
                            следующий вопрос
                        </button>}
                    </div>
                </div>
            </div>
        ));
    };

    const getItemAnswerList = (answerList, askID) => {
        return answerList?.map((item, i) => (
            <Form.Check key={i} {...register(`${askID}`)} type='checkbox' id={`${item.id}`}
                        value={`${item.id}`}
                        label={`${item.answer}`}/>
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
        <Form onChange={changeAnswer} onSubmit={handleSubmit(onSubmit)}>
            {getItemTestsList()}
        </Form>
    </div>)
}))

export default LessonHomeworkBlock;
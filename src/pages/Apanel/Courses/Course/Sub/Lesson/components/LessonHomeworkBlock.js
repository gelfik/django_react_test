import React, {useEffect, useRef} from "react";
import {inject, observer} from "mobx-react";
import Carousel from "react-multi-carousel";
import {useForm} from "react-hook-form";
import {Form, FloatingLabel} from "react-bootstrap";
import {useParams} from "react-router-dom";

const LessonHomeworkBlock = inject('aCoursePageStore', 'alessonStore')(observer((store) => {
    const {aCoursePageStore, alessonStore} = store
    // const queryParams = useParams()
    const carouselRef = useRef();

    const {register, getValues, handleSubmit} = useForm();
    // const onSubmit = (data) => {
    //     console.log(JSON.stringify(data));
    //     alessonStore.loadHomeworkData(queryParams?.purchaseID, queryParams?.subID, queryParams?.lessonID, alessonStore.lessonData?.homework?.id, data)
    // }

    useEffect(() => {
        aCoursePageStore.setAskActive(undefined)
        aCoursePageStore.setAskCount(undefined)
        aCoursePageStore.setAskAnswerCount(undefined)
        if (alessonStore.lessonData?.homework) {
            // purCoursePageStore.setAskActive(lessonStore.lessonData?.homework?.askList[0]?.id)
            aCoursePageStore.setAskActive(0)
            aCoursePageStore.setAskCount(alessonStore.lessonData?.homework?.askList?.length)
            aCoursePageStore.setAskAnswerCount(0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alessonStore.lessonData?.homework])

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
        aCoursePageStore.setAskAnswerCount(0)
        for (let key in getValues()) {
            if (getValues(`${key}`) && getValues(`${key}`)?.length > 0) {
                aCoursePageStore.setAskAnswerCount(aCoursePageStore.askAnswerCount + 1)
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

    const nextAsk = () => {
        for (let i = 0; i <= aCoursePageStore.askCount; i++) {
            if ((i === aCoursePageStore.askActive) && (i < aCoursePageStore.askCount)) {
                aCoursePageStore.setAskActive(i + 1)
                let values = getValues(`${aCoursePageStore.askActive}`)
                if ((!values) || (values.length === 0)) break
            }
            if (aCoursePageStore.askActive === aCoursePageStore.askCount-1) {
                aCoursePageStore.setAskActive(0)
                let values = getValues(`${aCoursePageStore.askActive}`)
                if ((!values) || (values.length === 0)) break
            }
        }

    }


    const getItemStepList = () => {
        return alessonStore.lessonData?.homework?.askList?.map((item, i) => (
            <div key={i}
                 className={`LessonList__Right__Data__Homework__Step__Wrapper ${aCoursePageStore.askActive === i ? 'active' : ''} 
                 ${(getValues(`${item.id}`) && getValues(`${item.id}`)?.length > 0) ? 'SuccesAnswer' : ''}`}
                 onClick={() => {
                     aCoursePageStore.setAskActive(i)
                     // purCoursePageStore.setAskActive(item.id)
                 }}>
                    <span>
                        {i + 1}
                    </span>
            </div>
        ));
    };

    const getItemTestsList = () => {
        return alessonStore.lessonData?.homework?.askList?.map((item, i) => (
            <div key={i}
                 className={`LessonList__Right__Data__Homework__Test ${aCoursePageStore.askActive !== i ? 'IsHide' : ''}`}>
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
                            <FloatingLabel controlId={`answer_${item.id}`} label="введите ответ">
                                <Form.Control  {...register(`${item.id}`)} type="text" placeholder="введите ответ"/>
                            </FloatingLabel>}
                            {!item.answerInput && <>{getItemAnswerList(item.answerList, item.id)}</>}

                        </div>

                        {aCoursePageStore.askAnswerCount === aCoursePageStore.askCount &&
                        <button className={'LessonList__Right__Data__Homework__Test__SuccesButton'} type={"submit"}>
                            отправить решение
                        </button>}

                        {aCoursePageStore.askAnswerCount !== aCoursePageStore.askCount &&
                        <button className={'LessonList__Right__Data__Homework__Test__SuccesButton'} type={'button'}
                                onClick={nextAsk}>
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
        <Form onChange={changeAnswer}>
            {getItemTestsList()}
        </Form>
    </div>)
}))

export default LessonHomeworkBlock;
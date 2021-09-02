import React, {useEffect, useRef} from "react";
import {inject, observer} from "mobx-react";
import Carousel from "react-multi-carousel";
import {Form} from "react-bootstrap";

const LessonHomeworkAnswerBlock = inject('purchaseStore', 'purCoursePageStore', 'lessonStore')(observer((store) => {
    const {purCoursePageStore, lessonStore} = store

    const carouselRef = useRef();




    useEffect(() => {
        purCoursePageStore.setAskActive(undefined)
        purCoursePageStore.setAskCount(undefined)
        purCoursePageStore.setAskAnswerCount(undefined)
        if (lessonStore.lessonData?.homeworkAnswer) {
            purCoursePageStore.setAskActive(lessonStore.lessonData?.homeworkAnswer?.answerData[0]?.ask?.id)
            purCoursePageStore.setAskCount(lessonStore.lessonData?.homeworkAnswer?.answerData?.length)
            let count = 0
            for (let key in lessonStore.lessonData?.homeworkAnswer?.answerData) {
                console.log(lessonStore.lessonData?.homeworkAnswer?.answerData[key])
                if (lessonStore.lessonData?.homeworkAnswer?.answerData[key]?.answerValid) {
                    count+= 1
                }
            }
            purCoursePageStore.setAskAnswerCount(count)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessonStore.lessonData?.homeworkAnswer])


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
        return lessonStore.lessonData?.homeworkAnswer?.answerData?.map((item, i) => (
            <div key={i}
                 className={`LessonList__Right__Data__Homework__Step__Wrapper ${purCoursePageStore.askActive === item.ask.id ? 'active' : ''} SuccesAnswer`}
                 onClick={() => {
                     purCoursePageStore.setAskActive(item.ask.id)
                 }}>
                    <span className="LessonList__Right__Data__Homework__Step__Wrapper__AskNum">
                        {i + 1}
                    </span>
                    <span className="LessonList__Right__Data__Homework__Step__Wrapper__Pointer">
                        {item.answerValid ? '1 из 1' : '0 из 1'}
                    </span>
            </div>
        ));
    };


    const getItemTestsList = () => {
        return lessonStore.lessonData?.homeworkAnswer?.answerData?.map((item, i) => (
            <div key={i}
                 className={`LessonList__Right__Data__Homework__Test ${purCoursePageStore.askActive !== item.ask.id ? 'IsHide' : ''}`}>
                <div className="LessonList__Right__Data__Homework__Test__Block">
                    <div className="LessonList__Right__Data__Homework__Test__Wrapper">
                        <h3 className="LessonList__Right__Data__Homework__Test__Title">
                            {i + 1}. {item.ask.id}
                        </h3>
                        <div className="LessonList__Right__Data__Homework__Test__Ask">
                            <p>{item.ask.ask}</p>
                        </div>

                        {item.ask.askPicture && <div className="LessonList__Right__Data__Homework__Test__Ask">
                            <img src={item?.ask.askPicture} alt={item.ask.ask}/>
                        </div>}

                        {/*<button className={'LessonList__Right__Data__Homework__Test__SuccesButton'} type={'button'}*/}
                        {/*        onClick={nextAsk}>*/}
                        {/*    следующий вопрос*/}
                        {/*</button>*/}
                    </div>
                </div>
                <div className="LessonList__Right__Data__Homework__Test__Block">

                    {item.ask.answerInput && <>
                        <div className="LessonList__Right__Data__Homework__Test__Wrapper">
                            <div className="Block">
                                <div className="Block__Title">Ваш ответ</div>
                                <p className={`${item.answerValid ? 'IsValid' : 'IsInValid'}`}>{item.answerInput}</p>
                            </div>
                        </div>
                        <div className="LessonList__Right__Data__Homework__Test__Wrapper">
                            <div className="Block">
                                <div className="Block__Title">Верный ответ</div>
                                <p>{item.ask.answerInput}</p>
                            </div>
                        </div>
                    </>}


                    {!item.ask.answerInput &&
                    <div className="LessonList__Right__Data__Homework__Test__Wrapper">{getItemAnswerList(item)}</div>}
                </div>
            </div>
        ));
    };

    const getPropsForAnswer = (data, answer) => {
        let props = {}
        for (let key in data?.answerList) {
            if (data?.answerList[key]?.answer === answer) {
                props['checked'] = true
            }
        }

        return props
    }

    const getItemAnswerList = (data) => {
        return data?.ask?.answerList?.map((item, i) => (
            <Form.Check {...getPropsForAnswer(data, item.answer)} disabled={true} key={i}
                        name={`${data.ask.id}`} type='checkbox' id={`${item.id}`}
                        className={`${item.validStatus ? 'Valid' : 'Error'}`}
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
        <Form>
            {getItemTestsList()}
        </Form>
    </div>)
}))

export default LessonHomeworkAnswerBlock;
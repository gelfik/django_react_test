import React, {useEffect, useRef} from "react";
import {inject, observer} from "mobx-react";
import Carousel from "react-multi-carousel";
import {ListGroup} from "react-bootstrap";

const TestBlock = inject('atestStore', 'alessonStore', 'modalStore')(observer((store) => {
    const {atestStore, alessonStore, modalStore} = store
    const carouselRef = useRef();

    useEffect(() => {
        atestStore.setAskActive(0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alessonStore.lessonType])

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
        return alessonStore.getTest()?.askList?.map((item, i) => (
            <div key={i}
                 className={`LessonList__Right__Data__Homework__Step__Wrapper ${atestStore.askActive === i ? 'active' : ''}`}
                 onClick={() => {
                     atestStore.setAskActive(i)
                 }}>
                    <span>
                        {i + 1}
                    </span>
            </div>
        ));
    };

    const getItemTestsList = () => {
        return alessonStore.getTest()?.askList?.map((item, i) => (
            <div key={i}
                 className={`LessonList__Right__Data__Homework__Test ${atestStore.askActive !== i ? 'IsHide' : ''}`}>
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
                            {!item.answerInput &&
                                <ListGroup className={'mb-3'} style={{borderRadius: '8px', width: '100%'}}
                                           variant="flush">{getItemAnswerList(item.answerList)}</ListGroup>
                            }
                        </div>
                        {!alessonStore.getTest?.isOpen &&
                        <button className={'LessonList__Right__Data__Homework__Test__SuccesButton'} type={'button'}
                                onClick={modalStore.ATestAskEditModalShow}>
                            редактировать вопрос
                        </button>}
                    </div>
                </div>
            </div>
        ));
    };

    const getItemAnswerList = (answerList) => {
        return answerList?.map((item, i) => (
            <ListGroup.Item variant={`${item.validStatus ? 'success' : 'danger'}`}
                            key={i}>{item.answer}</ListGroup.Item>
        ));
    };


    return (<div className="LessonList__Right__Data__Homework">
        <div className="LessonList__Right__Data__Title">
            {alessonStore.getTest()?.name}
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
                {!alessonStore.getTest()?.isOpen &&
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

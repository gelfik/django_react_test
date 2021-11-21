import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {useForm} from "react-hook-form";
import {FloatingLabel, Form} from "react-bootstrap";
import {useParams} from "react-router-dom";

const TestBlock = inject('testStore', 'lessonStore')(observer((store) => {
    const {testStore, lessonStore} = store
    const queryParams = useParams()
    const {register, handleSubmit, getValues, reset} = useForm();

    const onSubmit = (data) => {
        let list = {}
        for (const [key, value] of Object.entries(data)) {
            if (Array.isArray(value)) {
                let localList = []
                value.forEach((item, i) => {
                    localList.push(Number(item))
                })
                list[key] = localList
            } else list[key] = value
        }
        lessonStore.loadask(list, queryParams?.purchaseID, queryParams?.subID)
    }

    useEffect(() => {
        if (lessonStore.lessonType === 'testPOL' || lessonStore.lessonType === 'testCHL') {
            reset()
            testStore.setAskActive(0)
            testStore.setAskCount(0)
            testStore.setAskAnswerCount(0)
            if (lessonStore.lessonData?.testPOL || lessonStore.lessonData?.testCHL) {
                // testStore.setAskActive(lessonStore.lessonData?.homework?.askList[0]?.id)
                testStore.setAskActive(0)
                testStore.setAskCount(lessonStore.getTest()?.askList?.length)
                testStore.setAskAnswerCount(0)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessonStore.lessonType])

    const changeAnswer = (e) => {
        testStore.setAskAnswerCount(0)
        for (let key in getValues()) {
            if (getValues(`${key}`) && getValues(`${key}`)?.length > 0) {
                testStore.setAskAnswerCount(testStore.askAnswerCount + 1)
            }
        }
    }

    const nextAsk = () => {
        let arr = lessonStore.getTest().askList
        if (testStore.askActive === arr.length - 1) testStore.setAskActive(0)
        else testStore.setAskActive(testStore.askActive + 1)

    }

    const previousAsk = () => {
        let arr = lessonStore.getTest().askList
        if (testStore.askActive === 0) testStore.setAskActive(arr.length - 1)
        else testStore.setAskActive(testStore.askActive - 1)
    }

    const getItemStepList = () => {
        return lessonStore.getTest()?.askList?.map((item, i) => (
            <div key={i} className={'LessonList__Right__Data__Homework__Step__Slide'}>
                <div
                    className={`LessonList__Right__Data__Homework__Step__Wrapper ${testStore.askActive === i ? 'active' : ''} ${(getValues(`${item.id}`) && getValues(`${item.id}`)?.length > 0) ? 'SuccesAnswer' : ''}`}
                    onClick={() => {
                        testStore.setAskActive(i)
                    }}>
                    <span>
                        {i + 1}
                    </span>
                </div>
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
                            <FloatingLabel controlId={`answer_${item.id}`} label="введите ответ">
                                <Form.Control  {...register(`${item.id}`)} type="text" placeholder="введите ответ"/>
                            </FloatingLabel>}
                            {!item.answerInput && <>{getItemAnswerList(item.answerList, item.id)}</>}
                        </div>
                        {testStore.askAnswerCount === testStore.askCount &&
                        <button className={'LessonList__Right__Data__Homework__Test__SuccesButton'} type={"submit"}>
                            отправить решение
                        </button>}
                        {testStore.askAnswerCount !== testStore.askCount &&
                        <button className={'LessonList__Right__Data__Homework__Test__SuccesButton'} type={'button'}
                                onClick={previousAsk}>
                            предыдущий вопрос
                        </button>}
                        {testStore.askAnswerCount !== testStore.askCount &&
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
        <div className="LessonList__Right__Data__Homework__Status">
            <p>Решено {testStore.askAnswerCount} заданий из {testStore.askCount}</p>
        </div>
        <div className="LessonList__Right__Data__Homework__Step">
            <div className={'LessonList__Right__Data__Homework__Step__Slider'}>
                <div className={'LessonList__Right__Data__Homework__Step__Slider__Wrapper'}>
                    {getItemStepList()}
                </div>
            </div>
        </div>
        <Form onChange={changeAnswer} onSubmit={handleSubmit(onSubmit)}>
            {getItemTestsList()}
        </Form>
    </div>)
}))

export default TestBlock;
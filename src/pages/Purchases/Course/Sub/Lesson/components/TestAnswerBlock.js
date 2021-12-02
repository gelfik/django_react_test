import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {useForm} from "react-hook-form";
import {Form} from "react-bootstrap";

const TestBlock = inject('testStore', 'lessonStore')(observer((store) => {
    const {testStore, lessonStore} = store
    const {getValues, reset} = useForm();

    const changeAnswer = (e) => {
        testStore.setAskAnswerCount(0)
        for (let key in getValues()) {
            if (getValues(`${key}`) && getValues(`${key}`)?.length > 0) {
                testStore.setAskAnswerCount(testStore.askAnswerCount + 1)
            }
        }
    }

    useEffect(() => {
        if (lessonStore.lessonType === 'testPOL' || lessonStore.lessonType === 'testCHL') {
            reset()
            testStore.setAskActive(0)
            testStore.setAskCount(0)
            testStore.setAskAnswerCount(0)
            if (lessonStore.getResultTest()) {
                // testStore.setAskActive(lessonStore.lessonData?.homework?.askList[0]?.id)
                testStore.setAskActive(0)
                testStore.setAskCount(lessonStore.getResultTest()?.answerData?.length)
                testStore.setAskAnswerCount(lessonStore.getResultTest()?.answerData?.filter(item => item.answerValid).length)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessonStore.lessonType])

    const getItemStepList = () => {
        return lessonStore.getResultTest()?.answerData?.map((item, i) => (
            <div key={i} className={'LessonList__Right__Data__Homework__Step__Slide'}>
                <div
                    className={`LessonList__Right__Data__Homework__Step__Wrapper ${testStore.askActive === i ? 'active' : ''} ${item.answerValid ? 'ValidAnswer' : 'ErrorAnswer'}`}
                    onClick={() => {
                        testStore.setAskActive(i)
                    }}>
                    <span className="LessonList__Right__Data__Homework__Step__Wrapper__AskNum">
                        {i + 1}
                    </span>
                    <span className="LessonList__Right__Data__Homework__Step__Wrapper__Pointer">
                        {item.answerValid ? '1 из 1' : '0 из 1'}
                    </span>
                </div>
            </div>
        ));
    };

    const getItemTestsList = () => {
        return lessonStore.getResultTest()?.answerData?.map((item, i) => (
            <div key={i}
                 className={`LessonList__Right__Data__Homework__Test ${testStore.askActive !== i ? 'IsHide' : ''}`}>
                <div className="LessonList__Right__Data__Homework__Test__Block">
                    <div className="LessonList__Right__Data__Homework__Test__Wrapper">
                        <h3 className="LessonList__Right__Data__Homework__Test__Title">
                            {i + 1}. {item?.ask?.id}
                        </h3>
                        <div className="LessonList__Right__Data__Homework__Test__Ask">
                            <p>{item.ask?.ask}</p>
                        </div>

                        {item?.ask?.askPicture && <div className="LessonList__Right__Data__Homework__Test__Ask">
                            <img src={item?.ask?.askPicture} alt={item.ask?.ask}/>
                        </div>}
                    </div>
                </div>
                <div className="LessonList__Right__Data__Homework__Test__Block">

                    <div className="LessonList__Right__Data__Homework__Test__Answer">
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
                        <div
                            className="LessonList__Right__Data__Homework__Test__Wrapper">{getItemAnswerList(item)}</div>}
                    </div>

                </div>
            </div>
        ));
    };

    const getPropsForAnswer = (data, answer) => {
        let props = {}
        for (let key in data?.answerList) {
            if (data?.ask?.answerList[key]?.answer === answer) {
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
        <div className="LessonList__Right__Data__Title">
            {lessonStore.getTest()?.name}
        </div>
        <div className="LessonList__Right__Data__Status">
            <p className="Result">Ваш результат: {lessonStore.getResultTest()?.result}</p>
            <p>Решено {testStore.askAnswerCount} заданий из {testStore.askCount}</p>
        </div>
        <div className="LessonList__Right__Data__Homework__Step">
            <div className={'LessonList__Right__Data__Homework__Step__Slider'}>
                <div className={'LessonList__Right__Data__Homework__Step__Slider__Wrapper'}>
                    {getItemStepList()}
                </div>
            </div>
        </div>
        <div onChange={changeAnswer}>

            {getItemTestsList()}
        </div>
    </div>)
}))

export default TestBlock;
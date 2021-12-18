import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import {Accordion} from "react-bootstrap";
import {useForm} from "react-hook-form";

const TaskBlock = inject('userStore', 'alessonStore', 'acourseStore', 'asubCourseStore')(observer((store) => {
    const {alessonStore, acourseStore, asubCourseStore} = store
    const {register, handleSubmit, setValue} = useForm();
    const [visibility, setVisibility] = useState(false)

    const InputMinMax = (e) => {
        if (e.target.value < 0) e.target.value = 0;
        if (e.target.value > 100) e.target.value = 100;
    }

    const onSubmitResult = (data) => {
        setVisibility(false)
        alessonStore.loadResult(data, acourseStore.courseID, asubCourseStore.subCourseID)
    }


    const getResults = () => {
        return alessonStore.lessonData?.result?.map((item, i) => (
            <Accordion.Item key={i} eventKey={i} >
                {/*<Accordion.Header>*/}
                <Accordion.Button onClick= {() => {
                    alessonStore.setResultID(item?.taskABC?.id)
                    setVisibility(false)
                    setValue('result', '')
                }}
                    className={`${item?.taskABC?.result ? "LessonList__Right__Data__Accordion__Valid" : "LessonList__Right__Data__Accordion__Invalid"}`}>
                        <span
                            className="LessonList__Right__Data__Accordion__Left">{item?.user?.firstName} {item?.user?.lastName}</span>
                    <span
                        className="LessonList__Right__Data__Accordion__Right">{item?.taskABC?.result ? `Результат: ${item?.taskABC?.result}` : 'Не проверено'}</span>
                </Accordion.Button>
                {/*</Accordion.Header>*/}
                <Accordion.Body>
                    {item?.taskABC?.result ? <>{visibility ? getForm(item) : getResult(item)}</> : getForm(item)}
                </Accordion.Body>
            </Accordion.Item>
        ));
    };

    const getResult = (item) => {
        return <>
            <p>Дата и время загрузки: {item?.taskABC?.loadTime}</p>
            <p>Загруженная работа: <a className="LessonList__Right__Data__Accordion__Link"
                                      href={`${item?.taskABC?.file}`} rel="noreferrer"
                                      target="_blank">скачать</a></p>
            <p>Результат: {item?.taskABC?.result}</p>
            <button type={"button"} className={'btn btn-dark w-100 mt-2'} onClick={() => {setValue('result', item?.taskABC?.result);setVisibility(true)}}>Изменить оценку</button>
        </>
    }


    const getForm = (item) => {
        return <>
            <p>Дата и время загрузки: {item?.taskABC?.loadTime}</p>
            <p>Загруженная работа: <a className="LessonList__Right__Data__Accordion__Link"
                                      href={`${item?.taskABC?.file}`} rel="noreferrer"
                                      target="_blank">скачать</a></p>
            <form className={'mt-2'} onSubmit={handleSubmit(onSubmitResult)}>
                <div className="form-floating">
                    <input type={'number'} className={`form-control`}
                           id={'result'} {...register('result', {valueAsNumber:true})}
                           onChange={InputMinMax} required placeholder={'Оценка'}
                           min='0' max='100'/>
                    <label htmlFor={'result'}>Оценка</label>
                </div>
                <button type={"submit"} className={'btn btn-dark w-100 mt-2'}>Оценить</button>
            </form>
        </>
    }

    return (<>
        <div className="LessonList__Right__Data__Title">
            {alessonStore.lessonData?.taskABC?.name}
        </div>
        {alessonStore.lessonData?.taskABC?.description &&
        <div style={{marginBottom: 24}} className="LessonList__Right__Data__Description">
            {alessonStore.lessonData?.taskABC?.description}
        </div>}
        {alessonStore.lessonData?.result &&
        <Accordion flush>
            {getResults()}
        </Accordion>
        }
    </>)
}))


export default TaskBlock;
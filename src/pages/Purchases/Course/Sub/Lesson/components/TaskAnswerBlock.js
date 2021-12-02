import React from "react";
import {inject, observer} from "mobx-react";

const TaskAnswerBlock = inject('userStore', 'lessonStore')(observer((store) => {
    const {lessonStore} = store

    return (<>
        <div className="LessonList__Right__Data__Title">
            {lessonStore.lessonData?.taskABC?.name}
        </div>
        <div className="LessonList__Right__Data__Status">
            {!lessonStore.getResultTest()?.result ? <p className="Result NotCheck">Не проверено!</p> :
                <p className="Result">Ваш результат: {lessonStore.getResultTest()?.result}</p>}
        </div>
        {lessonStore.lessonData?.taskABC?.description &&
        <div className="LessonList__Right__Data__Description">
            {lessonStore.lessonData?.taskABC?.description}
        </div>}
        <div className="LessonList__Right__Data__File">
            <p>Загруженная работа: <a href={`${lessonStore.getResultTest()?.file}`} rel="noreferrer" target="_blank">скачать</a></p>
        </div>
    </>)
}))

export default TaskAnswerBlock;
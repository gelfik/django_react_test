import React from "react";
import {inject, observer} from "mobx-react";

const TaskBlock = inject('userStore', 'alessonStore')(observer((store) => {
    const {alessonStore} = store

    return (<>
        <div className="LessonList__Right__Data__Title">
            {alessonStore.lessonData?.taskABC?.name}
        </div>
        {alessonStore.lessonData?.taskABC?.description &&
        <div className="LessonList__Right__Data__Description">
            {alessonStore.lessonData?.taskABC?.description}
        </div>}
    </>)
}))

export default TaskBlock;
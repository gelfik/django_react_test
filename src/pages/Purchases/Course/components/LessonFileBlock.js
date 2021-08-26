import React from "react";
import {inject, observer} from "mobx-react";

const LessonFileBlock = inject('purchaseStore', 'purCoursePageStore', 'lessonStore')(observer((store) => {
    const {lessonStore} = store

    return (<div className="LessonList__Right__Data__File">
        <div className="LessonList__Right__Data__Content">
            <a href={`${lessonStore.lessonData?.files?.file}`} rel="noreferrer" target="_blank">{lessonStore.lessonData?.files?.name}</a>
        </div>
    </div>)
}))

export default LessonFileBlock;
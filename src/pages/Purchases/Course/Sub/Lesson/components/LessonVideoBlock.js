import React from "react";
import {inject, observer} from "mobx-react";

const LessonVideoBlock = inject('purchaseStore', 'purCoursePageStore', 'lessonStore')(observer((store) => {
    const {lessonStore} = store

    return (<div className="LessonList__Right__Data__Video">
            <div className="LessonList__Right__Data__Video__Box"
                 dangerouslySetInnerHTML={{__html: lessonStore.lessonData?.video?.linkVideo}}/>
        </div>)
}))

export default LessonVideoBlock;
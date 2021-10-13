import React from "react";
import {inject, observer} from "mobx-react";

const LessonVideoBlock = inject('alessonStore')(observer((store) => {
    const {alessonStore} = store

    return (<div className="LessonList__Right__Data__Video">
            <div className="LessonList__Right__Data__Video__Box"
                 dangerouslySetInnerHTML={{__html: alessonStore.lessonData?.video?.linkVideo}}/>
        </div>)
}))

export default LessonVideoBlock;
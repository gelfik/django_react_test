import React from "react";
import {inject, observer} from "mobx-react";

const LessonFileBlock = inject('purchaseStore', 'purCoursePageStore', 'lessonStore')(observer((store) => {
    const {lessonStore} = store

    const getItemFiles = (fileList) => {
        return fileList?.map((item, i) =>
            <p key={i}>
                <a href={`${item.file}`} rel="noreferrer" target="_blank">{item.name}</a>
            </p>
        )
    }

    return (<div className="LessonList__Right__Data__File">
        {/*<div className="LessonList__Right__Data__Content">*/}
        {getItemFiles(lessonStore.lessonData?.files?.fileList)}
        {/*<a href={`${lessonStore.lessonData?.files?.fileList}`} rel="noreferrer" target="_blank">{lessonStore.lessonData?.files?.name}</a>*/}
        {/*</div>*/}
    </div>)
}))

export default LessonFileBlock;
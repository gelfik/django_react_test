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
        {getItemFiles(lessonStore.lessonData?.files?.fileList)}
    </div>)
}))

export default LessonFileBlock;
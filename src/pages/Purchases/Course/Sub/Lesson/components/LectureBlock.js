import React from "react";
import {inject, observer} from "mobx-react";
import YouTube from 'react-youtube';

const LectureBlock = inject('userStore', 'lessonStore', 'acourseStore', 'asubCourseStore')(observer((store) => {
    const {lessonStore} = store


    const getItemFiles = (fileList) => {
        return fileList?.map((item, i) =>
            <p key={i}>
                <a href={`${item.file}`} rel="noreferrer" target="_blank">{item.name}</a>
            </p>
        )
    }

    return (<>
        <div className="LessonList__Right__Data__Title">
            {lessonStore.lessonData?.lecture?.name}
        </div>
        {lessonStore.lessonData?.lecture?.video &&
        <div className="LessonList__Right__Data__Video">
            <div className="LessonList__Right__Data__Video__Box">
                <YouTube videoId={`${lessonStore.lessonData?.lecture?.video}`}/>
            </div>
        </div>}
        <div className="LessonList__Right__Data__File">
            {lessonStore.lessonData?.lecture?.files?.length !== 0 && <>
                {getItemFiles(lessonStore.lessonData?.lecture?.files)}
            </>}
        </div>
        {lessonStore.lessonData?.lecture?.description &&
        <div className="LessonList__Right__Data__Description">
            {lessonStore.lessonData?.lecture?.description}
        </div>}
    </>)
}))

export default LectureBlock;
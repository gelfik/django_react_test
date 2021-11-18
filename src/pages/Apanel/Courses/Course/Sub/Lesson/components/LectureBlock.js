import React from "react";
import {inject, observer} from "mobx-react";
import YouTube from 'react-youtube';

const LectureBlock = inject('userStore', 'alessonStore')(observer((store) => {
    const {alessonStore} = store

    const getItemFiles = (fileList) => {
        return fileList?.map((item, i) =>
            <p key={i}>
                <a href={`${item.file}`} rel="noreferrer" target="_blank">{item.name}</a>
            </p>
        )
    }

    return (<>
        <div className="LessonList__Right__Data__Title">
            {alessonStore.lessonData?.lecture?.name}
        </div>
        {alessonStore.lessonData?.lecture?.video &&
        <div className="LessonList__Right__Data__Video">
            <div className="LessonList__Right__Data__Video__Box">
                <YouTube videoId={`${alessonStore.lessonData?.lecture?.video}`}/>
            </div>
        </div>}
        <div className="LessonList__Right__Data__File">
            {/*{alessonStore.lessonData?.lecture?.files?.length === 0 &&*/}
            {/*InputFileLoad()*/}
            {/*}*/}
            {alessonStore.lessonData?.lecture?.files?.length !== 0 && <>
                {getItemFiles(alessonStore.lessonData?.lecture?.files)}
                {/*{InputFileLoad()}*/}
            </>}
        </div>
        {alessonStore.lessonData?.lecture?.description &&
        <div className="LessonList__Right__Data__Description">
            {alessonStore.lessonData?.lecture?.description}
        </div>}
    </>)
}))

export default LectureBlock;
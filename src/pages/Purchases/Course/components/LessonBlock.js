import React from "react";
import {inject, observer} from "mobx-react";
import Spinner from "../../../../components/Spinner";
import LessonVideoBlock from "./LessonVideoBlock";
import LessonFileBlock from "./LessonFileBlock";

const LessonBlock = inject('purchaseStore', 'purCoursePageStore', 'lessonStore')(observer((store) => {
    const {lessonStore} = store

    return (<>
        {lessonStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
            <div className="LessonList__Right__Data">
                <div className="LessonList__Right__Data__Title">
                    {lessonStore.lessonData?.homework && lessonStore.lessonData?.homework?.name}
                    {lessonStore.lessonData?.video && lessonStore.lessonData?.video?.name}
                    {lessonStore.lessonData?.files && 'Файл'}
                </div>
                {lessonStore.lessonData?.video && <LessonVideoBlock/>}
                {lessonStore.lessonData?.files && <LessonFileBlock/>}
                {lessonStore.lessonData?.description &&
                <div className="LessonList__Right__Data__Description">
                    {lessonStore.lessonData?.description}
                </div>}
            </div>
        </>}
    </>)
}))

export default LessonBlock;
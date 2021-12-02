import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import StickyBox from "react-sticky-box";
import Spinner from "../../../../../../components/Spinner";
import LectureBlock from "./LectureBlock";
import TestBlock from "./TestBlock";
import TestAnswerBlock from "./TestAnswerBlock";
import TaskBlock from "./TaskBlock";
import TaskAnswerBlock from "./TaskAnswerBlock";

const LessonBlock = inject('subCourseStore', 'lessonStore', 'purchaseStore')(observer((store) => {
    const {lessonStore} = store

    useEffect(() => {
        if (lessonStore.lessonType !== 'taskABC') {
            lessonStore.setResponse({})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessonStore.lessonType])

    useEffect(() => {
        if (!lessonStore.lessonType) {
            if (lessonStore.lessonData?.lecture) {
                lessonStore.setLessonType('lecture')
            } else if (lessonStore.lessonData?.testPOL) {
                lessonStore.setLessonType('testPOL')
            } else if (lessonStore.lessonData?.testCHL) {
                lessonStore.setLessonType('testCHL')
            } else if (lessonStore.lessonData?.taskABC) {
                lessonStore.setLessonType('taskABC')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lessonStore.lessonData?.id])

    return (<StickyBox offsetTop={98} offsetBottom={20} className="LessonList__Right">
        {lessonStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
            <div className="LessonList__Right__Data">
                {/*<div className="LessonList__Right__Data__Title">*/}
                {lessonStore.lessonType === 'lecture' && <LectureBlock/>}
                {((lessonStore.lessonType === 'testCHL' || lessonStore.lessonType === 'testPOL') && !lessonStore.getResultTest()) &&
                <TestBlock/>}
                {((lessonStore.lessonType === 'testCHL' || lessonStore.lessonType === 'testPOL') && lessonStore.getResultTest()) &&
                <TestAnswerBlock/>}
                {(lessonStore.lessonType === 'taskABC' && lessonStore.getResultTest()) && <TaskAnswerBlock/>}
                {(lessonStore.lessonType === 'taskABC' && !lessonStore.getResultTest()) && <TaskBlock/>}
                {/*</div>*/}
                {/*{lessonStore.lessonData?.homework && <>*/}
                {/*    {lessonStore.lessonData?.homeworkAnswer && <LessonHomeworkAnswerBlock/>}*/}
                {/*    {!lessonStore.lessonData?.homeworkAnswer && <LessonHomeworkBlock/>}*/}
                {/*</>}*/}
            </div>
        </>}
    </StickyBox>)
}))

export default LessonBlock;
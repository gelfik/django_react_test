import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import StickyBox from "react-sticky-box";
import Spinner from "../../../../../../../components/Spinner";
import LectureBlock from "./LectureBlock";
import TestBlock from "./TestBlock";
import TaskBlock from "./TaskBlock";

const LessonBlock = inject('userStore', 'alessonStore')(observer((store) => {
    const {alessonStore} = store

    useEffect(() => {
        if (alessonStore.lessonData?.lecture) {
            alessonStore.setLessonType('lecture')
        } else if (alessonStore.lessonData?.testPOL) {
            alessonStore.setLessonType('testPOL')
        } else if (alessonStore.lessonData?.testCHL) {
            alessonStore.setLessonType('testCHL')
        } else if (alessonStore.lessonData?.taskABC) {
            alessonStore.setLessonType('taskABC')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alessonStore.lessonData])

    return (<StickyBox offsetTop={66} offsetBottom={20} className="LessonList__Right">
        {alessonStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
            <div className="LessonList__Right__Data">
                {alessonStore.lessonType === 'lecture' && <LectureBlock/>}
                {(alessonStore.lessonType === 'testCHL' || alessonStore.lessonType === 'testPOL') && <TestBlock/>}
                {alessonStore.lessonType === 'taskABC' && <TaskBlock/>}
                {/*<div className="LessonList__Right__Data__Title">*/}
                {/*    {alessonStore.lessonData?.homework && alessonStore.lessonData?.homework?.name}*/}
                {/*    {alessonStore.lessonData?.video && alessonStore.lessonData?.video?.name}*/}
                {/*    {alessonStore.lessonData?.files && alessonStore.lessonData?.files?.name}*/}
                {/*</div>*/}
                {/*{alessonStore.lessonData?.description &&*/}
                {/*<div className="LessonList__Right__Data__Description">*/}
                {/*    {alessonStore.lessonData?.description}*/}
                {/*</div>}*/}
            </div>
        </>}
    </StickyBox>)
}
))

export default LessonBlock;
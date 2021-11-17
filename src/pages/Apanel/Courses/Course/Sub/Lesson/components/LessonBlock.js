import React from "react";
import {inject, observer} from "mobx-react";
import StickyBox from "react-sticky-box";
import Spinner from "../../../../../../../components/Spinner";

const LessonBlock = inject('userStore', 'alessonStore')(observer((store) => {
    const {alessonStore} = store

    return (<StickyBox offsetTop={66} offsetBottom={20} className="LessonList__Right">
        {alessonStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
            <div className="LessonList__Right__Data">
                <div className="LessonList__Right__Data__Title">
                    {alessonStore.lessonData?.homework && alessonStore.lessonData?.homework?.name}
                    {alessonStore.lessonData?.video && alessonStore.lessonData?.video?.name}
                    {alessonStore.lessonData?.files && alessonStore.lessonData?.files?.name}
                </div>
                {alessonStore.lessonData?.description &&
                <div className="LessonList__Right__Data__Description">
                    {alessonStore.lessonData?.description}
                </div>}
            </div>
        </>}
    </StickyBox>)
}
))

export default LessonBlock;
import React from "react";
import {inject, observer} from "mobx-react";
import StickyBox from "react-sticky-box";
import Spinner from "../../../../components/Spinner";

const LessonBlock = inject('purchaseStore', 'purCoursePageStore', 'lessonStore')(observer((store) => {
    const {lessonStore} = store

    return (
        <StickyBox offsetTop={20} offsetBottom={20}>
            {lessonStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : 'dsrbrb' }
        </StickyBox>
    )
}
))

export default LessonBlock;
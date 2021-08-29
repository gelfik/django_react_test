import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router-dom";
import StickyBox from "react-sticky-box";
import Spinner from "../../../../../../components/Spinner";
import LessonVideoBlock from "./LessonVideoBlock";
import LessonFileBlock from "./LessonFileBlock";
import LessonHomeworkBlock from "./LessonHomeworkBlock";

const LessonBlock = inject('subCourseStore', 'lessonStore', 'purchaseStore')(observer((store) => {
    const {subCourseStore, lessonStore, purchaseStore} = store

    const history = useHistory();
    const queryParams = useParams()


    useEffect(() => {
        if (subCourseStore?.subCourseData?.lessons?.length > 0) {
            if (subCourseStore?.subCourseData?.lessons[0]?.lessonList?.length > 0) {
                if (Number(queryParams?.lessonID) !== lessonStore.lessonData?.id)
                    lessonStore.loadLessonData(queryParams?.purchaseID, queryParams?.subID, queryParams?.lessonID).then(() => {
                        if (lessonStore.loadError) {
                            history.push(`/purchases`)
                        }
                    })
            }
        } else {
            if (Number(queryParams?.subID) !== subCourseStore.subCourseData?.id)
                subCourseStore.loadSubCourseData(queryParams?.purchaseID, queryParams?.subID).then(() => {
                    if (subCourseStore.subCourseError) {
                        history.push(`/purchases`)
                    }
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams?.lessonID])

    return (<StickyBox offsetTop={98} offsetBottom={20} className="LessonList__Right">
        {lessonStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
            <div className="LessonList__Right__Data">
                <div className="LessonList__Right__Data__Title">
                    {lessonStore.lessonData?.homework && lessonStore.lessonData?.homework?.name}
                    {lessonStore.lessonData?.video && lessonStore.lessonData?.video?.name}
                    {lessonStore.lessonData?.files && lessonStore.lessonData?.files?.name}
                </div>
                {lessonStore.lessonData?.video && <LessonVideoBlock/>}
                {lessonStore.lessonData?.files && <LessonFileBlock/>}
                {lessonStore.lessonData?.homework && <LessonHomeworkBlock/>}
                {lessonStore.lessonData?.description &&
                <div className="LessonList__Right__Data__Description">
                    {lessonStore.lessonData?.description}
                </div>}
            </div>
        </>}
    </StickyBox>)
}))

export default LessonBlock;
import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router-dom";
import Spinner from "../../../components/Spinner";
import PurchaseBlock from "./components/PurchaseBlock";
import SubCoursesButtonBlock from "./components/SubCoursesButtonBlock";
import SubCourseBlock from "./components/SubCourseBlock";

const PurchasesCoursePage = inject('userStore', 'purchaseStore', 'purCoursePageStore', 'subCourseStore', 'lessonStore')(observer((store) => {
    const {purchaseStore, purCoursePageStore, subCourseStore, lessonStore} = store
    const history = useHistory();
    const queryParams = useParams()


    useEffect(() => {
        purCoursePageStore.setActiveSub(undefined)
        if ((purchaseStore.purchaseData.length === 0) || (Number(purchaseStore?.purchaseData?.id) !== Number(queryParams?.purchaseID))) {
            purchaseStore.loadPurchaseData(queryParams?.purchaseID).then(() => {
                if (purchaseStore.loadError) {
                    history.push(`/purchases`)
                }
                purCoursePageStore.setActiveSub(purchaseStore?.purchaseData?.courseSub[0]?.id)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        purCoursePageStore.setActiveLesson(undefined)
        if (purCoursePageStore.activeSub) {
            if (purCoursePageStore.activeSub !== subCourseStore.subCourseData?.id)
            subCourseStore.loadSubCourseData(queryParams?.purchaseID, purCoursePageStore.activeSub).then(()=>{
                if (subCourseStore.subCourseError) {
                    history.push(`/purchases`)
                }
                lessonStore.setLessonData({})
                purCoursePageStore.setActiveLesson(subCourseStore?.subCourseData?.lessons[0]?.lessonList[0]?.id)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [purCoursePageStore.activeSub])

    useEffect(() => {
        if (purCoursePageStore.activeLesson) {
            if (purCoursePageStore.activeLesson !== lessonStore.lessonData?.id)
            lessonStore.loadLessonData(queryParams?.purchaseID, purCoursePageStore.activeSub, purCoursePageStore.activeLesson).then(()=>{
                if (lessonStore.loadError) {
                    history.push(`/purchases`)
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [purCoursePageStore.activeLesson])

    useEffect(() => {
        // document.title = `${courseStore?.courseData?.predmet ?? 'Курс'} ${courseStore?.courseData?.courseExamType ?? ''}.${courseStore?.courseData?.courseType?.name ?? ''}`
        document.body.className = 'bg-light min-vh-100'
    }, [purchaseStore?.purchaseData]);


    return (
        <main className={'bg-content mt_navbar'}>
            <div className="container-banner">
                {purchaseStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
                    {!purchaseStore.loadError && <>
                        <PurchaseBlock/>
                        <SubCoursesButtonBlock/>
                        {subCourseStore.spinner.spinnerStatus ? <Spinner type={'local'}/> :  <SubCourseBlock/>}
                    </>}
                </>}
            </div>
        </main>
    )
}))

export default PurchasesCoursePage;
import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Spinner from "../../../../components/Spinner";
import PurchaseBlock from "../components/PurchaseBlock";
import SubCoursesButtonBlock from "../components/SubCoursesButtonBlock";
import LessonListBlock from "./components/LessonListBlock";
// import LessonBlock from "./Lesson/components/LessonBlock";

const PurchasesSubPage = inject('userStore', 'purchaseStore', 'subCourseStore')(observer((store) => {
    const {purchaseStore, subCourseStore} = store

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
                        {subCourseStore.spinner.spinnerStatus ? <Spinner type={'local'}/> :
                            <section className={'LessonList'}>
                                <LessonListBlock/>
                                {/*<LessonBlock/>*/}
                            </section>}
                    </>}
                </>}
            </div>
        </main>
    )
}))

export default PurchasesSubPage;
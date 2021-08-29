import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Spinner from "../../../../components/Spinner";
import PurchaseBlock from "../components/PurchaseBlock";
import SubCoursesButtonBlock from "../components/SubCoursesButtonBlock";
import LessonListBlock from "./components/LessonListBlock";
import {Link, useParams} from "react-router-dom";
// import LessonBlock from "./Lesson/components/LessonBlock";

const PurchasesSubPage = inject('userStore', 'purchaseStore', 'subCourseStore', 'uiStore')(observer((store) => {
    const {purchaseStore, subCourseStore, uiStore} = store
    const queryParams = useParams()

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
                        {uiStore.deviceType === 'mobile' && <section className={'BackButton'}>
                            <Link to={`/purchases/${queryParams.purchaseID}`} className={'btn btn-dark'}>Назад</Link>
                        </section>}
                        {uiStore.deviceType !== 'mobile' && <SubCoursesButtonBlock/>}
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
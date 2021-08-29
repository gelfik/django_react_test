import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Spinner from "../../../../components/Spinner";
import PurchaseBlock from "../components/PurchaseBlock";
import SubCoursesButtonBlock from "../components/SubCoursesButtonBlock";
import LessonListBlock from "./components/LessonListBlock";
import {Link, useHistory, useParams} from "react-router-dom";
// import LessonBlock from "./Lesson/components/LessonBlock";

const PurchasesSubPage = inject('userStore', 'purchaseStore', 'subCourseStore', 'uiStore')(observer((store) => {
    const {purchaseStore, subCourseStore, uiStore} = store
    const history = useHistory();
    const queryParams = useParams()

    useEffect(() => {
        // document.title = `${courseStore?.courseData?.predmet ?? 'Курс'} ${courseStore?.courseData?.courseExamType ?? ''}.${courseStore?.courseData?.courseType?.name ?? ''}`
        document.body.className = 'bg-light min-vh-100'
        window.scrollTo(0, 0)
    }, [purchaseStore?.purchaseData]);

    useEffect(() => {
        if (queryParams?.purchaseID) {
            purchaseStore.setPurchaseID(queryParams?.purchaseID)
            if (purchaseStore.loadError) {
                history.push(`/purchases`)
            }
        }

        if (queryParams?.subID) {
            subCourseStore.setSubCourseID(queryParams?.purchaseID, queryParams?.subID)
            if (subCourseStore.loadError) {
                history.push(`/purchases`)
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams?.purchaseID, queryParams?.subID])

    // useEffect(() => {
    //     if (queryParams?.subID) {
    //         if (purchaseStore?.purchaseData?.courseSub?.length > 0) {
    //             if (Number(queryParams?.subID) !== subCourseStore.subCourseData?.id)
    //                 subCourseStore.loadSubCourseData(queryParams?.purchaseID, queryParams?.subID).then(() => {
    //                     if (subCourseStore.subCourseError) {
    //                         history.push(`/purchases`)
    //                     }
    //                 })
    //         }
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [queryParams?.subID])


    return (
        <main className={'bg-content mt_navbar'}>
            <div className="container-banner">
                {purchaseStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
                    {!purchaseStore.loadError && <>
                        {uiStore.deviceType !== 'mobile' && <PurchaseBlock/>}
                        {uiStore.deviceType === 'mobile' && <section className={'BackButton'}>
                            <Link to={`/purchases/${queryParams.purchaseID}`} className={'btn btn-dark'}>к списку подкурсов</Link>
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
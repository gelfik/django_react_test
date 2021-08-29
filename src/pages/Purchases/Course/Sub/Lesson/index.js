import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Spinner from "../../../../../components/Spinner";
import PurchaseBlock from "../../components/PurchaseBlock";
import SubCoursesButtonBlock from "../../components/SubCoursesButtonBlock";
import LessonListBlock from "../components/LessonListBlock";
import LessonBlock from "./components/LessonBlock";
import {Link, useHistory, useParams} from "react-router-dom";

const PurchasesLessonPage = inject('userStore', 'purchaseStore', 'purCoursePageStore', 'subCourseStore', 'lessonStore', 'uiStore')(observer((store) => {
    const {purchaseStore, subCourseStore, uiStore} = store
    const history = useHistory();
    const queryParams = useParams()

    useEffect(() => {
        // document.title = `${courseStore?.courseData?.predmet ?? 'Курс'} ${courseStore?.courseData?.courseExamType ?? ''}.${courseStore?.courseData?.courseType?.name ?? ''}`
        document.body.className = 'bg-light min-vh-100'
    }, [purchaseStore?.purchaseData]);

    useEffect(() => {
        if (uiStore.deviceType === 'mobile') {
            if ((purchaseStore.purchaseData.length === 0) || (purchaseStore?.purchaseData?.id !== Number(queryParams?.purchaseID))) {
                purchaseStore.loadPurchaseData(queryParams?.purchaseID).then(() => {
                    if (purchaseStore.loadError) {
                        history.push(`/purchases`)
                    }
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams?.purchaseID])

    useEffect(() => {
        if (uiStore.deviceType === 'mobile') {
            if (purchaseStore?.purchaseData?.courseSub?.length > 0) {
                if (Number(queryParams?.subID) !== subCourseStore.subCourseData?.id)
                    subCourseStore.loadSubCourseData(queryParams?.purchaseID, queryParams?.subID).then(() => {
                        if (subCourseStore.subCourseError) {
                            history.push(`/purchases`)
                        }
                    })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams?.subID])


    return (
        <main className={'bg-content mt_navbar'}>
            <div className="container-banner">
                {purchaseStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
                    {!purchaseStore.loadError && <>
                        <PurchaseBlock/>
                        {uiStore.deviceType === 'mobile' && <section className={'BackButton'}>
                            <Link to={`/purchases/${queryParams.purchaseID}/sub/${queryParams.subID}`}
                                  className={'btn btn-dark'}>Назад</Link>
                        </section>}
                        {uiStore.deviceType !== 'mobile' && <SubCoursesButtonBlock/>}
                        {subCourseStore.spinner.spinnerStatus ? <Spinner type={'local'}/> :
                            <section className={'LessonList'}>
                                {uiStore.deviceType !== 'mobile' && <LessonListBlock/>}
                                <LessonBlock/>
                            </section>}
                    </>}
                </>}
            </div>
        </main>
    )


}))

export default PurchasesLessonPage;
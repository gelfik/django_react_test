import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Spinner from "../../../../components/Spinner";
import PurchaseBlock from "../components/PurchaseBlock";
import LessonListBlock from "./components/LessonListBlock";
import {Link, useHistory, useParams} from "react-router-dom";

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
        purchaseStore.setLoadError(false)
        subCourseStore.setSubCourseError(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if ((purchaseStore.loadError) || (subCourseStore.subCourseError)) {
            history.push(`/purchases`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [purchaseStore.loadError, subCourseStore.subCourseError])

    useEffect(() => {
        purchaseStore.setPurchaseID(queryParams?.purchaseID)
        subCourseStore.setSubCourseID(queryParams?.purchaseID, queryParams?.subID)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams?.purchaseID, queryParams?.subID])

    return (
        <main className={'bg-content mt_navbar'}>
            <div className="container-banner">
                {purchaseStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
                    {!purchaseStore.loadError && <>
                        {uiStore.deviceType !== 'mobile' && <PurchaseBlock/>}
                        {uiStore.deviceType === 'mobile' && <section className={'BackButton'}>
                            <Link to={`/purchases${queryParams.purchaseID}`} className={'btn btn-dark'}>к списку подкурсов</Link>
                        </section>}
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
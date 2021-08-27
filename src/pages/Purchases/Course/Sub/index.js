import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Spinner from "../../../../components/Spinner";
import SubCourseBlock from "./components/SubCourseBlock";
import PurchaseBlock from "../components/PurchaseBlock";
import SubCoursesButtonBlock from "../components/SubCoursesButtonBlock";

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
                        {subCourseStore.spinner.spinnerStatus ? <Spinner type={'local'}/> :  <SubCourseBlock/>}
                    </>}
                </>}
            </div>
        </main>
    )
}))

export default PurchasesSubPage;
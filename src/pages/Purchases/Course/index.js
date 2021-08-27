import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Spinner from "../../../components/Spinner";
import PurchaseBlock from "./components/PurchaseBlock";
import SubCoursesButtonBlock from "./components/SubCoursesButtonBlock";

const PurchasesCoursePage = inject('userStore', 'purchaseStore')(observer((store) => {
    const {purchaseStore} = store

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
                    </>}
                </>}
            </div>
        </main>
    )
}))

export default PurchasesCoursePage;
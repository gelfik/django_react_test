import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Spinner from "../../../components/Spinner";
import PurchaseBlock from "./components/PurchaseBlock";
import SubCoursesButtonBlock from "./components/SubCoursesButtonBlock";
import {useHistory, useParams} from "react-router-dom";

const PurchasesCoursePage = inject('userStore', 'purchaseStore')(observer((store) => {
    const {purchaseStore} = store

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
            // if ((purchaseStore.purchaseData.length === 0) || (purchaseStore?.purchaseData?.id !== Number(queryParams?.purchaseID))) {
            //     purchaseStore.loadPurchaseData(queryParams?.purchaseID).then(() => {
            //         if (purchaseStore.loadError) {
            //             history.push(`/purchases`)
            //         }
            //     })
            // }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams?.purchaseID])

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
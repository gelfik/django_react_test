import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import PurchasesBlock from "./components/PurchasesBlock";

const PurchasesPage = inject('userStore', 'purchasesListStore')(observer((store) => {
    const {purchasesListStore} = store

    useEffect(() => {
        document.body.className = 'bg-light min-vh-100'
        window.scrollTo(0, 0)
    }, []);

    return (
        <main className={'mt_navbar bg-content'}>
            <div className="container-banner">
                <div className="display-3 fw-bold pb-3">мои курсы <span className={'SpanPurchaseCount'}>{purchasesListStore?.purchasesListData?.length>0 && purchasesListStore?.purchasesListData?.length}</span></div>
                <PurchasesBlock/>
            </div>
        </main>
    )
}))

export default PurchasesPage;
import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import BuyBlock from "./components/BuyBlock";

const PurchasesPurchasePage = inject('userStore', 'purchaseCourseStore')(observer((store) => {
    const {purchaseCourseStore} = store
    // const queryParams = useParams()
    // console.log(queryParams)

    useEffect(() => {
        purchaseCourseStore.setCourseError(false)
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.body.className = 'bg-light min-vh-100'
    }, [purchaseCourseStore?.courseData]);

    return (
        <main className={'bg-content mt_navbar'}>
            <div className="container__wrapper purchase">
                <h1 className="purchase__Title">
                    докупка курса
                </h1>
                <BuyBlock/>
            </div>
        </main>
    )
}))

export default PurchasesPurchasePage;
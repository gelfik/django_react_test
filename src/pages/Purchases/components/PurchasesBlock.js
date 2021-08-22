import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import Spinner from "../../../components/Spinner";

const PurchasesBlock = inject('userStore', 'purchasesListStore')(observer((store) => {
    const {purchasesListStore} = store

    useEffect(() => {
        purchasesListStore.loadPurchasesListData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getPurchasesList = () => {
        if (purchasesListStore?.purchasesListData?.length === 0) {
            return <div className="display-6">
                у вас нет купленных курсов
            </div>
        }
        return <div className="PurchaseList">{getItemPurchases()}</div>
    }

    const getItemPurchases = () => {
        return purchasesListStore?.purchasesListData?.map((item, i) =>
            <div className="PurchaseList__Item">
                <div className="PurchaseList__Item__Content">
                    <div className="PurchaseList__Item__Header">
                        <Link to={`/purchases/${item?.id}`} className="PurchaseList__Item__Link">
                            <div className="PurchaseList__Item__Avatar">
                                <img src={`${item?.course?.coursePicture}`} alt=''/>
                            </div>
                            <div className="PurchaseList__Item__Title">
                                <p>{item?.course?.name}</p>
                                <div className="Chips">
                                    <div className="Chips__Item">
                                        {item?.course?.predmet}
                                        <span/>
                                    </div>
                                    <div className="Chips__Item">
                                        {item?.course?.courseExamType}
                                    </div>
                                    <div className="Chips__Item">
                                        {item?.course?.courseType}
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="PurchaseList__Item__PayInfo">
                            {item?.courseSubAll &&
                            <span className="PurchaseList__Item__PayInfo__PayStatus">
                                <svg fill="none" height="16" width="16">
                                    <use xlinkHref={'#check-valid'}/>
                                </svg>
                                <p>Курс куплен полностью</p>
                            </span>}
                            {!item?.courseSubAll &&
                            <Link to={`/purchases/${item?.id}/purchase`} className="PurchaseList__Item__PayInfo__Link">Докупить курс</Link>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {purchasesListStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : getPurchasesList()}
        </>
    )
}))

export default PurchasesBlock;
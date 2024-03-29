import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import Spinner from "../../../components/Spinner";

const PurchasesBlock = inject('userStore', 'purchasesListStore', 'modalStore', 'purchaseStore')(observer((store) => {
    const {purchasesListStore, modalStore, purchaseStore} = store

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
        return <div className="Course">{getItemPurchases()}</div>
    }

    const getItemPurchases = () => {
        return purchasesListStore?.purchasesListData?.map((item, i) =>
            <div className="Course__Item" key={i}>
                <div className="Course__Item__Content">
                    <div className="Course__Item__Header">
                        <Link to={`/purchases${item?.id}`} className="Course__Item__Data">
                            <div className="Course__Item__Avatar">
                                <img src={`${item?.course?.coursePicture}`} alt=''/>
                            </div>
                            <div className="Course__Item__Title">
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
                        <div className="Course__Item__PayInfo">
                            {item?.courseSubAll &&
                            <span className="Course__Item__PayInfo__PayStatus">
                                <svg fill="none" height="16" width="16">
                                    <use xlinkHref={'#check-valid'}/>
                                </svg>
                                <p>Курс куплен полностью</p>
                            </span>}
                            {!item?.courseSubAll &&
                            <Link to={`/purchases${item?.id}/purchase`} className="Course__Item__PayInfo__Link">докупить
                                курс</Link>}
                            <div className="Course__Item__PayInfo__Link" onClick={()=>{
                                purchaseStore.setPurchaseData(item)
                                modalStore.PurchaseDetailModalShow();
                            }}>история платежей</div>
                            <Link to={`/purchases${item?.id}/stats`} className="Course__Item__PayInfo__Link">моя статистика</Link>
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
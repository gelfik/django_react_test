import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Link, useHistory, useParams} from "react-router-dom";

const PurchaseBlock = inject('purchaseStore', 'modalStore')(observer((store) => {
    const {purchaseStore, modalStore} = store

    const history = useHistory();
    const queryParams = useParams()

    useEffect(() => {
        console.log(111)
        if ((purchaseStore.purchaseData.length === 0) || (purchaseStore?.purchaseData?.id !== Number(queryParams?.purchaseID))) {
            purchaseStore.loadPurchaseData(queryParams?.purchaseID).then(() => {
                if (purchaseStore.loadError) {
                    history.push(`/purchases`)
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams?.purchaseID])

    return (
        <section className={'Purchase PurchasePage'}>
            <div className="Purchase__Item">
                <div className="Purchase__Item__Content">
                    <div className="Purchase__Item__Header">
                        <div className="Purchase__Item__Data">
                            <div className="Purchase__Item__Avatar">
                                <img src={`${purchaseStore?.purchaseData?.course?.coursePicture}`} alt=''/>
                            </div>
                            <div className="Purchase__Item__Title">
                                <p>{purchaseStore?.purchaseData?.course?.name}</p>
                                <div className="Chips">
                                    <div className="Chips__Item">
                                        {purchaseStore?.purchaseData?.course?.predmet}
                                        <span/>
                                    </div>
                                    <div className="Chips__Item">
                                        {purchaseStore?.purchaseData?.course?.courseExamType}
                                    </div>
                                    <div className="Chips__Item">
                                        {purchaseStore?.purchaseData?.course?.courseType}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Purchase__Item__PayInfo">
                            {purchaseStore?.purchaseData?.courseSubAll &&
                            <span className="Purchase__Item__PayInfo__PayStatus">
                                        <svg fill="none" height="16" width="16">
                                            <use xlinkHref={'#check-valid'}/>
                                        </svg>
                                        <p>Курс куплен полностью</p>
                                    </span>
                            }
                            {!purchaseStore?.purchaseData?.courseSubAll &&
                            <Link to={`/purchases/${purchaseStore?.purchaseData?.id}/purchase`}
                                  className="Purchase__Item__PayInfo__Link">Докупить
                                курс</Link>}
                            <div className="Purchase__Item__PayInfo__Link" onClick={()=>{
                                modalStore.PurchaseDetailModalShow();
                            }}>история платежей</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}))

export default PurchaseBlock;
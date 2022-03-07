import React from "react";
import {inject, observer} from "mobx-react";

const TransactionBlock = inject('userStore', 'apurchaseStore')(observer((store) => {
    const {apurchaseStore} = store

    const getPayData = () => {
        return apurchaseStore?.purchaseData?.pay?.map((item, i) =>
            <div key={i} className="Table__Row">
                <div className="Table__Col">
                    {item.date}
                </div>
                <div className="Table__Col">
                    {item.courseSub?.name}
                </div>
                <div className="Table__Col">
                    {item.sumPay === 0 ? 'бесплатно' : `${item.sumPay} ₽`}
                </div>
            </div>
        )
    }

    return (
        <div className="Purchase__Item__PayHistory">
            <div className="Purchase__Item__PayHistory__Title">
                история платежей
            </div>
            <div className="Purchase__Item__PayHistory__HistoryData">
                <div className="Table">
                    <div className="Table__Header">
                        <div className="Table__Row">
                            <div className="Table__Col">
                                дата
                            </div>
                            <div className="Table__Col">
                                раздел
                            </div>
                            <div className="Table__Col">
                                сумма
                            </div>
                        </div>
                    </div>
                    <div className="Table__Body">
                        {getPayData()}
                    </div>
                </div>
            </div>
        </div>
    )
}))


export default TransactionBlock;

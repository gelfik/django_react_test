import React from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {Link} from "react-router-dom";

const PurchaseDetailModal = inject('userStore', 'modalStore', 'purchaseStore')(observer((stores) => {
    const {modalStore, purchaseStore} = stores;

    const getPayData = () => {
        return purchaseStore?.purchaseData?.purchasePay?.map((item, i) =>
            <div key={i} className="Table__Row">
                <div className="Table__Col">
                    {item.date}
                </div>
                <div className="Table__Col">
                    {item.sumPay === 0 ? 'бесплатно' : 'онлайн оплата'}
                </div>
                <div className="Table__Col">
                    {item.sumPay === 0 ? '-' : `${item.sumPay} ₽`}
                </div>
            </div>
        )
    }

    return (
        <Modal show={modalStore.PurchaseDetailModalStatus} centered onHide={modalStore.PurchaseDetailModalClose}>
            <div className="PurchasePayDetailModal">
                <button type="button" className="CloseButton" aria-label="Close" onClick={modalStore.PurchaseDetailModalClose}>
                    <svg height="28" width="28">
                        <use xlinkHref={'#icon-close'}/>
                    </svg>
                </button>
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
                                      className="Purchase__Item__PayInfo__Link"  onClick={modalStore.PurchaseDetailModalClose}>Докупить
                                    курс</Link>}
                            </div>
                        </div>
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
                                                тип оплаты
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
                    </div>
                </div>
            </div>
        </Modal>
    )
}))


export default PurchaseDetailModal;
import React from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";

const APurchaseUserModal = inject('modalStore', 'acourseStore')(observer((stores) => {
    const {modalStore, acourseStore} = stores;

    const getPayData = () => {
        return acourseStore?.courseData?.purchaseList[acourseStore?.purchaseUserID]?.pay?.map((item, i) =>
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

    const getSubCourseData = () => {
        return acourseStore?.courseData?.purchaseList[acourseStore?.purchaseUserID]?.pay?.map((item, i) =>
            <div className='Purchase__Item__SubCourse__Data__Name' key={i}>{item.courseSub?.name}</div>
        )
    }

    return (
        <Modal show={modalStore.APurchaseUserModalStatus} centered onHide={modalStore.APurchaseUserModalClose}>
            <div className="PurchasePayDetailModal">
                <button type="button" className="CloseButton" aria-label="Close" onClick={modalStore.APurchaseUserModalClose}>
                    <svg height="28" width="28">
                        <use xlinkHref={'#icon-close'}/>
                    </svg>
                </button>
                <div className="Purchase__Item">
                    <div className="Purchase__Item__Content">
                        <div className="Purchase__Item__SubCourse">
                            <div className="Purchase__Item__SubCourse__Title">
                                купленные разделы
                            </div>
                            <div className="Purchase__Item__SubCourse__Data">
                                {acourseStore?.courseData?.purchaseList?.length > 0 && getSubCourseData()}
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
                                                раздел
                                            </div>
                                            <div className="Table__Col">
                                                сумма
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Table__Body">
                                        {acourseStore?.courseData?.purchaseList?.length > 0 && getPayData()}
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


export default APurchaseUserModal;

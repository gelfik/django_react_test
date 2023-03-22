import React from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {Tabs, Tab} from "react-bootstrap";
import {useForm} from "react-hook-form";

const APurchaseManagementModal = inject('modalStore', 'acourseStore', 'apurManageStore')(observer((stores) => {
    const {modalStore, apurManageStore, acourseStore} = stores;
    const {register, handleSubmit} = useForm();


    const getItemSub = () => {
        return apurManageStore?.purchase?.pay.map((item, i) =>
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

    // const getUnboughtCourses = () => {
    //     return acoursesListStore?.filterData?.predmet?.map((item, i) =>
    //         <option key={i} value={item.id}>{item.name}</option>
    //     )
    // }

    return (
        <Modal show={modalStore.APurchaseManagementModalStatus} centered
               onHide={modalStore.APurchaseManagementModalClose}>
            <Modal.Header>
                <Modal.Title>{acourseStore.courseData?.name}</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.APurchaseManagementModalClose}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'}>
                    <div className={'mb-3'}>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={apurManageStore.activeTab}
                            onSelect={(k) => apurManageStore.setActiveTab(k)}
                            className="mb-3"
                        >
                            <Tab className={'UserInfo'} eventKey="profile" title="Профиль">
                                <p>{apurManageStore.purchase?.user?.lastName} {apurManageStore.purchase?.user?.firstName}</p>
                                <p>Логин: @{apurManageStore.purchase?.user?.username}</p>
                                <p>E-Mail: {apurManageStore.purchase?.user?.email}</p>
                                <p>Телефон: {apurManageStore.purchase?.user?.phone}</p>
                            </Tab>
                            <Tab eventKey="transactions" title="Транзакции">
                                {getItemSub()}
                                <form className={'d-flex flex-column'} onSubmit={handleSubmit()}>
                                    <div className="form-floating">
                                        <select className="form-select" id={'coursePick'}
                                                required placeholder={'Курс'} {...register('coursePick')}>
                                            {/*{getItemPredmet()}*/}
                                        </select>
                                        <label htmlFor={'coursePick'}>Курс</label>
                                    </div>
                                </form>
                            </Tab>
                            <Tab eventKey="courseManagement" title="Управление курсами">
                                courseManagement
                            </Tab>
                        </Tabs>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}))


export default APurchaseManagementModal;
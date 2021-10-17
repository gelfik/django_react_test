import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../ErrorAlert";

const ASubCourseAddModal = inject('userStore', 'modalStore', 'acourseStore')(observer((stores) => {
    const {modalStore, acourseStore} = stores;
    const {register, handleSubmit, reset} = useForm();

    const history = useHistory();

    useEffect(() => {
        acourseStore.setErrorAdd(undefined)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.ASubCourseAddModalStatus])

    const onSubmitAdd = (data) => {
        acourseStore.setSubCourseAddData({})
        acourseStore.loadSubCourseAdd(data).then(() => {
            if (acourseStore.subCourseAddData?.status) {
                modalStore.ASubCourseAddModalClose()
                reset()
                // acourseStore.loadCourseData(acourseStore.subCourseAddData?.courseID)
                acourseStore.setCourseID(acourseStore.subCourseAddData?.courseID)
                history.push(`/apanel/course/${acourseStore.subCourseAddData?.courseID}/sub/${acourseStore.subCourseAddData?.subCourseID}`)
            }
        })
    }

    return (
        <Modal show={modalStore.ASubCourseAddModalStatus} centered onHide={modalStore.ASubCourseAddModalClose}>
            <Modal.Header>
                <Modal.Title>Добавление подкурса</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.ASubCourseAddModalClose}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'} onSubmit={handleSubmit(onSubmitAdd)}>
                    {acourseStore?.errorsAdd && acourseStore?.errorsAdd['error'] &&
                    <ErrorAlert error={acourseStore?.errorsAdd['error']}/>}
                    <div className={"row"}>
                        <div className="col-lg-12 col-12 mb-3">
                            <div className="form-floating ">
                                <input type={'text'} className={`form-control`}
                                       id={'name'} {...register('name')}
                                       required placeholder={'Название'}/>
                                <label htmlFor={'name'}>Название</label>
                            </div>
                            {acourseStore?.errorsAdd && acourseStore?.errorsAdd['name'] &&
                            <p className={'custom-alert-danger-text'}>{acourseStore?.errorsAdd['name']}</p>}
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating ">
                                <input type={'date'} className={`form-control`}
                                       id={'startDate'} {...register('startDate')}
                                       required placeholder={'Дата начала'}/>
                                <label htmlFor={'startDate'}>Дата начала</label>
                            </div>
                            {acourseStore?.errorsAdd && acourseStore?.errorsAdd['startDate'] &&
                            <p className={'custom-alert-danger-text'}>{acourseStore?.errorsAdd['startDate']}</p>}
                        </div>
                        <div className="col-md">
                            <div className="form-floating ">
                                <input type={'date'} className={`form-control`}
                                       id={'endDate'} {...register('endDate')}
                                       required placeholder={'Дата окончания'}/>
                                <label htmlFor={'endDate'}>Дата окончания</label>
                            </div>
                            {acourseStore?.errorsAdd && acourseStore?.errorsAdd['endDate'] &&
                            <p className={'custom-alert-danger-text'}>{acourseStore?.errorsAdd['endDate']}</p>}
                        </div>
                    </div>
                    <button type={"submit"} className={'btn btn-dark'}>Добавить</button>
                </form>
            </Modal.Body>
        </Modal>
    )
}))


export default ASubCourseAddModal;
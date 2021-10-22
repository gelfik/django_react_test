import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import {useAlert} from "react-alert";

const ASubCourseEditModal = inject('userStore', 'modalStore', 'acourseStore', 'asubCourseStore')(observer((stores) => {
    const {modalStore, acourseStore, asubCourseStore} = stores;
    const {register, handleSubmit, setValue} = useForm();
    const alert = useAlert();
    const history = useHistory();

    useEffect(() => {
        asubCourseStore.setErrorEdit(undefined)
        setValue('name', asubCourseStore.subCourseData?.name)
        setValue('startDate', asubCourseStore.subCourseData?.startDate)
        setValue('endDate', asubCourseStore.subCourseData?.endDate)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.ASubCourseEditModalStatus])

    const onSubmitEdit = (data) => {
        asubCourseStore.setSubCourseEditData({})
        asubCourseStore.loadSubCourseEdit(data, acourseStore.courseID).then(() => {
            if (asubCourseStore.subCourseEditData?.status) {
                modalStore.ASubCourseEditModalClose()
                alert.success(asubCourseStore.subCourseEditData?.detail)
            }
            // history.push(`/apanel/course${asubCourseStore.subCourseEditData?.courseID}/sub${asubCourseStore.subCourseEditData?.subCourseID}`)
        })
    }

    const onSubmitDelete = () => {
        asubCourseStore.loadSubCourseDelete(acourseStore.courseID).then(() => {
            modalStore.ASubCourseEditModalClose()
            if (asubCourseStore.subCourseDeleteData?.status) {
                alert.success(asubCourseStore.subCourseDeleteData?.detail)
                acourseStore.loadCourseData(acourseStore.courseID)
                history.push(`/apanel/course${acourseStore.courseID}`)
            } else alert.error(asubCourseStore.subCourseDeleteData?.detail)
        })
    }

    return (
        <Modal show={modalStore.ASubCourseEditModalStatus} centered onHide={modalStore.ASubCourseEditModalClose}>
            <Modal.Header>
                <Modal.Title>Редактирование подкурса</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.ASubCourseEditModalClose}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'} onSubmit={handleSubmit(onSubmitEdit)}>
                    {asubCourseStore?.errorsEdit && asubCourseStore?.errorsEdit['error'] &&
                    <ErrorAlert error={asubCourseStore?.errorsEdit['error']}/>}
                    <div className={"row"}>
                        <div className="col-lg-12 col-12 mb-3">
                            <div className="form-floating ">
                                <input type={'text'} className={`form-control`}
                                       id={'name'} {...register('name')}
                                       required placeholder={'Название'}/>
                                <label htmlFor={'name'}>Название</label>
                            </div>
                            {asubCourseStore?.errorsEdit && asubCourseStore?.errorsEdit['name'] &&
                            <p className={'custom-alert-danger-text'}>{asubCourseStore?.errorsEdit['name']}</p>}
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
                            {asubCourseStore?.errorsEdit && asubCourseStore?.errorsEdit['startDate'] &&
                            <p className={'custom-alert-danger-text'}>{asubCourseStore?.errorsEdit['startDate']}</p>}
                        </div>
                        <div className="col-md">
                            <div className="form-floating ">
                                <input type={'date'} className={`form-control`}
                                       id={'endDate'} {...register('endDate')}
                                       required placeholder={'Дата окончания'}/>
                                <label htmlFor={'endDate'}>Дата окончания</label>
                            </div>
                            {asubCourseStore?.errorsEdit && asubCourseStore?.errorsEdit['endDate'] &&
                            <p className={'custom-alert-danger-text'}>{asubCourseStore?.errorsEdit['endDate']}</p>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-lg-6 col-6">
                            <button type={"button"} className={'btn btn-danger w-100'}
                                    onClick={() => onSubmitDelete()}>Удалить
                            </button>
                        </div>
                        <div className="col-lg-6 col-6">
                            <button type={"submit"} className={'btn btn-dark w-100'}>Сохранить</button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}))


export default ASubCourseEditModal;
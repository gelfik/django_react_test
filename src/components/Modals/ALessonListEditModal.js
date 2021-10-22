import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useForm} from "react-hook-form";
import ErrorAlert from "../ErrorAlert";
import {useAlert} from "react-alert";
import Moment from "moment";
import {Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const ALessonListEditModal = inject('userStore', 'modalStore', 'acourseStore', 'asubCourseStore', 'alessonStore')(observer((stores) => {
    const {modalStore, acourseStore, asubCourseStore, alessonStore} = stores;
    const {register, handleSubmit, setValue} = useForm();
    const alert = useAlert();
    const history = useHistory();

    useEffect(() => {
        if (modalStore.ALessonListEditModalStatus) {
            alessonStore.setErrorEdit(undefined)
            let data = asubCourseStore.subCourseData?.lessons?.filter(item => item.id === alessonStore.lessonListID)?.shift()
            setValue('lessonDate', Moment(data?.lessonDate, "DD.MM.YYYY H:m").format('YYYY-MM-DDTHH:mm'))
            setValue('isOpen', data?.isOpen)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.ALessonListEditModalStatus])

    const onSubmitEdit = (data) => {
        alessonStore.setLessonListEditData({})
        alessonStore.loadLessonListEdit(data, acourseStore.courseID, asubCourseStore.subCourseID).then(() => {
            if (alessonStore.lessonListEditData?.status) {
                asubCourseStore.loadSubCourseData(acourseStore.courseID, asubCourseStore.subCourseID)
                modalStore.ALessonListEditModalClose()
                alert.success(alessonStore.lessonListEditData?.detail)
            }
        })
    }

    const onSubmitDelete = () => {
        modalStore.ALessonListEditModalClose()
        alessonStore.loadLessonListDelete(acourseStore.courseID, asubCourseStore.subCourseID).then(() => {
            if (alessonStore.lessonListDeleteData?.status) {
                alert.success(alessonStore.lessonListDeleteData?.detail)
                asubCourseStore.loadSubCourseData(acourseStore.courseID, asubCourseStore.subCourseID)
                history.push(`/apanel/course${acourseStore.courseID}/sub${asubCourseStore.subCourseID}`)
            } else alert.error(alessonStore.lessonListDeleteData?.detail)
        })
    }

    return (
        <Modal show={modalStore.ALessonListEditModalStatus} centered onHide={modalStore.ALessonListEditModalClose}>
            <Modal.Header>
                <Modal.Title>Редактирование занятия</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.ALessonListEditModalClose}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'} onSubmit={handleSubmit(onSubmitEdit)}>
                    {alessonStore?.errorsEdit && alessonStore?.errorsEdit['error'] &&
                    <ErrorAlert error={alessonStore?.errorsEdit['error']}/>}
                    <div className={"row"}>
                        <div className="col-lg-12 col-12 mb-3">
                            <div className="form-floating ">
                                <input type={'datetime-local'} className={`form-control`}
                                       id={'lessonDate'} {...register('lessonDate')}
                                       required placeholder={'Дата начала'}
                                       min={`${asubCourseStore.subCourseData?.startDate}T00:00`}
                                       max={`${asubCourseStore.subCourseData?.endDate}T23:59`}/>
                                <label htmlFor={'lessonDate'}>Дата начала</label>
                            </div>
                            {alessonStore?.errorsEdit && alessonStore?.errorsEdit['lessonDate'] &&
                            <p className={'custom-alert-danger-text'}>{alessonStore?.errorsEdit['lessonDate']}</p>}
                        </div>
                        <div className="col-lg-12 col-12 mb-3">
                            <Form.Check
                                type="switch"
                                id="isOpen"
                                label="Статус доступности"
                                {...register('isOpen')}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col-lg-6 col-6">
                    <button type={"button"} className={'btn btn-danger w-100'} onClick={() => onSubmitDelete()}>Удалить</button>
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


export default ALessonListEditModal;
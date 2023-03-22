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
            alessonStore.setResponse(undefined)
            let data = asubCourseStore.subCourseData?.lessons?.filter(item => item.id === alessonStore.lessonID)?.shift()
            setValue('date', Moment(data?.date, "YYYY-MM-DD").format('yyyy-MM-DD'))
            setValue('isOpen', data?.isOpen)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.ALessonListEditModalStatus])

    const onSubmitEdit = (data) => {
        alessonStore.setResponse({})
        alessonStore.loadLessonEdit(data, acourseStore.courseID, asubCourseStore.subCourseID).then(() => {
            if (alessonStore.response?.status) {
                asubCourseStore.loadSubCourseData(acourseStore.courseID, asubCourseStore.subCourseID)
                modalStore.ALessonListEditModalClose()
                alert.success(alessonStore.response?.detail)
            }
        })
    }

    const onSubmitDelete = () => {
        modalStore.ALessonListEditModalClose()
        alessonStore.loadLessonDelete({}, acourseStore.courseID, asubCourseStore.subCourseID).then(() => {
            if (alessonStore.response?.status) {
                alert.success(alessonStore.response?.detail)
                asubCourseStore.loadSubCourseData(acourseStore.courseID, asubCourseStore.subCourseID)
                history.push(`/apanel/course${acourseStore.courseID}/sub${asubCourseStore.subCourseID}`)
            } else alert.error(alessonStore.response?.detail)
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
                    {alessonStore?.response && alessonStore?.response['error'] &&
                    <ErrorAlert error={alessonStore?.response['error']}/>}
                    <div className={"row"}>
                        <div className="col-lg-12 col-12 mb-3">
                            <div className="form-floating ">
                                <input type={'date'} className={`form-control`}
                                       id={'date'} {...register('date') }
                                       required placeholder={'Дата начала'}
                                       min={`${asubCourseStore.subCourseData?.startDate}`}
                                       max={`${asubCourseStore.subCourseData?.endDate}`}/>
                                <label htmlFor={'date'}>Дата начала</label>
                            </div>
                            {alessonStore?.response && alessonStore?.response['lessonDate'] &&
                            <p className={'custom-alert-danger-text'}>{alessonStore?.response['lessonDate']}</p>}
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
import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../ErrorAlert";

const ALessonListAddModal = inject('userStore', 'modalStore', 'acourseStore' ,'asubCourseStore')(observer((stores) => {
    const {modalStore, acourseStore, asubCourseStore} = stores;
    const {register, handleSubmit, reset} = useForm();

    const history = useHistory();

    useEffect(() => {
        asubCourseStore.setErrorAdd(undefined)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.ALessonListAddModalStatus])

    const onSubmitAdd = (data) => {
        asubCourseStore.setlessonListAddData({})
        asubCourseStore.loadLessonListAdd(data, acourseStore.courseID).then(()=> {
            if (asubCourseStore.lessonListAddData?.status) {
                modalStore.ALessonListAddModalClose()
                reset()
                history.push(`/apanel/course${acourseStore?.courseID}/sub${asubCourseStore?.subCourseID}/lesson${asubCourseStore.lessonListAddData?.id}`)
            }
        })
    }

    return (
        <Modal show={modalStore.ALessonListAddModalStatus} centered onHide={modalStore.ALessonListAddModalClose}>
            <Modal.Header>
                <Modal.Title>Добавление занятия</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.ALessonListAddModalClose}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'} onSubmit={handleSubmit(onSubmitAdd)}>
                    {asubCourseStore?.errorsAdd && asubCourseStore?.errorsAdd['error'] &&
                    <ErrorAlert error={asubCourseStore?.errorsAdd['error']}/>}
                    <div className={"row"}>
                        <div className="col-lg-12 col-12 mb-3">
                            <div className="form-floating ">
                                <input type={'date'} className={`form-control`}
                                       id={'date'} {...register('date')}
                                       required placeholder={'Дата начала'} min={`${asubCourseStore.subCourseData?.startDate}`} max={`${asubCourseStore.subCourseData?.endDate}`}/>
                                <label htmlFor={'date'}>Дата начала</label>
                            </div>
                            {asubCourseStore?.errorsAdd && asubCourseStore?.errorsAdd['date'] &&
                            <p className={'custom-alert-danger-text'}>{asubCourseStore?.errorsAdd['date']}</p>}
                        </div>
                    </div>
                    <button type={"submit"} className={'btn btn-dark'}>Добавить</button>
                </form>
            </Modal.Body>
        </Modal>
    )
}))


export default ALessonListAddModal;
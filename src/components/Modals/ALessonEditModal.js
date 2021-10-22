import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import {useAlert} from "react-alert";
import {Form} from "react-bootstrap";
import Spinner from "../Spinner";

const ALessonEditModal = inject('userStore', 'modalStore', 'acourseStore', 'asubCourseStore', 'alessonStore')(observer((stores) => {
    const {modalStore, acourseStore, asubCourseStore, alessonStore} = stores;
    const {register, handleSubmit, setValue} = useForm();
    const alert = useAlert();
    const history = useHistory();

    useEffect(() => {
        alessonStore.setErrorLessonEdit(undefined)
        if (alessonStore.lessonData?.video) {
            setValue('name', alessonStore.lessonData?.video?.name)
            setValue('linkVideo', alessonStore.lessonData?.video?.linkVideo)
        }
        if (alessonStore.lessonData?.homework) {
            setValue('name', alessonStore.lessonData?.homework?.name)
        }
        if (alessonStore.lessonData?.files) {
            setValue('name', alessonStore.lessonData?.files?.name)
        }
        setValue('description', alessonStore.lessonData?.description)
        setValue('isOpen', alessonStore.lessonData?.isOpen)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.ALessonEditModalStatus, alessonStore.spinner.spinnerStatus])
    //
    const onSubmitEdit = (data) => {
        alessonStore.setlessonEditData({})
        alessonStore.loadLessonEdit(data, acourseStore.courseID, asubCourseStore.subCourseID).then(() => {
            if (alessonStore.lessonEditData?.status) {
                modalStore.ALessonEditModalClose()
                alert.success(alessonStore.lessonEditData?.detail)
            }
            // history.push(`/apanel/course${asubCourseStore.subCourseEditData?.courseID}/sub${asubCourseStore.subCourseEditData?.subCourseID}`)
        })
    }

    // const onSubmitDelete = () => {
    //     asubCourseStore.loadSubCourseDelete(acourseStore.courseID).then(() => {
    //         modalStore.ASubCourseEditModalClose()
    //         if (asubCourseStore.subCourseDeleteData?.status) {
    //             alert.success(asubCourseStore.subCourseDeleteData?.detail)
    //             acourseStore.loadCourseData(acourseStore.courseID)
    //             history.push(`/apanel/course${acourseStore.courseID}`)
    //         } else alert.error(asubCourseStore.subCourseDeleteData?.detail)
    //     })
    // }

    return (
        <Modal show={modalStore.ALessonEditModalStatus} centered onHide={modalStore.ALessonEditModalClose}>
            {alessonStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
                <Modal.Header>
                    <Modal.Title>Редактирование урока</Modal.Title>
                    <button type="button" className="btn-close" aria-label="Close"
                            onClick={modalStore.ALessonEditModalClose}/>
                </Modal.Header>
                <Modal.Body>
                    <form className={'d-flex flex-column'} onSubmit={handleSubmit(onSubmitEdit)}>
                        {alessonStore?.errorsLessonEdit && alessonStore?.errorsLessonEdit['error'] &&
                        <ErrorAlert error={alessonStore?.errorsLessonEdit['error']}/>}
                        <div className={"row"}>
                            <div className="col-lg-12 col-12 mb-3">
                                <div className="form-floating ">
                                    <input type={'text'} className={`form-control`}
                                           id={'name'} {...register('name')}
                                           required placeholder={'Название'}/>
                                    <label htmlFor={'name'}>Название</label>
                                </div>
                                {alessonStore?.errorsLessonEdit && alessonStore?.errorsLessonEdit['name'] &&
                                <p className={'custom-alert-danger-text'}>{alessonStore?.errorsLessonEdit['name']}</p>}
                            </div>
                            <div className="col-lg-12 col-12 mb-3">
                                <div className="form-floating ">
                                <textarea className={`form-control`}
                                          id={'description'} {...register('description')}
                                          required placeholder={'Название'} style={{height: '100px'}}/>
                                    <label htmlFor={'description'}>Описание</label>
                                </div>
                                {alessonStore?.errorsLessonEdit && alessonStore?.errorsLessonEdit['description'] &&
                                <p className={'custom-alert-danger-text'}>{alessonStore?.errorsLessonEdit['description']}</p>}
                            </div>
                            {alessonStore.lessonData?.video &&
                            <div className="col-lg-12 col-12 mb-3">
                                <div className="form-floating ">
                                <textarea className={`form-control`}
                                          id={'linkVideo'} {...register('linkVideo')}
                                          required placeholder={'Название'} style={{height: '100px'}}/>
                                    <label htmlFor={'linkVideo'}>Ссылка для встраивания видео</label>
                                </div>
                                {alessonStore?.errorsLessonEdit && alessonStore?.errorsLessonEdit['linkVideo'] &&
                                <p className={'custom-alert-danger-text'}>{alessonStore?.errorsLessonEdit['linkVideo']}</p>}
                            </div>}
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
                                <button type={"button"} className={'btn btn-danger w-100'}>Удалить
                                </button>
                            </div>
                            <div className="col-lg-6 col-6">
                                <button type={"submit"} className={'btn btn-dark w-100'}>Сохранить</button>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </>}
        </Modal>
    )
}))


export default ALessonEditModal;
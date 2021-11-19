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
    const {register, handleSubmit, setValue, reset} = useForm();
    const alert = useAlert();
    const history = useHistory();

    useEffect(() => {
        console.log(alessonStore.lessonData)
        alessonStore.setResponse(undefined)
        reset()
        if (alessonStore.lessonType === 'lecture') {
            setValue('name', alessonStore.lessonData?.lecture?.name)
            setValue('video', alessonStore.lessonData?.lecture?.video)
            setValue('time', alessonStore.lessonData?.lecture?.time)
            setValue('description', alessonStore.lessonData?.lecture?.description)
            setValue('isOpen', alessonStore.lessonData?.lecture?.isOpen)
        } else if (alessonStore.lessonType === 'testPOL') {
            setValue('name', alessonStore.lessonData?.testPOL?.name)
            setValue('isOpen', alessonStore.lessonData?.testPOL?.isOpen)
        } else if (alessonStore.lessonType === 'testCHL') {
            setValue('name', alessonStore.lessonData?.testCHL?.name)
            setValue('isOpen', alessonStore.lessonData?.testCHL?.isOpen)
        } else if (alessonStore.lessonType === 'taskABC') {
            setValue('name', alessonStore.lessonData?.taskABC?.name)
            setValue('description', alessonStore.lessonData?.taskABC?.description)
            setValue('isOpen', alessonStore.lessonData?.taskABC?.isOpen)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alessonStore.lessonType, alessonStore.lessonData?.id])


    const onSubmitEdit = (data) => {
        alessonStore.setResponse({})
        let localData = {}
        localData[alessonStore.lessonType] = data
        alessonStore.loadLessonEdit(localData, acourseStore.courseID, asubCourseStore.subCourseID).then(() => {
            if (alessonStore.response?.status) {
                modalStore.ALessonEditModalClose()
                alert.success(alessonStore.response?.detail)
                asubCourseStore.loadSubCourseData(acourseStore.courseID, asubCourseStore.subCourseID)
            }
            // history.push(`/apanel/course${asubCourseStore.subCourseEditData?.courseID}/sub${asubCourseStore.subCourseEditData?.subCourseID}`)
        })
    }

    const onSubmitDelete = () => {
        alessonStore.setResponse({})
        let localData = {}
        localData[alessonStore.lessonType] = 'delete'
        alessonStore.loadLessonDelete(localData, acourseStore.courseID, asubCourseStore.subCourseID).then(() => {
            modalStore.ALessonEditModalClose()
            if (alessonStore.response?.status) {
                alert.success(alessonStore.response?.detail)
                asubCourseStore.loadSubCourseData(acourseStore.courseID, asubCourseStore.subCourseID)
                history.push(`/apanel/course${acourseStore.courseID}/sub${asubCourseStore.subCourseID}`)
            } else alert.error(alessonStore.response?.detail)
        })
    }

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
                        {alessonStore?.response && alessonStore?.response['error'] &&
                        <ErrorAlert error={alessonStore?.response['error']}/>}
                        <div className={"row"}>
                            <div className="col-lg-12 col-12 mb-3">
                                <div className="form-floating ">
                                    <input type={'text'} className={`form-control`}
                                           id={'name'} {...register('name')}
                                           required placeholder={'Название'}/>
                                    <label htmlFor={'name'}>Название</label>
                                </div>
                                {alessonStore?.response && alessonStore?.response['name'] &&
                                <p className={'custom-alert-danger-text'}>{alessonStore?.response['name']}</p>}
                            </div>
                            {(alessonStore.lessonType !== 'testPOL' && alessonStore.lessonType !== 'testCHL') &&
                            <div className="col-lg-12 col-12 mb-3">
                                <div className="form-floating ">
                                <textarea className={`form-control`}
                                          id={'description'} {...register('description')}
                                          placeholder={'Описание'} style={{height: '100px'}}/>
                                    <label htmlFor={'description'}>Описание</label>
                                </div>
                                {alessonStore?.response && alessonStore?.response['description'] &&
                                <p className={'custom-alert-danger-text'}>{alessonStore?.response['description']}</p>}
                            </div>}
                            {alessonStore.lessonType === 'lecture' &&
                            <div className="col-lg-12 col-12 mb-3">
                                <div className="form-floating ">
                                    <input className={`form-control`}
                                           id={'video'} {...register('video')}
                                           placeholder={'Youtube видео ID'}/>
                                    <label htmlFor={'video'}>Youtube видео ID</label>
                                </div>
                                {alessonStore?.response && alessonStore?.response['video'] &&
                                <p className={'custom-alert-danger-text'}>{alessonStore?.response['video']}</p>}
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
            </>}
        </Modal>
    )
}))


export default ALessonEditModal;
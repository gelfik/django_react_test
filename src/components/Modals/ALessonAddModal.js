import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import {FloatingLabel, Form} from "react-bootstrap";

const ALessonAddModal = inject('userStore', 'modalStore', 'acourseStore', 'asubCourseStore', 'alessonStore')(observer((stores) => {
    const {modalStore, acourseStore, asubCourseStore, alessonStore} = stores;
    const {register, handleSubmit, reset} = useForm();

    const history = useHistory();

    useEffect(() => {
        alessonStore.setErrorAdd(undefined)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.ALessonAddModalStatus])
    //
    const onSubmitAdd = (data) => {
        alessonStore.setlessonAddData({})
        alessonStore.loadLessonAdd(data, acourseStore.courseID, asubCourseStore.subCourseID).then(()=> {
            if (alessonStore.lessonAddData?.status) {
                modalStore.ALessonAddModalClose()
                reset()
                asubCourseStore.setSubCourseID(alessonStore.lessonAddData?.courseID, alessonStore.lessonAddData?.subCourseID, true)
                alessonStore.setLessonID(alessonStore.lessonAddData?.courseID, alessonStore.lessonAddData?.subCourseID, alessonStore.lessonAddData?.lessonID, true)
                history.push(`/apanel/course/${alessonStore.lessonAddData?.courseID}/sub/${alessonStore.lessonAddData?.subCourseID}/lesson/${alessonStore.lessonAddData?.lessonID}`)
            }
        })
    }

    return (
        <Modal show={modalStore.ALessonAddModalStatus} centered onHide={modalStore.ALessonAddModalClose}>
            <Modal.Header>
                <Modal.Title>Добавление урока</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.ALessonAddModalClose}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'} onSubmit={handleSubmit(onSubmitAdd)}>
                    {alessonStore?.errorsAdd && alessonStore?.errorsAdd['error'] &&
                    <ErrorAlert error={alessonStore?.errorsAdd['error']}/>}
                    <div className={"row"}>
                        <div className="col-lg-12 col-12 mb-3">
                            <FloatingLabel controlId="floatingSelectCourseName" label="Тип урока">
                                <Form.Select {...register("lessonType")} aria-label="Выберите тип">
                                    <option value={'video'}>Видео</option>
                                    <option value={'homework'}>Домашка</option>
                                    <option value={'files'}>Файл</option>
                                </Form.Select>
                            </FloatingLabel>
                            {alessonStore?.errorsAdd && alessonStore?.errorsAdd['lessonType'] &&
                            <p className={'custom-alert-danger-text'}>{alessonStore?.errorsAdd['lessonType']}</p>}
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className="col-lg-12 col-12 mb-3">
                            <div className="form-floating ">
                                <input type={'name'} className={`form-control`}
                                       id={'name'} {...register('name')}
                                       required placeholder={'Название'}/>
                                <label htmlFor={'name'}>Название</label>
                            </div>
                        </div>
                    </div>
                    <button type={"submit"} className={'btn btn-dark'}>Добавить</button>
                </form>
            </Modal.Body>
        </Modal>
    )
}))


export default ALessonAddModal;
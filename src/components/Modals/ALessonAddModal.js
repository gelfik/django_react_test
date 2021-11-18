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
        alessonStore.setResponse(undefined)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.ALessonAddModalStatus])
    //
    const onSubmitAdd = (data) => {
        alessonStore.setResponse({})
        alessonStore.loadLessonAdd(data, acourseStore.courseID, asubCourseStore.subCourseID).then(()=> {
            if (alessonStore.response?.status) {
                modalStore.ALessonAddModalClose()
                reset()
                asubCourseStore.setSubCourseID(alessonStore.response?.courseID, alessonStore.response?.subCourseID, true)
                alessonStore.setLessonID(alessonStore.response?.courseID, alessonStore.response?.subCourseID, alessonStore.response?.lessonID, true)
                history.push(`/apanel/course${alessonStore.response?.courseID}/sub${alessonStore.response?.subCourseID}/lesson${alessonStore.response?.lessonID}`)
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
                    {alessonStore?.response && alessonStore?.response['error'] &&
                    <ErrorAlert error={alessonStore?.response['error']}/>}
                    <div className={"row"}>
                        <div className="col-lg-12 col-12 mb-3">
                            <FloatingLabel controlId="floatingSelectCourseName" label="Тип урока">
                                <Form.Select {...register("lessonType")} aria-label="Выберите тип">
                                    <option value={'lecture'}>Лекция</option>
                                    <option value={'testPOL'}>Тест на полноту</option>
                                    <option value={'testCHL'}>Тест на целостность</option>
                                    <option value={'taskABC'}>Задание</option>
                                </Form.Select>
                            </FloatingLabel>
                            {alessonStore?.response && alessonStore?.response['lessonType'] &&
                            <p className={'custom-alert-danger-text'}>{alessonStore?.response['lessonType']}</p>}
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
                    <div className={"row"}>
                        <div className="col-lg-12 col-12 mb-3">
                            <div className="form-floating ">
                                <input type={'time'} className={`form-control`}
                                       id={'time'} {...register('time')}
                                       required placeholder={'Время начала'}/>
                                <label htmlFor={'time'}>Время начала</label>
                            </div>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className="col-lg-12 col-12 mb-3">
                            <div className="form-floating ">
                                <input type={'description'} className={`form-control`}
                                       id={'description'} {...register('description')}
                                       required placeholder={'Описание'}/>
                                <label htmlFor={'name'}>Описание</label>
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
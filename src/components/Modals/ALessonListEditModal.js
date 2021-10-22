import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import {useAlert} from "react-alert";
import Moment from "moment";

const ALessonListEditModal = inject('userStore', 'modalStore', 'acourseStore' ,'asubCourseStore', 'alessonStore')(observer((stores) => {
    const {modalStore, acourseStore, asubCourseStore, alessonStore} = stores;
    const {register, handleSubmit, reset, setValue} = useForm();
    const alert = useAlert();

    const history = useHistory();

    useEffect(() => {
        alessonStore.setErrorEdit(undefined)
        asubCourseStore.subCourseData?.lessons?.filter(function (item) {
            if (item.id === alessonStore.lessonListID) setValue('lessonDate', Moment(item?.lessonDate, "DD.MM.YYYY H:m").format('YYYY-MM-DDTHH:mm') )
        })
        // setValue('lessonDate', asubCourseStore.lessonListAddData?.lessonDate)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.ALessonListEditModalStatus])

    const onSubmitEdit = (data) => {
        console.log(data)
        alessonStore.setLessonListEditData({})
        alessonStore.loadLessonListEdit(data, acourseStore.courseID, asubCourseStore.subCourseID).then(()=> {
            if (alessonStore.lessonListEditData?.status) {
                modalStore.ALessonListEditModalClose()
                alert.success(alessonStore.lessonListEditData?.detail)
            }
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
                                       required placeholder={'Дата начала'} min={`${asubCourseStore.subCourseData?.startDate}T00:00`} max={`${asubCourseStore.subCourseData?.endDate}T23:59`}/>
                                <label htmlFor={'lessonDate'}>Дата начала</label>
                            </div>
                            {alessonStore?.errorsEdit && alessonStore?.errorsEdit['lessonDate'] &&
                            <p className={'custom-alert-danger-text'}>{alessonStore?.errorsEdit['lessonDate']}</p>}
                        </div>
                    </div>
                    <button type={"submit"} className={'btn btn-dark'}>Сохранить</button>
                </form>
            </Modal.Body>
        </Modal>
    )
}))


export default ALessonListEditModal;
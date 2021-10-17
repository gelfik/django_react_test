import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";

const CourseAddModal = inject('userStore', 'modalStore', 'acoursesListStore', 'acourseStore')(observer((stores) => {
    const {modalStore, acoursesListStore, acourseStore} = stores;

    const {register, handleSubmit, setValue} = useForm();
    const history = useHistory();

    const onSubmitAdd = (data) => {
        acoursesListStore.setCourseAddData({})
        acoursesListStore.loadCourseAdd(data).then(() => {
            if (acoursesListStore.courseAddData?.status) {
                modalStore.CourseAddModalClose()
                history.push(`/apanel/course/${acoursesListStore.courseAddData?.id}`)
            }
        })
    }

    useEffect(() => {
        acoursesListStore.setErrorAdd(undefined)
        setValue('name', acourseStore.courseData?.name)
        setValue('shortDescription', acourseStore.courseData?.shortDescription)
        setValue('description', acourseStore.courseData?.description)
        setValue('predmet', getActiveSelect('predmet', acourseStore.courseData?.predmet))
        setValue('courseType', getActiveSelect('courseType', acourseStore.courseData?.courseType))
        setValue('examType', getActiveSelect('examType', acourseStore.courseData?.examType))
        setValue('price', acourseStore.courseData?.price)
        setValue('discountDuration', acourseStore.courseData?.discountDuration)
        setValue('buyAllSubCourses', acourseStore.courseData?.buyAllSubCourses)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.ACourseEditModalStatus])


    const getActiveSelect = (dataType, name) => {
        let pereq = undefined
        // eslint-disable-next-line
        acoursesListStore?.filterData[dataType]?.filter(function(item){
            if (item.name === name) pereq = item.id
        })
        if (typeof pereq !== undefined) return pereq
    }

    const getItemCourseName = () => {
        return acoursesListStore?.filterData?.courseType?.map((item, i) =>
            <option key={i} value={item.id}>{item.name}</option>
        )
    }

    const getItemPredmet = () => {
        return acoursesListStore?.filterData?.predmet?.map((item, i) =>
            <option key={i} value={item.id}>{item.name}</option>
        )
    }

    const getItemExameType = () => {
        return acoursesListStore?.filterData?.examType?.map((item, i) =>
            <option key={i} value={item.id}>{item.name}</option>
        )
    }


    const addForm = () => {
        return <Modal show={modalStore.ACourseEditModalStatus} centered onHide={modalStore.ACourseEditModalClose}>
            <Modal.Header>
                <Modal.Title>Редактирование курса</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.ACourseEditModalClose}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'} onSubmit={handleSubmit(onSubmitAdd)}>

                    <div className="col-lg-12 col-12 mb-3">
                        <div className="form-floating ">
                            <input type={'text'} className={`form-control`}
                                   id={'name'} {...register('name')}
                                   required placeholder={'Название'}/>
                            <label htmlFor={'name'}>Название</label>
                        </div>
                        {acoursesListStore?.errorsAdd && acoursesListStore?.errorsAdd['name'] &&
                        <p className={'custom-alert-danger-text'}>{acoursesListStore?.errorsAdd['name']}</p>}
                    </div>

                    <div className="col-lg-12 col-12 mb-3">
                        <div className="form-floating ">
                            <textarea style={{height: '100px'}} className={`form-control`}
                                      id={'shortDescription'} {...register('shortDescription')}
                                      required placeholder={'Краткое описание'}/>
                            <label htmlFor={'shortDescription'}>Краткое описание</label>
                        </div>
                        {acoursesListStore?.errorsAdd && acoursesListStore?.errorsAdd['shortDescription'] &&
                        <p className={'custom-alert-danger-text'}>{acoursesListStore?.errorsAdd['shortDescription']}</p>}
                    </div>

                    <div className="col-lg-12 col-12 mb-3">
                        <div className="form-floating ">
                            <textarea style={{height: '100px'}} className={`form-control`}
                                      id={'description'} {...register('description')}
                                      required placeholder={'Полное описание'}/>
                            <label htmlFor={'description'}>Полное описание</label>
                        </div>
                        {acoursesListStore?.errorsAdd && acoursesListStore?.errorsAdd['description'] &&
                        <p className={'custom-alert-danger-text'}>{acoursesListStore?.errorsAdd['description']}</p>}
                    </div>

                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <select className="form-select" id={'predmet'}
                                        required placeholder={'Предмет'} {...register('predmet')}>
                                    {getItemPredmet()}
                                </select>
                                <label htmlFor={'predmet'}>Предмет</label>
                            </div>
                            {acoursesListStore?.errorsAdd && acoursesListStore?.errorsAdd['predmet'] &&
                            <p className={'custom-alert-danger-text'}>{acoursesListStore?.errorsAdd['predmet']}</p>}
                        </div>

                        <div className="col-md">
                            <div className="form-floating">
                                <select className="form-select" id={'courseType'}
                                        required placeholder={'Курс'} {...register('courseType')}>
                                    {getItemCourseName()}
                                </select>
                                <label htmlFor={'courseType'}>Курс</label>
                            </div>
                            {acoursesListStore?.errorsAdd && acoursesListStore?.errorsAdd['courseType'] &&
                            <p className={'custom-alert-danger-text'}>{acoursesListStore?.errorsAdd['courseType']}</p>}
                        </div>

                        <div className="col-md">
                            <div className="form-floating">
                                <select className="form-select" id={'courseExamType'}
                                        required placeholder={'Экзамен'} {...register('courseExamType')}>
                                    {getItemExameType()}
                                </select>
                                <label htmlFor={'courseExamType'}>Экзамен</label>
                            </div>
                            {acoursesListStore?.errorsAdd && acoursesListStore?.errorsAdd['courseExamType'] &&
                            <p className={'custom-alert-danger-text'}>{acoursesListStore?.errorsAdd['courseExamType']}</p>}
                        </div>
                    </div>

                    {/*<div className="mb-3 input-group">*/}
                    {/*    <label htmlFor={'coursePicture'} className={'input-group-text'}>Картинка курса</label>*/}

                    {/*    <input type={'file'} className={`form-control`} accept=".png,.jpg,.jpeg" required ref={register} multiple={false}*/}
                    {/*           id={'coursePicture'} {...register('coursePicture')} />*/}

                    {/*    {acoursesStore?.errorsAdd && acoursesStore?.errorsAdd['coursePicture'] &&*/}
                    {/*    <p className={'custom-alert-danger-text'}>{acoursesStore?.errorsAdd['coursePicture']}</p>}*/}
                    {/*</div>*/}

                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating ">
                                <input type={'number'} className={`form-control`}
                                       id={'price'} {...register('price')}
                                       required placeholder={'Цена за месяц'}/>
                                <label htmlFor={'price'}>Цена за месяц</label>
                            </div>
                            {acoursesListStore?.errorsAdd && acoursesListStore?.errorsAdd['price'] &&
                            <p className={'custom-alert-danger-text'}>{acoursesListStore?.errorsAdd['price']}</p>}
                        </div>

                        <div className="col-md">
                            <div className="form-floating ">
                                <input type={'number'} className={`form-control`}
                                       id={'discountDuration'} {...register('discountDuration')}
                                       required placeholder={'Скидка в % за весь курс'}/>
                                <label htmlFor={'discountDuration'}>Скидка в % за весь курс</label>
                            </div>
                            {acoursesListStore?.errorsAdd && acoursesListStore?.errorsAdd['discountDuration'] &&
                            <p className={'custom-alert-danger-text'}>{acoursesListStore?.errorsAdd['discountDuration']}</p>}
                        </div>
                    </div>

                    <div className="col-lg-12 col-12 mb-3">
                        <div className="form-check">
                            <input type={'checkbox'} className={`form-check-input`}
                                   id={'buyAllSubCourses'} {...register('buyAllSubCourses')}
                                   placeholder={'Покупка всего курса'}/>
                            <label className={'form-check-label'} htmlFor={'buyAllSubCourses'}>Покупка всего
                                курса</label>
                        </div>
                        {acoursesListStore?.errorsAdd && acoursesListStore?.errorsAdd['buyAllSubCourses'] &&
                        <p className={'custom-alert-danger-text'}>{acoursesListStore?.errorsAdd['buyAllSubCourses']}</p>}
                    </div>


                    <button type={"submit"} className={'btn btn-dark'}>Добавить</button>

                    {/*<AddFormInput labelText={'Название'} fieldName={'name'} valuesAdd={register}/>*/}
                    {/*/!*<AddFormInput labelText={'Название'} fieldName={'name'} valuesAdd={register}/>*!/*/}
                    {/*<AddFormInput type={'file'} labelText={'Картинка курса'} fieldName={'coursePicture'}*/}
                    {/*              valuesAdd={register}/>*/}
                </form>
            </Modal.Body>
        </Modal>
    }

    return (
        <>{addForm()}</>
    )
}))

export default CourseAddModal;
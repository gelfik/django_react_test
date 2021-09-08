import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";

const CourseAddModal = inject('userStore', 'modalStore', 'acoursesStore')(observer((stores) => {
    const {modalStore, acoursesStore} = stores;

    const {register, handleSubmit} = useForm();
    const history = useHistory();

    const onSubmitAdd = (data) => {
        acoursesStore.loadCourseAdd(data).then(()=> {
            if (acoursesStore.courseAddData?.status) {
                modalStore.CourseAddModalClose()
                history.push(`/apanel/courses/${acoursesStore.courseAddData?.id}`)
            }
        })
    }

    useEffect(() => {
        acoursesStore.setErrorAdd(undefined)
        acoursesStore.setCourseAddData({})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [acoursesStore])


    const getItemCourseName = () => {
        return acoursesStore?.filterData?.courseType?.map((item, i) =>
            <option key={i} value={item.id}>{item.name}</option>
        )
    }

    const getItemPredmet = () => {
        return acoursesStore?.filterData?.predmet?.map((item, i) =>
            <option key={i} value={item.id}>{item.name}</option>
        )
    }

    const getItemExameType = () => {
        return acoursesStore?.filterData?.examType?.map((item, i) =>
            <option key={i} value={item.id}>{item.name}</option>
        )
    }


    const addForm = () => {
        return <Modal show={modalStore.CourseAddModalStatus} centered onHide={modalStore.CourseAddModalClose}>
            <Modal.Header>
                <Modal.Title>Добавление курса</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.CourseAddModalClose}/>
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
                        {acoursesStore?.errorsAdd && acoursesStore?.errorsAdd['name'] &&
                        <p className={'custom-alert-danger-text'}>{acoursesStore?.errorsAdd['name']}</p>}
                    </div>

                    <div className="col-lg-12 col-12 mb-3">
                        <div className="form-floating ">
                            <textarea style={{height: '100px'}} className={`form-control`}
                                      id={'shortDescription'} {...register('shortDescription')}
                                      required placeholder={'Краткое описание'}/>
                            <label htmlFor={'shortDescription'}>Краткое описание</label>
                        </div>
                        {acoursesStore?.errorsAdd && acoursesStore?.errorsAdd['shortDescription'] &&
                        <p className={'custom-alert-danger-text'}>{acoursesStore?.errorsAdd['shortDescription']}</p>}
                    </div>

                    <div className="col-lg-12 col-12 mb-3">
                        <div className="form-floating ">
                            <textarea style={{height: '100px'}} className={`form-control`}
                                      id={'description'} {...register('description')}
                                      required placeholder={'Полное описание'}/>
                            <label htmlFor={'description'}>Полное описание</label>
                        </div>
                        {acoursesStore?.errorsAdd && acoursesStore?.errorsAdd['description'] &&
                        <p className={'custom-alert-danger-text'}>{acoursesStore?.errorsAdd['description']}</p>}
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
                            {acoursesStore?.errorsAdd && acoursesStore?.errorsAdd['predmet'] &&
                            <p className={'custom-alert-danger-text'}>{acoursesStore?.errorsAdd['predmet']}</p>}
                        </div>

                        <div className="col-md">
                            <div className="form-floating">
                                <select className="form-select" id={'courseType'}
                                         required placeholder={'Курс'} {...register('courseType')}>
                                    {getItemCourseName()}
                                </select>
                                <label htmlFor={'courseType'}>Курс</label>
                            </div>
                            {acoursesStore?.errorsAdd && acoursesStore?.errorsAdd['courseType'] &&
                            <p className={'custom-alert-danger-text'}>{acoursesStore?.errorsAdd['courseType']}</p>}
                        </div>

                        <div className="col-md">
                            <div className="form-floating">
                                <select className="form-select" id={'courseExamType'}
                                        required placeholder={'Экзамен'} {...register('courseExamType')}>
                                    {getItemExameType()}
                                </select>
                                <label htmlFor={'courseExamType'}>Экзамен</label>
                            </div>
                            {acoursesStore?.errorsAdd && acoursesStore?.errorsAdd['courseExamType'] &&
                            <p className={'custom-alert-danger-text'}>{acoursesStore?.errorsAdd['courseExamType']}</p>}
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
                            {acoursesStore?.errorsAdd && acoursesStore?.errorsAdd['price'] &&
                            <p className={'custom-alert-danger-text'}>{acoursesStore?.errorsAdd['price']}</p>}
                        </div>

                        <div className="col-md">
                            <div className="form-floating ">
                                <input type={'number'} className={`form-control`}
                                       id={'discountDuration'} {...register('discountDuration')}
                                       required placeholder={'Скидка в % за весь курс'}/>
                                <label htmlFor={'discountDuration'}>Скидка в % за весь курс</label>
                            </div>
                            {acoursesStore?.errorsAdd && acoursesStore?.errorsAdd['discountDuration'] &&
                            <p className={'custom-alert-danger-text'}>{acoursesStore?.errorsAdd['discountDuration']}</p>}
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
                            {acoursesStore?.errorsAdd && acoursesStore?.errorsAdd['buyAllSubCourses'] &&
                            <p className={'custom-alert-danger-text'}>{acoursesStore?.errorsAdd['buyAllSubCourses']}</p>}
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
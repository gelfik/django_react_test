import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useForm, useFieldArray} from "react-hook-form";
import {FloatingLabel, Form} from "react-bootstrap";
import ErrorAlert from "../ErrorAlert";
import {useAlert} from "react-alert";

const ATestAskAddModal = inject('userStore', 'modalStore', 'acourseStore', 'asubCourseStore', 'alessonStore', 'atestStore')(observer((stores) => {
    const {modalStore, atestStore, acourseStore, asubCourseStore, alessonStore} = stores;
    const {register, control, setValue, reset, handleSubmit} = useForm({defaultValues: {answerData: []}});
    const {fields, append, remove} = useFieldArray({control, name: "answerData"});
    const alert = useAlert();

    useEffect(() => {
        if (modalStore.ATestAskAddModalStatus) {
            atestStore.setAskType(undefined)
            atestStore.setResponse({})
            reset()
            //  asubCourseStore.setErrorAdd(undefined)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.ATestAskAddModalStatus])

    useEffect(() => {
        reset()
        setValue('askType', atestStore.askType)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [atestStore.askType])
    //
    const onSubmitAdd = (data) => {
        atestStore.setResponse({})
        let askValidStatus = true
        if (data['askType'] === 'select') {
            if (data.answerData.length === 0) {
                atestStore.setResponse({error: 'Вы не добавили ответы!'})
                askValidStatus = false
            } else {
                let askAnswerStatus = true
                for (let value of data?.answerData) {
                    if (value?.validStatus === true) {
                        askAnswerStatus = false
                    }
                }
                if (askAnswerStatus) {
                    atestStore.setResponse({error: 'Вы не выбрали ни одного верного ответа!'})
                }
            }
        }
        if (askValidStatus) {
            data['testType'] = alessonStore.lessonType
            atestStore.loadAskAdd(data, acourseStore.courseID, asubCourseStore.subCourseID, alessonStore.lessonID).then(r => {
                if (atestStore.response?.status) {
                    alessonStore.loadLessonData(acourseStore.courseID, asubCourseStore.subCourseID, alessonStore.lessonID)
                    alert.success(alessonStore.response?.detail)
                    modalStore.ATestAskAddModalClose()
                }
            })
        }
    }

    const getAnswerData = () => {
        return fields.map((item, index) => {
            return (<div className={"row mb-3"} key={item.id}>
                <hr/>
                <div className="col-lg-10 col-10">
                    <div className={"row"}>
                        <div className="col-lg-12 col-12">
                            <FloatingLabel controlId={`floating${index}.answer`} label="Ответ">
                                <Form.Control required type={"text"} {...register(`answerData.${index}.answer`)}
                                              aria-label="Ответ" placeholder="Ответ" control={control}/>
                            </FloatingLabel>
                            {atestStore?.response && atestStore?.response[`answerData.${index}.answer`] &&
                            <p className={'custom-alert-danger-text'}>{atestStore?.response[`answerData.${index}.answer`]}</p>}
                        </div>
                        <div className="col-lg-12 col-12">
                            <Form.Check id={`answerData.${index}.validStatus`} label={`Верный ответ?`}>
                                <Form.Check.Input type={'checkbox'} {...register(`answerData.${index}.validStatus`)}/>
                                <Form.Check.Label style={{cursor: 'pointer'}}>Верный ответ?</Form.Check.Label>
                            </Form.Check>
                            {atestStore?.response && atestStore?.response[`answerData.${index}.validStatus`] &&
                            <p className={'custom-alert-danger-text'}>{atestStore?.response[`answerData.${index}.validStatus`]}</p>}
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-2" style={{display: 'flex', alignItems: 'center'}}>
                    <svg aria-hidden="true" height="40" width="40" onClick={() => remove(index)}
                         style={{cursor: 'pointer'}}>
                        <use xlinkHref={'#icon-delete'}/>
                    </svg>
                    {/*<button type="button" onClick={() => remove(index)}>*/}
                    {/*    -*/}
                    {/*</button>*/}
                </div>
            </div>);
        })
    }

    return (
        <Modal show={modalStore.ATestAskAddModalStatus} centered onHide={modalStore.ATestAskAddModalClose}>
            <Modal.Header>
                <Modal.Title>Добавление вопроса</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.ATestAskAddModalClose}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'} onSubmit={handleSubmit(onSubmitAdd)}>
                    {atestStore?.response && atestStore?.response['error'] &&
                    <ErrorAlert error={atestStore?.response['error']}/>}
                    <div className={"row"}>
                        <div className="col-lg-12 col-12 mb-3">
                            <FloatingLabel controlId="floatingSelectAskType" label="Тип вопроса">
                                <Form.Select defaultValue={''} aria-label="Выберите тип" {...register("askType")}
                                             onChange={(e) => {
                                                 atestStore.setAskType(e.target.value)
                                             }}>
                                    <option value={''} disabled>Выберите тип вопроса</option>
                                    <option value={'input'}>С вводом ответа</option>
                                    <option value={'select'}>С выбором ответа</option>
                                </Form.Select>
                            </FloatingLabel>
                            {atestStore?.response && atestStore?.response['askType'] &&
                            <p className={'custom-alert-danger-text'}>{atestStore?.response['askType']}</p>}
                        </div>
                    </div>
                    {atestStore.askType && <>
                        <div className={"row mb-3"}>
                            <div className="col-lg-12 col-12">
                                <FloatingLabel controlId="floatingAskInput" label="Вопрос">
                                    <Form.Control required type={"text"} {...register("ask")}
                                                  aria-label="Введите вопрос"
                                                  placeholder="Введите вопрос"/>
                                </FloatingLabel>
                                {atestStore?.response && atestStore?.response['ask'] &&
                                <p className={'custom-alert-danger-text'}>{atestStore?.response['ask']}</p>}
                            </div>
                        </div>
                        {/*<div className={"row mb-3"}>*/}
                        {/*    <div className="col-lg-12 col-12">*/}
                        {/*        <Form.Group controlId="floatingAskPicture">*/}
                        {/*            <Form.Label>Картинка к вопросу</Form.Label>*/}
                        {/*            <Form.Control type="file" accept=".png,.jpg,.jpeg" {...register("askPicture")}/>*/}
                        {/*        </Form.Group>*/}
                        {/*        {atestStore?.response && atestStore?.response['askPicture'] &&*/}
                        {/*        <p className={'custom-alert-danger-text'}>{atestStore?.response['askPicture']}</p>}*/}
                        {/*        /!*<FloatingLabel controlId="floatingAskPicture" label="Картинка к вопросу">*!/*/}
                        {/*        /!*    <Form.Control type={"file"} {...register("askPicture")}*!/*/}
                        {/*        /!*                  aria-label="Картинка к вопросу"*!/*/}
                        {/*        /!*                  placeholder="Картинка к вопросу"/>*!/*/}
                        {/*        /!*</FloatingLabel>*!/*/}
                        {/*        {atestStore?.response && atestStore?.response['ask'] &&*/}
                        {/*        <p className={'custom-alert-danger-text'}>{atestStore?.response['ask']}</p>}*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {atestStore.askType === "input" && <>
                            <div className={"row mb-3"}>
                                <div className="col-lg-12 col-12">
                                    <FloatingLabel controlId="floatingAnswerInput" label="Ответ">
                                        <Form.Control required type={"text"}
                                                      aria-label="Введите ответ" {...register("answer")}
                                                      placeholder="Введите ответ"/>
                                    </FloatingLabel>
                                    {atestStore?.response && atestStore?.response['answer'] &&
                                    <p className={'custom-alert-danger-text'}>{atestStore?.response['answer']}</p>}
                                </div>
                            </div>
                            <button type={"submit"} className={'btn btn-dark'}>Добавить</button>
                        </>}
                        {atestStore.askType === "select" && <>
                            {getAnswerData()}
                            <button className={'btn btn-dark mb-3'}
                                    type="button"
                                    onClick={() => {
                                        append({answer: "", validStatus: false});
                                    }}>
                                Добавить вариант ответа
                            </button>
                            <button type={"submit"} className={'btn btn-dark'}>Добавить</button>
                        </>}
                    </>}
                </form>
            </Modal.Body>
        </Modal>
    )
}))


export default ATestAskAddModal;
import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useForm, useFieldArray} from "react-hook-form";
import {FloatingLabel, Form} from "react-bootstrap";
import ErrorAlert from "../ErrorAlert";
import {useAlert} from "react-alert";

const ATestAskEditModal = inject('userStore', 'modalStore', 'acourseStore', 'asubCourseStore', 'alessonStore', 'atestStore')(observer((stores) => {
    const {modalStore, atestStore, acourseStore, asubCourseStore, alessonStore} = stores;
    const {register, control, setValue, reset, handleSubmit} = useForm({defaultValues: {answerList: []}});
    const {fields, append, remove} = useFieldArray({control, name: "answerList"});
    const alert = useAlert();

    useEffect(() => {
        if (modalStore.ATestAskEditModalStatus) {
            atestStore.setAsk(alessonStore.getTest()?.askList)
            reset()
            setValue('ask', atestStore.ask?.ask)
            if (atestStore.ask?.answerInput) {
                atestStore.setAskType('input')
                setValue('answerInput', atestStore.ask?.answerInput)
            } else {
                append(atestStore.ask?.answerList)
                atestStore.setAskType('select')
            }
            setValue('askType', atestStore.askType)
            atestStore.setResponse({})


            //  asubCourseStore.setErrorAdd(undefined)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.ATestAskEditModalStatus])

    // useEffect(() => {
    //     reset()
    //     setValue('askType', atestStore.homeworkAddType)
    //
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [atestStore.homeworkAddType])
    //
    const onSubmitAdd = (data) => {
        atestStore.setResponse({})
        let askValidStatus = true
        if (data['askType'] === 'select') {
            if (data.answerList.length === 0) {
                atestStore.setResponse({error: 'Вы не добавили ответы!'})
                askValidStatus = false
            } else {
                let askAnswerStatus = true
                for (let value of data?.answerList) {
                    if (value?.validStatus === true) {
                        askAnswerStatus = false
                    }
                }
                if (askAnswerStatus) {
                    atestStore.setResponse({error: 'Вы не выбрали ни одного верного ответа!'})
                    askAnswerStatus = false
                }
            }
        }
        if (askValidStatus) {
            atestStore.loadAskEdit(data, acourseStore.courseID, asubCourseStore.subCourseID, alessonStore.lessonID, atestStore.ask?.id).then(r => {
                if (atestStore.response?.status) {
                    alessonStore.loadLessonData(acourseStore.courseID, asubCourseStore.subCourseID, alessonStore.lessonID)
                    alert.success(alessonStore.response?.detail)
                    modalStore.ATestAskEditModalClose()
                }
            })
        }
    }

    const onSubmitDelete = () => {
        atestStore.loadAskDelete(acourseStore.courseID, asubCourseStore.subCourseID, alessonStore.lessonID, atestStore.ask?.id).then(() => {
            alessonStore.loadLessonData(acourseStore.courseID, asubCourseStore.subCourseID, alessonStore.lessonID)
            modalStore.ATestAskEditModalClose()
            if (atestStore.response?.status) {
                alert.success(atestStore.response?.detail)
            } else alert.error(atestStore.response?.detail)
        })
    }

    const getAnswerData = () => {
        return fields.map((item, index) => {
            return (<div className={"row mb-3"} key={index}>
                <hr/>
                <div className="col-lg-10 col-10">
                    <div className={"row"}>
                        <div className="col-lg-12 col-12">
                            <FloatingLabel controlId={`floating${index}.answer`} label="Ответ">
                                <Form.Control required type={"text"} {...register(`answerList.${index}.answer`)}
                                              aria-label="Ответ" placeholder="Ответ" control={control}/>
                            </FloatingLabel>
                            {atestStore?.response && atestStore?.response[`answerList.${index}.answer`] &&
                            <p className={'custom-alert-danger-text'}>{atestStore?.response[`answerList.${index}.answer`]}</p>}
                        </div>
                        <div className="col-lg-12 col-12">
                            <Form.Check id={`answerData.${index}.validStatus`} label={`Верный ответ?`}>
                                <Form.Check.Input type={'checkbox'} {...register(`answerList.${index}.validStatus`)}/>
                                <Form.Check.Label style={{cursor: 'pointer'}}>Верный ответ?</Form.Check.Label>
                            </Form.Check>
                            {atestStore?.response && atestStore?.response[`answerList.${index}.validStatus`] &&
                            <p className={'custom-alert-danger-text'}>{atestStore?.response[`answerList.${index}.validStatus`]}</p>}
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
        <Modal show={modalStore.ATestAskEditModalStatus} centered onHide={modalStore.ATestAskEditModalClose}>
            <Modal.Header>
                <Modal.Title>Редактирование вопроса</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.ATestAskEditModalClose}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'} onSubmit={handleSubmit(onSubmitAdd)}>
                    {atestStore?.response && atestStore?.response['error'] &&
                    <ErrorAlert error={atestStore?.response['error']}/>}
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
                                                      aria-label="Введите ответ" {...register("answerInput")}
                                                      placeholder="Введите ответ"/>
                                    </FloatingLabel>
                                    {atestStore?.response && atestStore?.response['answerInput'] &&
                                    <p className={'custom-alert-danger-text'}>{atestStore?.response['answerInput']}</p>}
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


                        </>}
                    </>}
                </form>
            </Modal.Body>
        </Modal>
    )
}))


export default ATestAskEditModal;
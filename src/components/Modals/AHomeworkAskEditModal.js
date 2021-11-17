import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useForm, useFieldArray} from "react-hook-form";
import {FloatingLabel, Form} from "react-bootstrap";
import ErrorAlert from "../ErrorAlert";
import {useAlert} from "react-alert";

const AHomeworkAskEditModal = inject('userStore', 'modalStore', 'acourseStore', 'asubCourseStore', 'alessonStore', 'ahomeworkStore', 'aCoursePageStore')(observer((stores) => {
    const {modalStore, ahomeworkStore, acourseStore, asubCourseStore, alessonStore, aCoursePageStore} = stores;
    const {register, control, getValues, setValue, reset, handleSubmit} = useForm({defaultValues: {answerData: []}});
    const {fields, append, remove} = useFieldArray({control, name: "answerData"});
    const alert = useAlert();

    useEffect(() => {
        if (modalStore.AHomeworkAskEditModalStatus) {
            ahomeworkStore.setHomeworkData(alessonStore.lessonData?.homework?.askList, aCoursePageStore.askActive)
            reset()
            setValue('ask', ahomeworkStore.homeworkData?.ask)
            if (ahomeworkStore.homeworkData?.answerInput) {
                ahomeworkStore.setHomeworkAddType('input')
                setValue('answer', ahomeworkStore.homeworkData?.answerInput)
                setValue('a', ahomeworkStore.homeworkData?.a)
                setValue('b', ahomeworkStore.homeworkData?.b)
                setValue('c', ahomeworkStore.homeworkData?.c)
                ahomeworkStore.setAbcSum(Number(ahomeworkStore.homeworkData?.a) + Number(ahomeworkStore.homeworkData?.b) + Number(ahomeworkStore.homeworkData?.c))
            } else {
                append(ahomeworkStore.homeworkData.answerList)
                setValue('pol', ahomeworkStore.homeworkData?.pol)
                setValue('chl', ahomeworkStore.homeworkData?.chl)
                ahomeworkStore.setHomeworkAddType('select')
            }
            setValue('askType', ahomeworkStore.homeworkAddType)
            ahomeworkStore.setDetailData(undefined)
            console.log(getValues())


            //  asubCourseStore.setErrorAdd(undefined)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.AHomeworkAskEditModalStatus])

    // useEffect(() => {
    //     reset()
    //     setValue('askType', ahomeworkStore.homeworkAddType)
    //
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [ahomeworkStore.homeworkAddType])
    //
    const onSubmitAdd = (data) => {
        ahomeworkStore.setDetailData(undefined)
        let askValidStatus = true
        if (data['askType'] === 'select') {
            if (data.answerData.length === 0) {
                ahomeworkStore.setDetailData({error: 'Вы не добавили ответы!'})
                askValidStatus = false
            } else {
                let askAnswerStatus = true
                for (let value of data?.answerData) {
                    if (value?.validStatus === true) {
                        askAnswerStatus = false
                    }
                }
                if (askAnswerStatus) {
                    ahomeworkStore.setDetailData({error: 'Вы не выбрали ни одного верного ответа!'})
                    askAnswerStatus = false
                }
            }
        }
        if (askValidStatus) {
            ahomeworkStore.loadHomeworkEdit(data, acourseStore.courseID, asubCourseStore.subCourseID, alessonStore.lessonID, ahomeworkStore.homeworkData?.id).then(r => {
                if (ahomeworkStore.detailData?.status) {
                    alessonStore.loadLessonData(acourseStore.courseID, asubCourseStore.subCourseID, alessonStore.lessonID)
                    alert.success(alessonStore.detailData?.detail)
                    modalStore.AHomeworkAskEditModalClose()
                }
            })
        }
    }

    const onSubmitDelete = () => {
        ahomeworkStore.loadHomeworkDelete(acourseStore.courseID, asubCourseStore.subCourseID, alessonStore.lessonID, ahomeworkStore.homeworkData?.id).then(() => {
            alessonStore.loadLessonData(acourseStore.courseID, asubCourseStore.subCourseID, alessonStore.lessonID)
            modalStore.AHomeworkAskEditModalClose()
            if (ahomeworkStore.detailData?.status) {
                alert.success(ahomeworkStore.detailData?.detail)
            } else alert.error(ahomeworkStore.detailData?.detail)
        })
    }

    const InputMinMax = (e) => {
        if (e.target.value < 0) e.target.value = 0;
        if (e.target.value > 100) e.target.value = 100;
        if (e.target.name === 'pol' || e.target.name === 'chl') return null
        let sum = 0, abcArray = [], checkBool = false
        for (let value of ['a', 'b', 'c']) {
            if (e.target.name !== value) {
                sum += Number(getValues(value))
                abcArray.push(value)
            }
        }
        if ((Number(getValues(abcArray[0])) !== 0 && Number(getValues(abcArray[1])) !== 0) && ((Number(getValues(abcArray[0])) + Number(getValues(abcArray[1])) + Number(e.target.value)) >= 100)) {
            checkBool = true
        }
        if (checkBool) setValue(`${e.target.name}`, 100 - sum)
        ahomeworkStore.setAbcSum((Number(getValues(abcArray[0])) + Number(getValues(abcArray[1])) + Number(e.target.value)))
    }

    const getAnswerData = () => {
        return fields.map((item, index) => {
            return (<div className={"row mb-3"} key={index}>
                <hr/>
                <div className="col-lg-10 col-10">
                    <div className={"row"}>
                        <div className="col-lg-12 col-12">
                            <FloatingLabel controlId={`floating${index}.answer`} label="Ответ">
                                <Form.Control required type={"text"} {...register(`answerData.${index}.answer`)}
                                              aria-label="Ответ" placeholder="Ответ" control={control}/>
                            </FloatingLabel>
                            {ahomeworkStore?.detailData && ahomeworkStore?.detailData[`answerData.${index}.answer`] &&
                            <p className={'custom-alert-danger-text'}>{ahomeworkStore?.detailData[`answerData.${index}.answer`]}</p>}
                        </div>
                        <div className="col-lg-12 col-12">
                            <Form.Check id={`answerData.${index}.validStatus`} label={`Верный ответ?`}>
                                <Form.Check.Input type={'checkbox'} {...register(`answerData.${index}.validStatus`)}/>
                                <Form.Check.Label style={{cursor: 'pointer'}}>Верный ответ?</Form.Check.Label>
                            </Form.Check>
                            {ahomeworkStore?.detailData && ahomeworkStore?.detailData[`answerData.${index}.validStatus`] &&
                            <p className={'custom-alert-danger-text'}>{ahomeworkStore?.detailData[`answerData.${index}.validStatus`]}</p>}
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
        <Modal show={modalStore.AHomeworkAskEditModalStatus} centered onHide={modalStore.AHomeworkAskEditModalClose}>
            <Modal.Header>
                <Modal.Title>Редактирование вопроса</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.AHomeworkAskEditModalClose}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'} onSubmit={handleSubmit(onSubmitAdd)}>
                    {ahomeworkStore?.detailData && ahomeworkStore?.detailData['error'] &&
                    <ErrorAlert error={ahomeworkStore?.detailData['error']}/>}
                    {ahomeworkStore.homeworkAddType && <>
                        <div className={"row mb-3"}>
                            <div className="col-lg-12 col-12">
                                <FloatingLabel controlId="floatingAskInput" label="Вопрос">
                                    <Form.Control required type={"text"} {...register("ask")}
                                                  aria-label="Введите вопрос"
                                                  placeholder="Введите вопрос"/>
                                </FloatingLabel>
                                {ahomeworkStore?.detailData && ahomeworkStore?.detailData['ask'] &&
                                <p className={'custom-alert-danger-text'}>{ahomeworkStore?.detailData['ask']}</p>}
                            </div>
                        </div>
                        {/*<div className={"row mb-3"}>*/}
                        {/*    <div className="col-lg-12 col-12">*/}
                        {/*        <Form.Group controlId="floatingAskPicture">*/}
                        {/*            <Form.Label>Картинка к вопросу</Form.Label>*/}
                        {/*            <Form.Control type="file" accept=".png,.jpg,.jpeg" {...register("askPicture")}/>*/}
                        {/*        </Form.Group>*/}
                        {/*        {ahomeworkStore?.detailData && ahomeworkStore?.detailData['askPicture'] &&*/}
                        {/*        <p className={'custom-alert-danger-text'}>{ahomeworkStore?.detailData['askPicture']}</p>}*/}
                        {/*        /!*<FloatingLabel controlId="floatingAskPicture" label="Картинка к вопросу">*!/*/}
                        {/*        /!*    <Form.Control type={"file"} {...register("askPicture")}*!/*/}
                        {/*        /!*                  aria-label="Картинка к вопросу"*!/*/}
                        {/*        /!*                  placeholder="Картинка к вопросу"/>*!/*/}
                        {/*        /!*</FloatingLabel>*!/*/}
                        {/*        {ahomeworkStore?.detailData && ahomeworkStore?.detailData['ask'] &&*/}
                        {/*        <p className={'custom-alert-danger-text'}>{ahomeworkStore?.detailData['ask']}</p>}*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {ahomeworkStore.homeworkAddType === "input" && <>
                            <div className={"row mb-3"}>
                                <div className="col-lg-12 col-12">
                                    <FloatingLabel controlId="floatingAnswerInput" label="Ответ">
                                        <Form.Control required type={"text"}
                                                      aria-label="Введите ответ" {...register("answer")}
                                                      placeholder="Введите ответ"/>
                                    </FloatingLabel>
                                    {ahomeworkStore?.detailData && ahomeworkStore?.detailData['answer'] &&
                                    <p className={'custom-alert-danger-text'}>{ahomeworkStore?.detailData['answer']}</p>}
                                </div>
                            </div>
                            <div className={"row mb-3"}>
                                <div className="col-lg-12 col-12">
                                    <p className={'text-danger'}>Сумма A+B+C должна быть равна 100!</p>
                                </div>
                                <div className="col-lg-3 col-3">
                                    <FloatingLabel controlId="floatingAInput" label="A">
                                        <Form.Control required type={"number"}
                                                      aria-label="Введите A" {...register("a", {valueAsNumber: true})}
                                                      placeholder="Введите A" onChange={InputMinMax} defaultValue={0}/>
                                    </FloatingLabel>
                                    {ahomeworkStore?.detailData && ahomeworkStore?.detailData['a'] &&
                                    <p className={'custom-alert-danger-text'}>{ahomeworkStore?.detailData['a']}</p>}
                                </div>
                                <div className="col-lg-3 col-3">
                                    <FloatingLabel controlId="floatingBInput" label="B">
                                        <Form.Control required type={"number"}
                                                      aria-label="Введите B" {...register("b", {valueAsNumber: true})}
                                                      placeholder="Введите B" onChange={InputMinMax} defaultValue={0}/>
                                    </FloatingLabel>
                                    {ahomeworkStore?.detailData && ahomeworkStore?.detailData['b'] &&
                                    <p className={'custom-alert-danger-text'}>{ahomeworkStore?.detailData['b']}</p>}
                                </div>
                                <div className="col-lg-3 col-3">
                                    <FloatingLabel controlId="floatingCInput" label="C">
                                        <Form.Control required type={"number"}
                                                      aria-label="Введите C" {...register("c", {valueAsNumber: true})}
                                                      placeholder="Введите C" onChange={InputMinMax} defaultValue={0}/>
                                    </FloatingLabel>
                                    {ahomeworkStore?.detailData && ahomeworkStore?.detailData['c'] &&
                                    <p className={'custom-alert-danger-text'}>{ahomeworkStore?.detailData['c']}</p>}
                                </div>
                                <div className="col-lg-3 col-3">
                                    <FloatingLabel controlId="floatingSumOutput" label="A+B+C">
                                        <Form.Control type={"number"} readOnly aria-label="Сумма A+B+C"
                                                      placeholder="Сумма A+B+C" value={ahomeworkStore.abcSum}/>
                                    </FloatingLabel>
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
                        {ahomeworkStore.homeworkAddType === "select" && <>
                            {getAnswerData()}
                            <button className={'btn btn-dark mb-3'}
                                    type="button"
                                    onClick={() => {
                                        append({answer: "", validStatus: false});
                                    }}>
                                Добавить вариант ответа
                            </button>
                            <div className={"row mb-3"}>
                                <div className="col-lg-6 col-6">
                                    <FloatingLabel controlId="floatingCHLInput" label="CHL">
                                        <Form.Control required type={"number"}
                                                      aria-label="Введите CHL" {...register("chl", {valueAsNumber: true})}
                                                      placeholder="Введите CHL" onChange={InputMinMax}
                                                      defaultValue={0}/>
                                    </FloatingLabel>
                                    {ahomeworkStore?.detailData && ahomeworkStore?.detailData['chl'] &&
                                    <p className={'custom-alert-danger-text'}>{ahomeworkStore?.detailData['chl']}</p>}
                                </div>
                                <div className="col-lg-6 col-6">
                                    <FloatingLabel controlId="floatingPOLInput" label="POL">
                                        <Form.Control required type={"number"}
                                                      aria-label="Введите POL" {...register("pol", {valueAsNumber: true})}
                                                      placeholder="Введите POL" onChange={InputMinMax}
                                                      defaultValue={0}/>
                                    </FloatingLabel>
                                    {ahomeworkStore?.detailData && ahomeworkStore?.detailData['pol'] &&
                                    <p className={'custom-alert-danger-text'}>{ahomeworkStore?.detailData['pol']}</p>}
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
                    </>}
                </form>
            </Modal.Body>
        </Modal>
    )
}))


export default AHomeworkAskEditModal;
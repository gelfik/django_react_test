import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useForm, useFieldArray} from "react-hook-form";
import {FloatingLabel, Form} from "react-bootstrap";
import ErrorAlert from "../ErrorAlert";

const AHomeworkAskAddModal = inject('userStore', 'modalStore', 'acourseStore', 'asubCourseStore', 'ahomeworkStore')(observer((stores) => {
    const {modalStore, ahomeworkStore} = stores;
    const {register, control, getValues, setValue, reset, handleSubmit} = useForm({defaultValues: {answerList: []}});
    const {fields, append, remove} = useFieldArray({control, name: "answerList"});

    useEffect(() => {
        if (modalStore.AHomeworkAskAddModalStatus) {
            ahomeworkStore.setHomeworkAddType(undefined)
            ahomeworkStore.setAbcSum(0)
            ahomeworkStore.setErrorsAdd(undefined)
            reset()
            //  asubCourseStore.setErrorAdd(undefined)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.AHomeworkAskAddModalStatus])
    //
    const onSubmitAdd = (data) => {
        ahomeworkStore.setErrorsAdd(undefined)
        if (data['askType'] === 'select') {
            if (data.answerList.length === 0) {
                ahomeworkStore.setErrorsAdd({error: 'Вы не добавили ответы!'})
            } else {
                let askAnswerStatus = true
                for (let value of data?.answerList) {
                    if (value?.validStatus === true) {
                        askAnswerStatus = false
                    }
                }
                if (askAnswerStatus) {
                    ahomeworkStore.setErrorsAdd({error: 'Вы не выбрали ни одного верного ответа!'})
                }
            }
        }
        console.log(data)
        // asubCourseStore.setlessonListAddData({})
        // asubCourseStore.loadLessonListAdd(data, acourseStore.courseID).then(()=> {
        //     if (asubCourseStore.lessonListAddData?.status) {
        //         modalStore.ALessonListAddModalClose()
        //         reset()
        //         asubCourseStore.setSubCourseID(asubCourseStore.lessonListAddData?.courseID, asubCourseStore.lessonListAddData?.subCourseID, true)
        //         history.push(`/apanel/course${asubCourseStore.lessonListAddData?.courseID}/sub${asubCourseStore.lessonListAddData?.subCourseID}`)
        //     }
        // })
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

    const getAnswerList = () => {
        return fields.map((item, index) => {
            return (<div className={"row mb-3"} key={item.id}>
                <hr/>
                <div className="col-lg-10 col-10">
                    <div className={"row"}>
                        <div className="col-lg-12 col-12">
                            <FloatingLabel controlId={`floating${index}.answer`} label="Ответ">
                                <Form.Control required type={"text"} {...register(`answerList.${index}.answer`)}
                                              aria-label="Ответ" placeholder="Ответ" control={control}/>
                            </FloatingLabel>
                            {ahomeworkStore?.errorsAdd && ahomeworkStore?.errorsAdd[`answerList.${index}.answer`] &&
                            <p className={'custom-alert-danger-text'}>{ahomeworkStore?.errorsAdd[`answerList.${index}.answer`]}</p>}
                        </div>
                        <div className="col-lg-12 col-12">
                            <Form.Check id={`answerList.${index}.validStatus`} label={`Верный ответ?`}>
                                <Form.Check.Input type={'checkbox'} {...register(`answerList.${index}.validStatus`)}/>
                                <Form.Check.Label style={{cursor: 'pointer'}}>Верный ответ?</Form.Check.Label>
                            </Form.Check>
                            {ahomeworkStore?.errorsAdd && ahomeworkStore?.errorsAdd[`answerList.${index}.validStatus`] &&
                            <p className={'custom-alert-danger-text'}>{ahomeworkStore?.errorsAdd[`answerList.${index}.validStatus`]}</p>}
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
        <Modal show={modalStore.AHomeworkAskAddModalStatus} centered onHide={modalStore.AHomeworkAskAddModalClose}>
            <Modal.Header>
                <Modal.Title>Добавление вопроса</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.AHomeworkAskAddModalClose}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'} onSubmit={handleSubmit(onSubmitAdd)}>
                    {ahomeworkStore?.errorsAdd && ahomeworkStore?.errorsAdd['error'] &&
                    <ErrorAlert error={ahomeworkStore?.errorsAdd['error']}/>}
                    <div className={"row"}>
                        <div className="col-lg-12 col-12 mb-3">
                            <FloatingLabel controlId="floatingSelectAskType" label="Тип вопроса">
                                <Form.Select defaultValue={''} aria-label="Выберите тип" {...register("askType")}
                                             onChange={(e) => {
                                                 ahomeworkStore.setHomeworkAddType(e.target.value)
                                             }}>
                                    <option value={''} disabled>Выберите тип вопроса</option>
                                    <option value={'input'}>С вводом ответа</option>
                                    <option value={'select'}>С выбором ответа</option>
                                </Form.Select>
                            </FloatingLabel>
                            {ahomeworkStore?.errorsAdd && ahomeworkStore?.errorsAdd['askType'] &&
                            <p className={'custom-alert-danger-text'}>{ahomeworkStore?.errorsAdd['askType']}</p>}
                        </div>
                    </div>
                    {ahomeworkStore.homeworkAddType && <>
                        <div className={"row mb-3"}>
                            <div className="col-lg-12 col-12">
                                <FloatingLabel controlId="floatingAskInput" label="Вопрос">
                                    <Form.Control required type={"text"} {...register("ask")}
                                                  aria-label="Введите вопрос"
                                                  placeholder="Введите вопрос"/>
                                </FloatingLabel>
                                {ahomeworkStore?.errorsAdd && ahomeworkStore?.errorsAdd['ask'] &&
                                <p className={'custom-alert-danger-text'}>{ahomeworkStore?.errorsAdd['ask']}</p>}
                            </div>
                        </div>
                        {ahomeworkStore.homeworkAddType === "input" &&
                        <div className={"row mb-3"}>
                            <div className="col-lg-12 col-12">
                                <FloatingLabel controlId="floatingAnswerInput" label="Ответ">
                                    <Form.Control required type={"text"}
                                                  aria-label="Введите ответ" {...register("answerInput")}
                                                  placeholder="Введите ответ"/>
                                </FloatingLabel>
                                {ahomeworkStore?.errorsAdd && ahomeworkStore?.errorsAdd['answerInput'] &&
                                <p className={'custom-alert-danger-text'}>{ahomeworkStore?.errorsAdd['answerInput']}</p>}
                            </div>
                        </div>}
                        {ahomeworkStore.homeworkAddType === "select" && <>
                            {getAnswerList()}
                            <button className={'btn btn-dark'}
                                type="button"
                                onClick={() => {
                                    append({answer: "", validStatus: false});
                                }}
                            >
                                Добавить вариант ответа
                            </button>
                        </>}
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
                                {ahomeworkStore?.errorsAdd && ahomeworkStore?.errorsAdd['a'] &&
                                <p className={'custom-alert-danger-text'}>{ahomeworkStore?.errorsAdd['a']}</p>}
                            </div>
                            <div className="col-lg-3 col-3">
                                <FloatingLabel controlId="floatingBInput" label="B">
                                    <Form.Control required type={"number"}
                                                  aria-label="Введите B" {...register("b", {valueAsNumber: true})}
                                                  placeholder="Введите B" onChange={InputMinMax} defaultValue={0}/>
                                </FloatingLabel>
                                {ahomeworkStore?.errorsAdd && ahomeworkStore?.errorsAdd['b'] &&
                                <p className={'custom-alert-danger-text'}>{ahomeworkStore?.errorsAdd['b']}</p>}
                            </div>
                            <div className="col-lg-3 col-3">
                                <FloatingLabel controlId="floatingCInput" label="C">
                                    <Form.Control required type={"number"}
                                                  aria-label="Введите C" {...register("c", {valueAsNumber: true})}
                                                  placeholder="Введите C" onChange={InputMinMax} defaultValue={0}/>
                                </FloatingLabel>
                                {ahomeworkStore?.errorsAdd && ahomeworkStore?.errorsAdd['c'] &&
                                <p className={'custom-alert-danger-text'}>{ahomeworkStore?.errorsAdd['c']}</p>}
                            </div>
                            <div className="col-lg-3 col-3">
                                <FloatingLabel controlId="floatingSumOutput" label="A+B+C">
                                    <Form.Control type={"number"} readOnly aria-label="Сумма A+B+C"
                                                  placeholder="Сумма A+B+C" value={ahomeworkStore.abcSum}/>
                                </FloatingLabel>
                            </div>
                        </div>
                        <div className={"row mb-3"}>
                            <div className="col-lg-6 col-6">
                                <FloatingLabel controlId="floatingCHLInput" label="CHL">
                                    <Form.Control required type={"number"}
                                                  aria-label="Введите CHL" {...register("chl", {valueAsNumber: true})}
                                                  placeholder="Введите CHL" onChange={InputMinMax} defaultValue={0}/>
                                </FloatingLabel>
                                {ahomeworkStore?.errorsAdd && ahomeworkStore?.errorsAdd['chl'] &&
                                <p className={'custom-alert-danger-text'}>{ahomeworkStore?.errorsAdd['chl']}</p>}
                            </div>
                            <div className="col-lg-6 col-6">
                                <FloatingLabel controlId="floatingPOLInput" label="POL">
                                    <Form.Control required type={"number"}
                                                  aria-label="Введите POL" {...register("pol", {valueAsNumber: true})}
                                                  placeholder="Введите POL" onChange={InputMinMax} defaultValue={0}/>
                                </FloatingLabel>
                                {ahomeworkStore?.errorsAdd && ahomeworkStore?.errorsAdd['pol'] &&
                                <p className={'custom-alert-danger-text'}>{ahomeworkStore?.errorsAdd['pol']}</p>}
                            </div>
                        </div>
                        <button type={"submit"}
                                disabled={ahomeworkStore.abcSum !== 100 || (Number(getValues('a')) < 0 || Number(getValues('b')) < 0 || Number(getValues('c')) < 0)}
                                className={'btn btn-dark'}>Добавить
                        </button>
                    </>}
                </form>
            </Modal.Body>
        </Modal>
    )
}))


export default AHomeworkAskAddModal;
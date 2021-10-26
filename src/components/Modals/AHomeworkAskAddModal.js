import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useForm, useFieldArray} from "react-hook-form";
import {FloatingLabel, Form} from "react-bootstrap";
import ErrorAlert from "../ErrorAlert";
import {useAlert} from "react-alert";

const AHomeworkAskAddModal = inject('userStore', 'modalStore', 'acourseStore', 'asubCourseStore', 'alessonStore', 'ahomeworkStore')(observer((stores) => {
    const {modalStore, ahomeworkStore, acourseStore, asubCourseStore, alessonStore} = stores;
    const {register, control, getValues, setValue, reset, handleSubmit} = useForm({defaultValues: {answerData: []}});
    const {fields, append, remove} = useFieldArray({control, name: "answerData"});
    const alert = useAlert();

    useEffect(() => {
        if (modalStore.AHomeworkAskAddModalStatus) {
            ahomeworkStore.setHomeworkAddType(undefined)
            ahomeworkStore.setAbcSum(0)
            ahomeworkStore.setAddDetailData(undefined)
            reset()
            //  asubCourseStore.setErrorAdd(undefined)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.AHomeworkAskAddModalStatus])

    useEffect(() => {
        reset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ahomeworkStore.homeworkAddType])
    //
    const onSubmitAdd = (data) => {
        ahomeworkStore.setAddDetailData(undefined)
        let askValidStatus = true
        if (data['askType'] === 'select') {
            if (data.answerData.length === 0) {
                ahomeworkStore.setAddDetailData({error: 'Вы не добавили ответы!'})
                askValidStatus = false
            } else {
                let askAnswerStatus = true
                for (let value of data?.answerData) {
                    if (value?.validStatus === true) {
                        askAnswerStatus = false
                    }
                }
                if (askAnswerStatus) {
                    ahomeworkStore.setAddDetailData({error: 'Вы не выбрали ни одного верного ответа!'})
                    askAnswerStatus = false
                }
            }
        }
        console.log(data)
        if (askValidStatus) {
            ahomeworkStore.loadHomeworkAddAdd(data, acourseStore.courseID, asubCourseStore.subCourseID, alessonStore.lessonID).then(r => {
                if (ahomeworkStore.addDetailData?.status) {
                    alessonStore.loadLessonData(acourseStore.courseID, asubCourseStore.subCourseID, alessonStore.lessonID)
                    alert.success(alessonStore.addDetailData?.detail)
                    // modalStore.AHomeworkAskAddModalClose()
                }
            })
        }
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
                            {ahomeworkStore?.addDetailData && ahomeworkStore?.addDetailData[`answerData.${index}.answer`] &&
                            <p className={'custom-alert-danger-text'}>{ahomeworkStore?.addDetailData[`answerData.${index}.answer`]}</p>}
                        </div>
                        <div className="col-lg-12 col-12">
                            <Form.Check id={`answerData.${index}.validStatus`} label={`Верный ответ?`}>
                                <Form.Check.Input type={'checkbox'} {...register(`answerData.${index}.validStatus`)}/>
                                <Form.Check.Label style={{cursor: 'pointer'}}>Верный ответ?</Form.Check.Label>
                            </Form.Check>
                            {ahomeworkStore?.addDetailData && ahomeworkStore?.addDetailData[`answerData.${index}.validStatus`] &&
                            <p className={'custom-alert-danger-text'}>{ahomeworkStore?.addDetailData[`answerData.${index}.validStatus`]}</p>}
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
                    {ahomeworkStore?.addDetailData && ahomeworkStore?.addDetailData['error'] &&
                    <ErrorAlert error={ahomeworkStore?.addDetailData['error']}/>}
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
                            {ahomeworkStore?.addDetailData && ahomeworkStore?.addDetailData['askType'] &&
                            <p className={'custom-alert-danger-text'}>{ahomeworkStore?.addDetailData['askType']}</p>}
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
                                {ahomeworkStore?.addDetailData && ahomeworkStore?.addDetailData['ask'] &&
                                <p className={'custom-alert-danger-text'}>{ahomeworkStore?.addDetailData['ask']}</p>}
                            </div>
                        </div>
                        {/*<div className={"row mb-3"}>*/}
                        {/*    <div className="col-lg-12 col-12">*/}
                        {/*        <Form.Group controlId="floatingAskPicture">*/}
                        {/*            <Form.Label>Картинка к вопросу</Form.Label>*/}
                        {/*            <Form.Control type="file" accept=".png,.jpg,.jpeg" {...register("askPicture")}/>*/}
                        {/*        </Form.Group>*/}
                        {/*        {ahomeworkStore?.addDetailData && ahomeworkStore?.addDetailData['askPicture'] &&*/}
                        {/*        <p className={'custom-alert-danger-text'}>{ahomeworkStore?.addDetailData['askPicture']}</p>}*/}
                        {/*        /!*<FloatingLabel controlId="floatingAskPicture" label="Картинка к вопросу">*!/*/}
                        {/*        /!*    <Form.Control type={"file"} {...register("askPicture")}*!/*/}
                        {/*        /!*                  aria-label="Картинка к вопросу"*!/*/}
                        {/*        /!*                  placeholder="Картинка к вопросу"/>*!/*/}
                        {/*        /!*</FloatingLabel>*!/*/}
                        {/*        {ahomeworkStore?.addDetailData && ahomeworkStore?.addDetailData['ask'] &&*/}
                        {/*        <p className={'custom-alert-danger-text'}>{ahomeworkStore?.addDetailData['ask']}</p>}*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {ahomeworkStore.homeworkAddType === "input" &&
                        <div className={"row mb-3"}>
                            <div className="col-lg-12 col-12">
                                <FloatingLabel controlId="floatingAnswerInput" label="Ответ">
                                    <Form.Control required type={"text"}
                                                  aria-label="Введите ответ" {...register("answer")}
                                                  placeholder="Введите ответ"/>
                                </FloatingLabel>
                                {ahomeworkStore?.addDetailData && ahomeworkStore?.addDetailData['answer'] &&
                                <p className={'custom-alert-danger-text'}>{ahomeworkStore?.addDetailData['answer']}</p>}
                            </div>
                        </div>}
                        {ahomeworkStore.homeworkAddType === "select" && <>
                            {getAnswerData()}
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
                                {ahomeworkStore?.addDetailData && ahomeworkStore?.addDetailData['a'] &&
                                <p className={'custom-alert-danger-text'}>{ahomeworkStore?.addDetailData['a']}</p>}
                            </div>
                            <div className="col-lg-3 col-3">
                                <FloatingLabel controlId="floatingBInput" label="B">
                                    <Form.Control required type={"number"}
                                                  aria-label="Введите B" {...register("b", {valueAsNumber: true})}
                                                  placeholder="Введите B" onChange={InputMinMax} defaultValue={0}/>
                                </FloatingLabel>
                                {ahomeworkStore?.addDetailData && ahomeworkStore?.addDetailData['b'] &&
                                <p className={'custom-alert-danger-text'}>{ahomeworkStore?.addDetailData['b']}</p>}
                            </div>
                            <div className="col-lg-3 col-3">
                                <FloatingLabel controlId="floatingCInput" label="C">
                                    <Form.Control required type={"number"}
                                                  aria-label="Введите C" {...register("c", {valueAsNumber: true})}
                                                  placeholder="Введите C" onChange={InputMinMax} defaultValue={0}/>
                                </FloatingLabel>
                                {ahomeworkStore?.addDetailData && ahomeworkStore?.addDetailData['c'] &&
                                <p className={'custom-alert-danger-text'}>{ahomeworkStore?.addDetailData['c']}</p>}
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
                                {ahomeworkStore?.addDetailData && ahomeworkStore?.addDetailData['chl'] &&
                                <p className={'custom-alert-danger-text'}>{ahomeworkStore?.addDetailData['chl']}</p>}
                            </div>
                            <div className="col-lg-6 col-6">
                                <FloatingLabel controlId="floatingPOLInput" label="POL">
                                    <Form.Control required type={"number"}
                                                  aria-label="Введите POL" {...register("pol", {valueAsNumber: true})}
                                                  placeholder="Введите POL" onChange={InputMinMax} defaultValue={0}/>
                                </FloatingLabel>
                                {ahomeworkStore?.addDetailData && ahomeworkStore?.addDetailData['pol'] &&
                                <p className={'custom-alert-danger-text'}>{ahomeworkStore?.addDetailData['pol']}</p>}
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
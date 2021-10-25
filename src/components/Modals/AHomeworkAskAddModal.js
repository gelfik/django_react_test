import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import {useForm} from "react-hook-form";
import {FloatingLabel, Form} from "react-bootstrap";

const AHomeworkAskAddModal = inject('userStore', 'modalStore', 'acourseStore', 'asubCourseStore', 'ahomeworkStore')(observer((stores) => {
    const {modalStore, ahomeworkStore} = stores;
    const {register, getValues, setValue} = useForm();

    register('a', {
        onChange: (e) => console.log(e)
    })

    useEffect(() => {
        if (modalStore.AHomeworkAskAddModalStatus) {
            ahomeworkStore.setHomeworkAddType(undefined)
            //  asubCourseStore.setErrorAdd(undefined)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.AHomeworkAskAddModalStatus])
    //
    // const onSubmitAdd = (data) => {
    //     asubCourseStore.setlessonListAddData({})
    //     asubCourseStore.loadLessonListAdd(data, acourseStore.courseID).then(()=> {
    //         if (asubCourseStore.lessonListAddData?.status) {
    //             modalStore.ALessonListAddModalClose()
    //             reset()
    //             asubCourseStore.setSubCourseID(asubCourseStore.lessonListAddData?.courseID, asubCourseStore.lessonListAddData?.subCourseID, true)
    //             history.push(`/apanel/course${asubCourseStore.lessonListAddData?.courseID}/sub${asubCourseStore.lessonListAddData?.subCourseID}`)
    //         }
    //     })
    // }

    const InputMinMax = (e) => {
        if (e.target.value < 0) e.target.value = 0;
        if (e.target.value > 100) e.target.value = 100;
        let sum = 0
        let abcArray = []
        let checkBool = false
        for (let value of ['a', 'b', 'c']) {
            if (e.target.name !== value) {
                sum += Number(getValues(value))
                abcArray.push(value)
            }
        }

        if ((Number(getValues(abcArray[0])) !== 0 && Number(getValues(abcArray[1])) !== 0) ) {
            if ((Number(getValues(abcArray[0])) + Number(getValues(abcArray[1])) + Number(e.target.value)) >= 100)
                checkBool = true
        }


        console.log(Number(getValues(abcArray[0])),Number(getValues(abcArray[1])), Number(e.target.value), checkBool )
        // setValue(`${e.target.name}`, e.target.value)
        if (checkBool) setValue(`${e.target.name}`, 100 - sum)
        // setValue('abc', Number(getValues('a'))+Number(getValues('b'))+Number(getValues('c')))
        ahomeworkStore.setAbcSum((Number(getValues(abcArray[0])) + Number(getValues(abcArray[1])) + Number(e.target.value)))
        // ahomeworkStore.setHomeworkAddType(e.target.value)
    }


    return (
        <Modal show={modalStore.AHomeworkAskAddModalStatus} centered onHide={modalStore.AHomeworkAskAddModalClose}>
            <Modal.Header>
                <Modal.Title>Добавление вопроса</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.AHomeworkAskAddModalClose}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'}>
                    {/*{asubCourseStore?.errorsAdd && asubCourseStore?.errorsAdd['error'] &&*/}
                    {/*<ErrorAlert error={asubCourseStore?.errorsAdd['error']}/>}*/}
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
                            {/*{asubCourseStore?.errorsAdd && asubCourseStore?.errorsAdd['lessonDate'] &&*/}
                            {/*<p className={'custom-alert-danger-text'}>{asubCourseStore?.errorsAdd['lessonDate']}</p>}*/}
                        </div>
                    </div>
                    {ahomeworkStore.homeworkAddType && <>
                        <div className={"row mb-3"}>
                            <div className="col-lg-12 col-12">
                                <FloatingLabel controlId="floatingAskInput" label="Вопрос">
                                    <Form.Control type={"text"} {...register("ask")} aria-label="Введите вопрос"
                                                  placeholder="Введите вопрос"/>
                                </FloatingLabel>
                            </div>
                        </div>
                        {ahomeworkStore.homeworkAddType === "input" &&
                        <div className={"row mb-3"}>
                            <div className="col-lg-12 col-12">
                                <FloatingLabel controlId="floatingAnswerInput" label="Ответ">
                                    <Form.Control type={"text"} aria-label="Введите ответ" {...register("answer")}
                                                  placeholder="Введите ответ"/>
                                </FloatingLabel>
                            </div>
                        </div>}
                        <div className={"row mb-3"}>
                            <div className="col-lg-3 col-3">
                                <FloatingLabel controlId="floatingAInput" label="A">
                                    <Form.Control type={"number"} aria-label="Введите A" {...register("a")}
                                                  placeholder="Введите A" onChange={InputMinMax}/>
                                </FloatingLabel>
                            </div>
                            <div className="col-lg-3 col-3">
                                <FloatingLabel controlId="floatingBInput" label="B">
                                    <Form.Control type={"number"} aria-label="Введите B" {...register("b")}
                                                  placeholder="Введите B" onChange={InputMinMax}/>
                                </FloatingLabel>
                            </div>
                            <div className="col-lg-3 col-3">
                                <FloatingLabel controlId="floatingCInput" label="C">
                                    <Form.Control type={"number"} aria-label="Введите C" {...register("c")}
                                                  placeholder="Введите C" onChange={InputMinMax}/>
                                </FloatingLabel>
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
                                    <Form.Control type={"number"} aria-label="Введите CHL" {...register("chl")}
                                                  placeholder="Введите CHL"/>
                                </FloatingLabel>
                            </div>
                            <div className="col-lg-6 col-6">
                                <FloatingLabel controlId="floatingPOLInput" label="POL">
                                    <Form.Control type={"number"} aria-label="Введите POL" {...register("pol")}
                                                  placeholder="Введите POL"/>
                                </FloatingLabel>
                            </div>
                        </div>
                        <button type={"submit"} className={'btn btn-dark'}>Добавить</button>
                    </>}
                </form>
            </Modal.Body>
        </Modal>
    )
}))


export default AHomeworkAskAddModal;
import React from "react";
import {inject, observer} from "mobx-react";
import {useForm} from "react-hook-form";
import {Col, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";

const TransactionAdd = inject('userStore', 'apurchaseStore')(observer((store) => {
    const {apurchaseStore} = store
    const {register, handleSubmit} = useForm();

    const queryParams = useParams()

    const getUnboughtCourses = () => {
        return apurchaseStore?.notPurchaseData?.courseSub?.map((item, i) =>
            <option key={i} value={item.id}>{item.name}</option>
        )
    }

    const onSubmitAdd = (data) => {
        apurchaseStore.loadPurchaseAdd(data, queryParams?.courseID, queryParams?.purchaseID)
    }

    return (
        <div className="Course__Item">
            <div className="Course__Item__Content">
                <div className="Course__Item__Header">
                    <div className="Course__Item__Data Course__Item__Block">
                        <div className="Course__Item__Title">
                            <p>Добавить в раздел</p>
                        </div>
                        <form className={'d-flex flex-column'} onSubmit={handleSubmit(onSubmitAdd)}>
                            <Row className={'mb-3'}>
                                <Col md={8}>
                                    <div className="form-floating">
                                        <select className="form-select" id={'subCourse'}
                                                required defaultValue={''} aria-label="Выберите раздел"
                                                placeholder={'Курс'} {...register('subCourse', {valueAsNumber: true})}>
                                            <option value={''} disabled>Выберите раздел</option>
                                            {getUnboughtCourses()}
                                        </select>
                                        <label htmlFor={'subCourse'}>Курс</label>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <div className="form-floating">
                                        <input type={'number'} className={`form-control`}
                                               id={'sum'} {...register('sum', {valueAsNumber: true})}
                                               required min={0} max={100000} placeholder={'Сумма'}/>
                                        <label htmlFor={'sum'}>Цена</label>
                                    </div>
                                </Col>
                            </Row>
                            <button type={"submit"} className={'btn btn-dark'}>Добавить</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}))


export default TransactionAdd;

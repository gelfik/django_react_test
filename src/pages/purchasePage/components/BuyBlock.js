import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {useParams} from "react-router-dom";
import Spinner from "../../../components/Spinner";

const BuyBlock = inject('purchasePageStore')(observer((store) => {
    const {purchasePageStore} = store
    const queryParams = useParams()

    useEffect(() => {
        if ((purchasePageStore.courseData.length === 0) || (Number(purchasePageStore?.courseData?.id) !== Number(queryParams?.courseID))) {
            purchasePageStore.loadCourseData(queryParams?.courseID)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [purchasePageStore.courseData])


    return (
        <div className="purchase__Wrapper">
            {purchasePageStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
                <div className="CourseInfo">
                    <div className="CourseInfo__Title">
                        <div className="CourseInfo__Title__Content">
                            <div className="CourseInfo__Title__Content__Avatar">
                                {purchasePageStore?.courseData?.coursePicture &&
                                <img src={`${purchasePageStore?.courseData?.coursePicture}`} alt=""/>}
                            </div>
                            <div className="CourseInfo__Title__Content__Data">
                                <p>{purchasePageStore?.courseData?.predmet} {purchasePageStore?.courseData?.courseExamType}.{purchasePageStore?.courseData?.courseType?.name}</p>
                                <div className="Chips">
                                    <div className="Chips__Item">
                                        {purchasePageStore?.courseData?.predmet}
                                        <span/>
                                    </div>
                                    <div className="Chips__Item">
                                        {purchasePageStore?.courseData?.courseExamType}
                                    </div>
                                    {/*<div className="Chips__Item">*/}
                                    {/*    {purchasePageStore?.courseData?.courseType?.name}*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="CourseInfo__Data">
                        <div className="DetailCourse">
                            <div className="DetailCourse__Item DetailCourse__CourseData">
                                <svg className="DetailCourse__Item__IconCourseDetail" width="16" height="16">*/}
                                    <use xlinkHref={'#icon-course-arrow'}/>
                                </svg>
                                <p className="DetailCourse__Item__Title">длительность курса</p>
                                <p className="DetailCourse__Item__Date">{purchasePageStore?.courseData?.courseType?.duration}</p>
                            </div>
                            <div className="DetailCourse__Item">
                                <div className="DetailCourse__Item__Teacher">
                                    {purchasePageStore?.courseData?.teacher?.avatar?.file?.original && <img
                                        src={`${purchasePageStore?.courseData?.teacher?.avatar?.file?.original}`}
                                        alt=""/>}
                                    <div className="DetailCourse__Item__Teacher__Name">
                                        <p>{purchasePageStore?.courseData?.teacher?.firstName} {purchasePageStore?.courseData?.teacher?.lastName}</p>
                                        <span>преподаватель</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="CourseInfo__PaymentType">
                        <h3>выберите тип оплаты</h3>
                        <div className="CourseInfo__PaymentType__Data">
                            <div className="CourseInfo__PaymentType__Data__Wrapper CourseInfo__PaymentType__Data__Sale">
                                <div className={`CourseInfo__PaymentType__Data__Wrapper__Item ${purchasePageStore.payType && 'CourseInfo__PaymentType__Data__Wrapper__Active'}`} onClick={() => {purchasePageStore.setPayType(true)}}>
                                    <div className="CourseInfo__PaymentType__Data__Wrapper__Item__Price">
                                        <p className="Price">
                                            {purchasePageStore?.courseData?.price - (purchasePageStore?.courseData?.price * purchasePageStore?.courseData?.discountDuration / 100)} ₽
                                            <span>/мес</span>
                                        </p>
                                        <p className="Free">
                                            {purchasePageStore?.courseData?.price} ₽/мес
                                        </p>
                                    </div>
                                    <div className="CourseInfo__PaymentType__Data__Wrapper__Item__Condition">при
                                        единовременной оплате
                                    </div>
                                    <div className={`CourseInfo__PaymentType__Data__Wrapper__Item__Economy ${purchasePageStore.payType && 'CourseInfo__PaymentType__Data__Wrapper__Active__Economy'}`}>
                                        <svg style={{width: 104, height: 56}}>
                                            <use xlinkHref={'#icon-economy-banner'}/>
                                        </svg>
                                        <p>экономите {purchasePageStore?.courseData?.price * purchasePageStore?.courseData?.discountDuration / 100} ₽</p>
                                    </div>
                                </div>
                                <div className="CourseInfo__PaymentType__Data__Wrapper__Description CourseInfo__PaymentType__Data__Sale__Description">
                                    вы потратите <s>{purchasePageStore?.courseData?.price*purchasePageStore?.courseData?.courseType?.durationCount} ₽</s> {(purchasePageStore?.courseData?.price * purchasePageStore?.courseData?.courseType?.durationCount) - ((purchasePageStore?.courseData?.price * purchasePageStore?.courseData?.discountDuration / 100) * purchasePageStore?.courseData?.courseType?.durationCount)}₽ за весь курс при единовременной оплате
                                </div>
                            </div>
                            <div className="CourseInfo__PaymentType__Data__Wrapper">
                                <div className={`CourseInfo__PaymentType__Data__Wrapper__Item ${!purchasePageStore.payType && 'CourseInfo__PaymentType__Data__Wrapper__Active'}`}  onClick={() => {purchasePageStore.setPayType(false)}}>
                                    <div className="CourseInfo__PaymentType__Data__Wrapper__Item__Price">
                                        <p className="Price">
                                            {purchasePageStore?.courseData?.price} ₽
                                            <span>/мес</span>
                                        </p>
                                    </div>
                                    <div className="CourseInfo__PaymentType__Data__Wrapper__Item__Condition">при
                                        ежемесячной оплате
                                    </div>
                                </div>
                                <div className="CourseInfo__PaymentType__Data__Wrapper__Description">
                                    вы потратите {purchasePageStore?.courseData?.price*purchasePageStore?.courseData?.courseType?.durationCount} ₽ за весь курс при ежемесячной оплате
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Pay">

                </div>
            </>}
        </div>
    )
}))

export default BuyBlock;
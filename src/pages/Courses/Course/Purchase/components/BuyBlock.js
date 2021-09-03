import React, {useEffect, useRef} from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router-dom";
import Spinner from "../../../../../components/Spinner";

const BuyBlock = inject('purchasePageStore', 'courseStore')(observer((store) => {
    const {purchasePageStore, courseStore} = store
    const queryParams = useParams()
    const history = useHistory();

    const inputPromo = useRef(null)

    let totalPriceFull = (courseStore?.courseData?.price * courseStore?.courseData?.countDuration) - ((courseStore?.courseData?.price * courseStore?.courseData?.discountDuration / 100) * courseStore?.courseData?.countDuration)

    useEffect(() => {
        purchasePageStore.setPromocodeData('', '', 0)
        purchasePageStore.setPromoText('', '')
        purchasePageStore.buyCourseStore.setBuyText('','')

        purchasePageStore.loadCheckBuy(queryParams?.courseID).then(() => {
            if (purchasePageStore.buyStatus.status) {
                history.push(`/purchases/${purchasePageStore.buyStatus?.id}`)
            } else {
                if ((courseStore.courseData.length === 0) || (Number(courseStore?.courseData?.id) !== Number(queryParams?.courseID))) {
                    courseStore.loadCourseData(queryParams?.courseID).then(()=>{
                        if (courseStore.courseError) {
                            history.push(`/courses`)
                        }
                    })
                }
            }
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        purchasePageStore.setPrice(courseStore?.courseData?.price, totalPriceFull)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseStore.courseData])

    useEffect(() => {
        if (purchasePageStore?.promocodeData?.promocode !== '') {
            let localPrice, localTotalPrice = 0
            if (purchasePageStore?.promocodeData.type === 'procent') {
                localPrice = Math.ceil(purchasePageStore.price.price - (purchasePageStore.price.price * purchasePageStore?.promocodeData.count / 100))
                localTotalPrice = Math.ceil(purchasePageStore.price.totalPrice - (purchasePageStore.price.totalPrice * purchasePageStore?.promocodeData.count / 100))
            } else if (purchasePageStore?.promocodeData.type === 'sum') {
                localPrice = Math.ceil(purchasePageStore.price.price - purchasePageStore.promocodeData.count)
                localTotalPrice = Math.ceil(purchasePageStore.price.totalPrice - purchasePageStore.promocodeData.count)
            }
            if (localPrice <= 0) {
                localPrice = 0
            }
            if (localTotalPrice <= 0) {
                localTotalPrice = 0
            }
            purchasePageStore.setPrice(localPrice, localTotalPrice)
        } else {
            purchasePageStore.setPrice(courseStore?.courseData?.price, totalPriceFull)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [purchasePageStore.promocodeData])

    const promocodeAccept = () => {
        purchasePageStore.setPrice(courseStore?.courseData?.price, totalPriceFull)
        if (inputPromo.current.value !== '') {
            // purchasePageStore.setPromocodeData(inputPromo.current.value, 'procent', 10)
            purchasePageStore.loadPromocodeData(inputPromo.current.value, Number(queryParams?.courseID), courseStore?.courseData?.courseType?.name)
        } else {
            purchasePageStore.setPrice(courseStore?.courseData?.price, totalPriceFull)
            purchasePageStore.setPromoText('упссссс, вы не ввели промокод', '')
        }
    }


    const buySubmit = () => {
        purchasePageStore.buyData(queryParams?.courseID).then(() => {
            if (purchasePageStore.buyCourseStore.buyText.valid !== '') {
                history.push(`/purchases`)
            } else {
                console.log(purchasePageStore.buyCourseStore.buyText.error)
            }
        })
    }


    return (
        <div className="purchase__Wrapper">
            {courseStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
                <div className="CourseInfo">
                    <div className="CourseInfo__Title">
                        <div className="CourseInfo__Title__Content">
                            <div className="CourseInfo__Title__Content__Avatar">
                                {courseStore?.courseData?.coursePicture &&
                                <img src={`${courseStore?.courseData?.coursePicture}`} alt=""/>}
                            </div>
                            <div className="CourseInfo__Title__Content__Data">
                                <p>{courseStore?.courseData?.name}</p>
                                <div className="Chips">
                                    <div className="Chips__Item">
                                        {courseStore?.courseData?.predmet}
                                        <span/>
                                    </div>
                                    <div className="Chips__Item">
                                        {courseStore?.courseData?.courseExamType}
                                    </div>
                                    {/*<div className="Chips__Item">*/}
                                    {/*    {courseStore?.courseData?.courseType?.name}*/}
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
                                <p className="DetailCourse__Item__Date">{courseStore?.courseData?.courseType?.duration}</p>
                            </div>
                            <div className="DetailCourse__Item">
                                <div className="DetailCourse__Item__Teacher">
                                    {courseStore?.courseData?.teacher?.user?.avatar?.file?.original && <img
                                        src={`${courseStore?.courseData?.teacher?.user?.avatar?.file?.original}`}
                                        alt=""/>}
                                    <div className="DetailCourse__Item__Teacher__Name">
                                        <p>{courseStore?.courseData?.teacher?.user?.firstName} {courseStore?.courseData?.teacher?.user?.lastName}</p>
                                        <span>{courseStore?.courseData?.teacher?.role}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {courseStore?.courseData?.countDuration > 1 &&
                    <div className="CourseInfo__PaymentType">
                        <h3>выберите тип оплаты</h3>
                        <div className="CourseInfo__PaymentType__Data">
                            <div className="CourseInfo__PaymentType__Data__Wrapper CourseInfo__PaymentType__Data__Sale">
                                <div
                                    className={`CourseInfo__PaymentType__Data__Wrapper__Item ${purchasePageStore.payType && 'CourseInfo__PaymentType__Data__Wrapper__Active'}`}
                                    onClick={() => {
                                        purchasePageStore.setPayType(true)
                                    }}>
                                    <div className="CourseInfo__PaymentType__Data__Wrapper__Item__Price">
                                        <p className="Price">
                                            {courseStore?.courseData?.price - (courseStore?.courseData?.price * courseStore?.courseData?.discountDuration / 100)} ₽
                                            <span>/мес</span>
                                        </p>
                                        <p className="Free">
                                            {courseStore?.courseData?.price} ₽/мес
                                        </p>
                                    </div>
                                    <div className="CourseInfo__PaymentType__Data__Wrapper__Item__Condition">при
                                        единовременной оплате
                                    </div>
                                    <div
                                        className={`CourseInfo__PaymentType__Data__Wrapper__Item__Economy ${purchasePageStore.payType && 'CourseInfo__PaymentType__Data__Wrapper__Active__Economy'}`}>
                                        <svg style={{width: 104, height: 56}}>
                                            <use xlinkHref={'#icon-economy-banner'}/>
                                        </svg>
                                        <p>экономите {courseStore?.courseData?.price * courseStore?.courseData?.discountDuration / 100} ₽</p>
                                    </div>
                                </div>
                                <div
                                    className="CourseInfo__PaymentType__Data__Wrapper__Description CourseInfo__PaymentType__Data__Sale__Description">
                                    вы
                                    потратите <s>{courseStore?.courseData?.price * courseStore?.courseData?.countDuration} ₽</s> {totalPriceFull}₽
                                    за весь курс при единовременной оплате
                                </div>
                            </div>
                            <div className="CourseInfo__PaymentType__Data__Wrapper">
                                <div
                                    className={`CourseInfo__PaymentType__Data__Wrapper__Item ${!purchasePageStore.payType && 'CourseInfo__PaymentType__Data__Wrapper__Active'}`}
                                    onClick={() => {
                                        purchasePageStore.setPayType(false)
                                    }}>
                                    <div className="CourseInfo__PaymentType__Data__Wrapper__Item__Price">
                                        <p className="Price">
                                            {courseStore?.courseData?.price} ₽
                                            <span>/мес</span>
                                        </p>
                                    </div>
                                    <div className="CourseInfo__PaymentType__Data__Wrapper__Item__Condition">при
                                        ежемесячной оплате
                                    </div>
                                </div>
                                <div className="CourseInfo__PaymentType__Data__Wrapper__Description">
                                    вы
                                    потратите {courseStore?.courseData?.price * courseStore?.courseData?.countDuration} ₽
                                    за весь курс при ежемесячной оплате
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
                <div className="CoursePay">
                    <h3 className="CoursePay__Title">к оплате</h3>

                    <div className="CoursePay__Info">
                        <ul>
                            <li>
                                <span>{!purchasePageStore.payType ? 'месяц' : 'полный курс'}</span>
                                <span>{!purchasePageStore.payType ? courseStore?.courseData?.price : totalPriceFull} ₽</span>
                            </li>
                            {purchasePageStore.promoText.valid &&
                            <li className="discount">
                                <span>промокод</span>
                                <span>-{!purchasePageStore.payType ? courseStore?.courseData?.price - purchasePageStore.price.price : totalPriceFull - purchasePageStore.price.totalPrice} ₽</span>
                            </li>
                            }
                        </ul>
                    </div>

                    <div className="CoursePay__Promocode">
                        <input ref={inputPromo} type="text"/>
                        <button onClick={promocodeAccept}>Применить</button>
                        {purchasePageStore.promoText.valid &&
                        <p className="CoursePay__Promocode__Valid">{purchasePageStore.promoText.valid}</p>}
                        {purchasePageStore.promoText.error &&
                        <p className="CoursePay__Promocode__Error">{purchasePageStore.promoText.error}</p>}
                    </div>

                    <div className="CoursePay__BuyButton" onClick={() => {
                        buySubmit()
                    }}>
                        <button>
                            перейти к оплате
                            <span>{!purchasePageStore.payType ? purchasePageStore.price.price : purchasePageStore.price.totalPrice} ₽</span>
                        </button>
                    </div>
                </div>
            </>}
        </div>
    )
}
))

export default BuyBlock;
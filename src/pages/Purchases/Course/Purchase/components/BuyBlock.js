import React, {useEffect, useRef} from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router-dom";
import Spinner from "../../../../../components/Spinner";
import StickyBox from "react-sticky-box";

const BuyBlock = inject('purchasePageStore', 'purchaseCourseStore', 'purchaseStore')(observer((store) => {
    const {purchasePageStore, purchaseCourseStore, purchaseStore} = store
    const queryParams = useParams()
    const history = useHistory();

    const inputPromo = useRef(null)

    let totalPriceFull = (purchaseCourseStore?.courseData?.course?.price * purchaseCourseStore?.courseData?.countDuration) - ((purchaseCourseStore?.courseData?.course?.price * purchaseCourseStore?.courseData?.course?.discountDuration / 100) * purchaseCourseStore?.courseData?.countDuration)

    useEffect(() => {
        purchasePageStore.setPromocodeData('', '', 0)
        purchasePageStore.setPromoText('', '')
        purchasePageStore.setBuySub('', 0)

        if ((purchaseCourseStore.courseData.length === 0) || (Number(purchaseCourseStore?.courseData?.course?.id) !== Number(queryParams?.purchaseID))) {
            purchaseCourseStore.loadCourseData(queryParams?.purchaseID).then(() => {
                if (purchaseCourseStore.courseError) {
                    history.push(`/purchases`)
                }
                let data = purchaseCourseStore.courseData?.courseSub[0]
                purchasePageStore.setBuySub(data?.name, data?.id)
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        purchasePageStore.setPrice(purchaseCourseStore?.courseData?.course?.price, totalPriceFull)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [purchaseCourseStore.courseData])

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
            purchasePageStore.setPrice(purchaseCourseStore?.courseData?.course?.price, totalPriceFull)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [purchasePageStore.promocodeData])

    const promocodeAccept = () => {
        purchasePageStore.setPrice(purchaseCourseStore?.courseData?.course?.price, totalPriceFull)
        if (inputPromo.current.value !== '') {
            // purchasePageStore.setPromocodeData(inputPromo.current.value, 'procent', 10)
            purchasePageStore.loadPromocodeData(inputPromo.current.value, Number(queryParams?.purchaseID), purchaseCourseStore?.courseData?.course?.courseType?.name)
        } else {
            purchasePageStore.setPrice(purchaseCourseStore?.courseData?.course?.price, totalPriceFull)
            purchasePageStore.setPromoText('упссссс, вы не ввели промокод', '')
        }
    }


    const buySubmit = () => {
        purchasePageStore.buyPurchaseData(queryParams?.purchaseID).then(() => {
            if (purchasePageStore.buyCourseStore.buyText.valid !== '') {
                purchaseStore.setPurchaseID(queryParams?.purchaseID, true)
                history.push(`/purchases/${queryParams?.purchaseID}`)
            }
        })
    }

    const getSubCourses = () => {
        return purchaseCourseStore.courseData?.courseSub?.map((item, i) =>
            <div className="CourseInfo__SubType__Data__Wrapper" key={i}>
                <div
                    className={`CourseInfo__SubType__Data__Wrapper__Item ${item.id===purchasePageStore.buySub?.id && 'CourseInfo__SubType__Data__Wrapper__Active'}`}
                    onClick={() => {
                        purchasePageStore.setBuySub(item.name, item.id)
                    }}>
                    <div className="CourseInfo__SubType__Data__Wrapper__Item__Title">
                        <p className="Name">
                            {item.name}
                        </p>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="purchase__Wrapper">
            {purchaseCourseStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
                <div className="CourseInfo">
                    <div className="CourseInfo__Title">
                        <div className="CourseInfo__Title__Content">
                            <div className="CourseInfo__Title__Content__Avatar">
                                {purchaseCourseStore?.courseData?.course?.coursePicture &&
                                <img src={`${purchaseCourseStore?.courseData?.course?.coursePicture}`} alt=""/>}
                            </div>
                            <div className="CourseInfo__Title__Content__Data">
                                <p>{purchaseCourseStore?.courseData?.course?.name}</p>
                                <div className="Chips">
                                    <div className="Chips__Item">
                                        {purchaseCourseStore?.courseData?.course?.predmet}
                                        <span/>
                                    </div>
                                    <div className="Chips__Item">
                                        {purchaseCourseStore?.courseData?.course?.courseExamType}
                                    </div>
                                    <div className="Chips__Item">
                                        {purchaseCourseStore?.courseData?.course?.courseType?.name}
                                    </div>
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
                                <p className="DetailCourse__Item__Date">{purchaseCourseStore?.courseData?.course?.courseType?.duration}</p>
                            </div>
                            <div className="DetailCourse__Item">
                                <div className="DetailCourse__Item__Teacher">
                                    {purchaseCourseStore?.courseData?.course?.teacher?.user?.avatar?.file?.original &&
                                    <img
                                        src={`${purchaseCourseStore?.courseData?.course?.teacher?.user?.avatar?.file?.original}`}
                                        alt=""/>}
                                    <div className="DetailCourse__Item__Teacher__Name">
                                        <p>{purchaseCourseStore?.courseData?.course?.teacher?.user?.firstName} {purchaseCourseStore?.courseData?.course?.teacher?.user?.lastName}</p>
                                        <span>{purchaseCourseStore?.courseData?.course?.teacher?.role}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {purchaseCourseStore?.courseData?.countDuration > 1 && <>{!purchasePageStore.payType &&
                    <div className="CourseInfo__SubType">
                        <h3>выберите подкурс</h3>
                        <div className="CourseInfo__SubType__Data">
                            {getSubCourses()}
                            {/*<div className="CourseInfo__SubType__Data__Wrapper">*/}
                            {/*    <div*/}
                            {/*        className={`CourseInfo__SubType__Data__Wrapper__Item ${!purchasePageStore.payType && 'CourseInfo__SubType__Data__Wrapper__Active'}`}*/}
                            {/*        onClick={() => {*/}
                            {/*            purchasePageStore.setPayType(false)*/}
                            {/*        }}>*/}
                            {/*        <div className="CourseInfo__SubType__Data__Wrapper__Item__Title">*/}
                            {/*            <p className="Name">*/}
                            {/*                Сентябрь*/}
                            {/*            </p>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    }</>}
                    {purchaseCourseStore?.courseData?.countDuration > 1 &&
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
                                            {purchaseCourseStore?.courseData?.course?.price - (purchaseCourseStore?.courseData?.course?.price * purchaseCourseStore?.courseData?.course?.discountDuration / 100)} ₽
                                            <span>/мес</span>
                                        </p>
                                        <p className="Free">
                                            {purchaseCourseStore?.courseData?.course?.price} ₽/мес
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
                                        <p>экономите {purchaseCourseStore?.courseData?.course?.price * purchaseCourseStore?.courseData?.course?.discountDuration / 100} ₽</p>
                                    </div>
                                </div>
                                <div
                                    className="CourseInfo__PaymentType__Data__Wrapper__Description CourseInfo__PaymentType__Data__Sale__Description">
                                    вы
                                    потратите <s>{purchaseCourseStore?.courseData?.course?.price * purchaseCourseStore?.courseData?.countDuration} ₽</s> {totalPriceFull}₽
                                    за весь оставшийся курс при единовременной оплате
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
                                            {purchaseCourseStore?.courseData?.course?.price} ₽
                                            <span>/мес</span>
                                        </p>
                                    </div>
                                    <div className="CourseInfo__PaymentType__Data__Wrapper__Item__Condition">при
                                        ежемесячной оплате
                                    </div>
                                </div>
                                <div className="CourseInfo__PaymentType__Data__Wrapper__Description">
                                    вы
                                    потратите {purchaseCourseStore?.courseData?.course?.price * purchaseCourseStore?.courseData?.countDuration} ₽
                                    за весь курс при ежемесячной оплате
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
                <StickyBox offsetTop={98} offsetBottom={20} className="CoursePay">
                {/*<div className="CoursePay">*/}
                    <h3 className="CoursePay__Title">к оплате</h3>

                    <div className="CoursePay__Info">
                        <ul>
                            <li>
                                <span>{!purchasePageStore.payType ? 'месяц' : 'полный курс'}</span>
                                <span>{!purchasePageStore.payType ? purchaseCourseStore?.courseData?.course?.price : totalPriceFull} ₽</span>
                            </li>
                            {!purchasePageStore.payType &&
                            <li>
                                <span>выбранный подкурс</span>
                                <span>{purchasePageStore.buySub.text}</span>
                            </li>
                            }
                            {purchasePageStore.payType &&
                            <li>
                                <span>кол-во подкурсов</span>
                                <span>{purchaseCourseStore?.courseData?.countDuration}</span>
                            </li>
                            }
                            {purchasePageStore.promoText.valid &&
                            <li className="discount">
                                <span>промокод</span>
                                <span>-{!purchasePageStore.payType ? purchaseCourseStore?.courseData?.course?.price - purchasePageStore.price.price : totalPriceFull - purchasePageStore.price.totalPrice} ₽</span>
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
                {/*</div>*/}
                    </StickyBox>
            </>}
        </div>
    )
}))

export default BuyBlock;
import React from "react";
import {inject, observer} from "mobx-react";
import {Card, Col, Container, Row} from "react-bootstrap"
import {Link, useHistory, useParams} from "react-router-dom";

const StatsPage = inject('userStore', 'courseStore', 'purchaseStore', 'modalStore')(observer((store) => {
    const {purchaseStore, modalStore} = store
    const history = useHistory();
    const queryParams = useParams()


    const getButtonSubCourses = () => {
        return purchaseStore?.purchaseData?.pay?.map((item, i) =>
            <button type="button"
                    className={`btn btn-outline-dark SubCourses__ButtonSubActive ${item.courseSub.id === Number(queryParams?.subID) ? 'active' : ''}`}
                    key={i} onClick={() => {
                history.push(`/purchases${queryParams?.purchaseID}/sub${item.courseSub.id}`)
            }}>
                {item.courseSub.name}
            </button>
        )
    }


    return (
        <main className={'bg-content mt_navbar'}>
            <div className={'container-banner'}>
                <section className={'Course CoursePage'}>
                    <Container>
                        <Row>
                            <Col md={12}>
                                <div className="Course__Left">
                                    <div className="Course__Item">
                                        <div className="Course__Item__Content">
                                            <div className="Course__Item__Header">
                                                <div className="Course__Item__Data">
                                                    <div className="Course__Item__Avatar">
                                                        <img
                                                            src={`${purchaseStore?.purchaseData?.course?.coursePicture}`}
                                                            alt=''/>
                                                    </div>
                                                    <div className="Course__Item__Title">
                                                        <p>{purchaseStore?.purchaseData?.course?.name}</p>
                                                        <div className="Chips">
                                                            <div className="Chips__Item">
                                                                {purchaseStore?.purchaseData?.course?.predmet}
                                                                <span/>
                                                            </div>
                                                            <div className="Chips__Item">
                                                                {purchaseStore?.purchaseData?.course?.courseExamType}
                                                            </div>
                                                            <div className="Chips__Item">
                                                                {purchaseStore?.purchaseData?.course?.courseType}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="Course__Item__PayInfo">
                                                    {purchaseStore?.purchaseData?.courseSubAll &&
                                                    <span className="Course__Item__PayInfo__PayStatus">
                                        <svg fill="none" height="16" width="16">
                                            <use xlinkHref={'#check-valid'}/>
                                        </svg>
                                        <p>Курс куплен полностью</p>
                                    </span>
                                                    }
                                                    {!purchaseStore?.purchaseData?.courseSubAll &&
                                                    <Link to={`/purchases${purchaseStore?.purchaseData?.id}/purchase`}
                                                          className="Course__Item__PayInfo__Link">докупить
                                                        курс</Link>}
                                                    <div className="Course__Item__PayInfo__Link" onClick={() => {
                                                        modalStore.PurchaseDetailModalShow();
                                                    }}>история платежей
                                                    </div>
                                                    <Link to={`/purchases${purchaseStore?.purchaseData?.id}/statistics`}
                                                          className="Course__Item__PayInfo__Link">моя статистика</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container__wrapper purchase">
                                        <h1 className="purchase__Title">
                                            статистика за курс "-"
                                        </h1>
                                        <Card
                                            bg={"success"}
                                            text={'light'}
                                            style={{width: '18rem'}}
                                            className="mb-2"
                                        >
                                            <Card.Header>курс "-"</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Диаграмма за весь курс </Card.Title>
                                                <Card.Text>
                                                    Общая диаграмма за весь курс. При нажатии открывается модальное окно
                                                    с
                                                    подробной информацией.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    <div className={'SubCourses'}>
                                        <h3>подкурсы</h3>
                                        {getButtonSubCourses()}
                                    </div>
                                    <div>
                                        <h1 className="purchase__Title">
                                            статистика за подкурс "-_-"
                                        </h1>
                                        <Card
                                            bg={"success"}
                                            text={'light'}
                                            style={{width: '18rem'}}
                                            className="mb-2"
                                        >
                                            <Card.Header>подкурс "-_-"</Card.Header>
                                            <Card.Body>
                                                <Card.Title>Диаграмма за весь подкурс </Card.Title>
                                                <Card.Text>
                                                    Общая диаграмма за весь подкурс. При нажатии открывается модальное
                                                    окно
                                                    с
                                                    подробной
                                                    информацией.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </main>
    )
}))

export default StatsPage;
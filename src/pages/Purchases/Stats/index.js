import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Col, Container, Row} from "react-bootstrap"
import {useHistory, useParams} from "react-router-dom";
import SubCourseButtonsBlock from "./components/SubCourseButtonsBlock";
import Spinner from "../../../components/Spinner";
import CourseBlock from "./components/CourseBlock";
import RadarDiagramBlock from "./components/RadarDiagramBlock";

const StatsPage = inject('userStore', 'progressStore')(observer((store) => {
    const {progressStore} = store
    const history = useHistory();
    const queryParams = useParams()

    useEffect(() => {
        if (progressStore.loadError) {
            history.push(`/purchases`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progressStore.loadError])

    useEffect(() => {
        progressStore.setPurchaseID(queryParams?.purchaseID)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams?.purchaseID])

    return (
        <main className={'mt_navbar bg-content'}>
            <section className="ContainerContent CoursePage">
                    <div className="Content-Wrapper">
                        {progressStore.spinner.spinnerStatus ? <Spinner type={'local'}/> :
                            <Container>
                                <Row>
                                    <Col md={9}>
                                        <CourseBlock/>
                                        <div className="WhiteBlock__Item">
                                            <div className="WhiteBlock__Item__Content">
                                                <div className="WhiteBlock__Item__Header">
                                                    <div className="WhiteBlock__Item__Data">
                                                        <div className="WhiteBlock__Item__Title">
                                                            <p>Отображается статистика по КУРСУ</p>
                                                            <span>Курс: <b>{progressStore.purchaseData?.course?.name}</b></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {progressStore?.purchaseData?.userProgress ?
                                            <RadarDiagramBlock item={progressStore?.purchaseData?.userProgress}/> :
                                            <div className="display-6">
                                                Вы ещё не прошли тестирование по данному курсу
                                            </div>}
                                    </Col>
                                    <Col md={3}>
                                        <SubCourseButtonsBlock/>
                                    </Col>
                                </Row>
                            </Container>}
                    </div>
            </section>
        </main>
    )
}))

export default StatsPage;
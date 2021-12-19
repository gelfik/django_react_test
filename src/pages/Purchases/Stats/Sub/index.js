import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router-dom";
import Spinner from "../../../../components/Spinner";
import SubCourseButtonsBlock from "../components/SubCourseButtonsBlock";
import {Col, Container, Row} from "react-bootstrap";
import RadarDiagramBlock from "../components/RadarDiagramBlock";
import CourseBlock from "../components/CourseBlock";
import LessonButtonsBlock from "./components/LessonButtonsBlock";


const StatsSubPage = inject('userStore', 'progressStore', 'progressSubStore')(observer((store) => {

    useEffect(() => {
        document.body.className = 'bg-light min-vh-100'
        window.scrollTo(0, 0)
    }, []);

    const {progressStore, progressSubStore} = store
    const history = useHistory();
    const queryParams = useParams()


    useEffect(() => {
        if (progressStore.loadError || progressSubStore.loadError) {
            history.push(`/purchases`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progressStore.loadError, progressSubStore.loadError])

    useEffect(() => {
        window.scrollTo(0, 0)
        progressStore.setPurchaseID(queryParams?.purchaseID)
        progressSubStore.setSubID(queryParams?.purchaseID, queryParams?.subID)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progressStore?.purchaseID, progressSubStore?.subID])


    return (
        <main className={'mt_navbar bg-content'}>
            <section className="ContainerContent CoursePage">
                    <div className="Content-Wrapper">
                        {progressStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
                            <Container>
                                <Row>
                                    <Col md={9}>
                                        <CourseBlock/>
                                        {progressSubStore.spinner.spinnerStatus ?
                                            <Spinner type={'local'}/> :
                                            <>
                                                <div className="WhiteBlock__Item">
                                                    <div className="WhiteBlock__Item__Content">
                                                        <div className="WhiteBlock__Item__Header">
                                                            <div className="WhiteBlock__Item__Data">
                                                                <div className="WhiteBlock__Item__Title">
                                                                    <p>Отображается статистика по ПОДКУРСУ</p>
                                                                    <span>Курс: <b>{progressStore.purchaseData?.course?.name}</b></span>
                                                                    <span>Подкурс: <b>{progressSubStore.subData?.name}</b></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {progressSubStore?.subData?.userProgress ?
                                                    <RadarDiagramBlock
                                                        item={progressSubStore?.subData?.userProgress}/> :
                                                    <div className="display-6">
                                                        Вы ещё не прошли тестирование по данному подкурсу
                                                    </div>}
                                            </>}
                                    </Col>
                                    <Col md={3}>
                                        <SubCourseButtonsBlock/>
                                        <LessonButtonsBlock/>
                                    </Col>
                                </Row>
                            </Container>
                        </>}
                    </div>
            </section>
        </main>
    )
}))

export default StatsSubPage;
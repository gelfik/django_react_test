import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import CourseBlock from "../../components/CourseBlock";
import {useHistory, useParams} from "react-router-dom";
import Spinner from "../../../../../components/Spinner";
import SubCourseButtonsBlock from "../../components/SubCourseButtonsBlock";
import {Col, Container, Row} from "react-bootstrap";
import LessonButtonsBlock from "../components/LessonButtonsBlock";
import RadarDiagramBlock from "../../components/RadarDiagramBlock";

const StatsLessonPage = inject('userStore', 'progressStore', 'progressSubStore', 'progressLessonStore')(observer((store) => {
    useEffect(() => {
        document.body.className = 'bg-light min-vh-100'
        window.scrollTo(0, 0)
    }, []);

    const {progressStore, progressSubStore, progressLessonStore} = store
    const history = useHistory();
    const queryParams = useParams()


    useEffect(() => {
        if (progressStore.loadError || progressSubStore.loadError || progressLessonStore.loadError) {
            history.push(`/purchases`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progressStore.loadError, progressSubStore.loadError, progressLessonStore.loadError])

    useEffect(() => {
        window.scrollTo(0, 0)
        progressStore.setPurchaseID(queryParams?.purchaseID)
        progressSubStore.setSubID(queryParams?.purchaseID, queryParams?.subID)
        progressLessonStore.setLessonID(queryParams?.purchaseID, queryParams?.subID, queryParams?.lessonID)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [progressStore?.purchaseID, progressSubStore?.subID, queryParams?.lessonID])


    return (
        <main className={'mt_navbar bg-content'}>
            <section className="ContainerContent CoursePage">
                    <div className="Content-Wrapper">
                        {progressStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
                            <Container>
                                <Row>
                                    <Col md={9}>
                                        <CourseBlock/>
                                        {(progressSubStore.spinner.spinnerStatus || progressLessonStore.spinner.spinnerStatus) ?
                                            <Spinner type={'local'}/> :
                                            <>
                                                <div className="WhiteBlock__Item">
                                                    <div className="WhiteBlock__Item__Content">
                                                        <div className="WhiteBlock__Item__Header">
                                                            <div className="WhiteBlock__Item__Data">
                                                                <div className="WhiteBlock__Item__Title">
                                                                    <p>Отображается статистика по ЗАНЯТИЮ</p>
                                                                    <span>Курс: <b>{progressStore.purchaseData?.course?.name}</b></span>
                                                                    <span>Раздел: <b>{progressSubStore.subData?.name}</b></span>
                                                                    <span>Занятие: <b>{progressLessonStore.lessonData?.date}</b></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {progressLessonStore?.lessonData?.userProgress ?
                                                    <RadarDiagramBlock
                                                        item={progressLessonStore?.lessonData?.userProgress}/> :
                                                    <div className="display-6">
                                                        Еще никто не прошел тестирование по данному занятию
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

export default StatsLessonPage;

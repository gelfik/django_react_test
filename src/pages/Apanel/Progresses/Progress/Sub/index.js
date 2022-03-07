import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import ComandBlock from "../../../components/ComandBlock";
import CourseBlock from "../components/CourseBlock";
import {useHistory, useParams} from "react-router-dom";
import Spinner from "../../../../../components/Spinner";
import SubCourseButtonsBlock from "../components/SubCourseButtonsBlock";
import {Col, Container, Row} from "react-bootstrap";
import LessonButtonsBlock from "./components/LessonButtonsBlock";
import RadarDiagramBlock from "../components/RadarDiagramBlock";


const ApanelProgressSubPage = inject('userStore', 'aprogressStore', 'aprogressSubStore')(observer((store) => {
    useEffect(() => {
        document.body.className = 'bg-light min-vh-100'
        window.scrollTo(0, 0)
    }, []);

    const {aprogressStore, aprogressSubStore} = store
    const history = useHistory();
    const queryParams = useParams()


    useEffect(() => {
        if (aprogressStore.loadError || aprogressSubStore.loadError) {
            history.push(`/apanel/progress`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aprogressStore.loadError, aprogressSubStore.loadError])

    useEffect(() => {
        window.scrollTo(0, 0)
        aprogressStore.setCourseID(queryParams?.courseID)
        aprogressSubStore.setSubID(queryParams?.courseID, queryParams?.subID)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aprogressStore?.courseID, aprogressSubStore?.subID])


    return (
        <main className={'mt_navbar bg-content'}>
            <section className="ContainerContent">
                <div className="APanel">
                    <div className="Navigation-Wrapper">
                        <ComandBlock/>
                    </div>
                    <div className="Content-Wrapper">
                        {aprogressStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
                            <Container>
                                <Row>
                                    <Col md={9}>
                                        <CourseBlock/>
                                        {aprogressSubStore.spinner.spinnerStatus ?
                                            <Spinner type={'local'}/> :
                                            <>
                                                <div className="WhiteBlock__Item">
                                                    <div className="WhiteBlock__Item__Content">
                                                        <div className="WhiteBlock__Item__Header">
                                                            <div className="WhiteBlock__Item__Data">
                                                                <div className="WhiteBlock__Item__Title">
                                                                    <p>Отображается статистика по РАЗДЕЛУ</p>
                                                                    <span>Курс: <b>{aprogressStore.courseData?.name}</b></span>
                                                                    <span>Раздел: <b>{aprogressSubStore.subData?.name}</b></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {aprogressSubStore?.subData?.userProgress?.length > 0 ?
                                                    <RadarDiagramBlock
                                                        list={aprogressSubStore?.subData?.userProgress}/> :
                                                    <div className="display-6">
                                                        Еще никто не прошел тестирование по данному разделу
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
                </div>
            </section>
        </main>
    )
}))

export default ApanelProgressSubPage;

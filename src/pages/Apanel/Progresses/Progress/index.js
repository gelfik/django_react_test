import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import ComandBlock from "../../components/ComandBlock";
import {useHistory, useParams} from "react-router-dom";
import Spinner from "../../../../components/Spinner";
import SubCourseButtonsBlock from "./components/SubCourseButtonsBlock";
import {Container, Row, Col} from "react-bootstrap";
import CourseBlock from "./components/CourseBlock";
import RadarDiagramBlock from "./components/RadarDiagramBlock";

const ApanelProgressPage = inject('userStore', 'aprogressStore')(observer((store) => {
    useEffect(() => {
        document.body.className = 'bg-light min-vh-100'
        window.scrollTo(0, 0)
    }, []);

    const {aprogressStore} = store
    const history = useHistory();
    const queryParams = useParams()


    useEffect(() => {
        if (aprogressStore.loadError) {
            history.push(`/apanel/progress`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aprogressStore.loadError])

    useEffect(() => {
        aprogressStore.setCourseID(queryParams?.courseID)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams?.courseID])


    return (
        <main className={'mt_navbar bg-content'}>
            <section className="ContainerContent">
                <div className="APanel">
                    <div className="Navigation-Wrapper">
                        <ComandBlock/>
                    </div>
                    <div className="Content-Wrapper">
                        {aprogressStore.spinner.spinnerStatus ? <Spinner type={'local'}/> :
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
                                                            <span>Курс: <b>{aprogressStore.courseData?.name}</b></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {aprogressStore?.courseData?.userProgress?.length > 0 ?
                                            <RadarDiagramBlock list={aprogressStore?.courseData?.userProgress}/> :
                                            <div className="display-6">
                                                Еще никто не прошел тестирование по данному курсу
                                            </div>}
                                    </Col>
                                    <Col md={3}>
                                        <SubCourseButtonsBlock/>
                                    </Col>
                                </Row>
                            </Container>}
                    </div>
                </div>
            </section>
        </main>
    )
}))

export default ApanelProgressPage;
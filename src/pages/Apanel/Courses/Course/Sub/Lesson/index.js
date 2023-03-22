import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import ComandBlock from "../../../../components/ComandBlock";
import CourseBlock from "../../components/CourseBlock";
import {useHistory, useParams} from "react-router-dom";
import Spinner from "../../../../../../components/Spinner";
import SubCourseButtonsBlock from "../../components/SubCourseButtonsBlock";
import LessonListBlock from "../components/LessonListBlock";
import LessonBlock from "./components/LessonBlock";
import MentorBlock from "../../components/MentorsBlock";
import {Col, Container, Row} from "react-bootstrap";
import StickyBox from "react-sticky-box";

const ApanelLessonPage = inject('userStore', 'acourseStore', 'asubCourseStore', 'alessonStore')(observer((store) => {
    useEffect(() => {
        document.body.className = 'bg-light min-vh-100'
        window.scrollTo(0, 0)
    }, []);

    const {acourseStore, asubCourseStore, alessonStore} = store
    const history = useHistory();
    const queryParams = useParams()


    useEffect(() => {
        if (acourseStore.loadError) {
            history.push(`/apanel/course`)
        }
        if (asubCourseStore.loadError) {
            history.push(`/apanel/course`)
        }
        if (alessonStore.loadError) {
            history.push(`/apanel/course`)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [acourseStore.loadError, asubCourseStore.loadError, alessonStore.loadError])

    useEffect(() => {
        acourseStore.setCourseID(queryParams?.courseID)
        asubCourseStore.setSubCourseID(queryParams?.courseID, queryParams?.subID)
        alessonStore.setLessonID(queryParams?.courseID, queryParams?.subID, queryParams?.lessonID)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams?.courseID, queryParams?.subID, queryParams?.lessonID])

    // useEffect(() => {
    //     acoursesListStore.loadFilterData()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    return (
        <main className={'mt_navbar bg-content'}>
            <section className="ContainerContent">
                <div className="APanel">
                    <StickyBox offsetTop={66} offsetBottom={20} className="Navigation-Wrapper">
                    {/*<div className="Navigation-Wrapper">*/}
                        <ComandBlock/>
                    {/*</div>*/}
                    </StickyBox>
                    <div className="Content-Wrapper">
                        {acourseStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
                            {/*{!acourseStore.courseData?.draft && <CourseBlock/>}*/}

                            {!acourseStore.courseData?.draft && <>
                                <Container>
                                    <Row>
                                        <Col md={9}>
                                            <CourseBlock/>


                                            {asubCourseStore.spinner.spinnerStatus ?
                                                <Spinner type={'local'}/> :
                                                <section className={'LessonList'}>
                                                    <LessonListBlock/>
                                                    <LessonBlock/>
                                                </section>}


                                        </Col>
                                        <Col md={3}>
                                            <StickyBox offsetTop={66} offsetBottom={20} >
                                            <MentorBlock/>
                                            <SubCourseButtonsBlock/>
                                                </StickyBox>
                                        </Col>
                                    </Row>
                                </Container>
                            </>}

                            {acourseStore.courseData?.draft && <>
                                <Container>
                                    <Row>
                                        <Col md={9}>
                                            <CourseBlock/>


                                            {asubCourseStore.spinner.spinnerStatus ?
                                                <Spinner type={'local'}/> :
                                                <section className={'LessonList'}>
                                                    <LessonListBlock/>
                                                    <LessonBlock/>
                                                </section>}



                                        </Col>

                                        <Col md={3}>
                                            <MentorBlock/>
                                            <SubCourseButtonsBlock/>
                                        </Col>
                                    </Row>
                                </Container>
                            </>}
                        </>}
                    </div>
                </div>
            </section>
        </main>
    )
}))

export default ApanelLessonPage;
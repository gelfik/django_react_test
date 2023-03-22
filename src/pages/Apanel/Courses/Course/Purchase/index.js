import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import ComandBlock from "../../../components/ComandBlock";
import {useHistory, useParams} from "react-router-dom";
import Spinner from "../../../../../components/Spinner";
import SubCourseButtonsBlock from ".././components/SubCourseButtonsBlock";
import MentorBlock from ".././components/MentorsBlock";
import {Container, Row, Col} from "react-bootstrap";
import CourseBlock from ".././components/CourseBlock";
import FilterBlock from "./components/FilterBlock";
import PurchaseBlock from "./components/PurchaseBlock";


const ApanelCoursePurchasePage = inject('userStore', 'acourseStore')(observer((store) => {
    useEffect(() => {
        document.body.className = 'bg-light min-vh-100'
        window.scrollTo(0, 0)
    }, []);

    const {acourseStore} = store
    const history = useHistory();
    const queryParams = useParams()


    useEffect(() => {
        if (acourseStore.loadError) {
            history.push(`/apanel/course`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [acourseStore.loadError])

    useEffect(() => {
        acourseStore.setCourseID(queryParams?.courseID)
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
                        {acourseStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <>
                            {/*{!acourseStore.courseData?.draft && <CourseBlock/>}*/}

                            {!acourseStore.courseData?.draft &&
                            <Container>
                                            <CourseBlock/>
                                            <FilterBlock/>
                                            <PurchaseBlock/>
                            </Container>}

                            {acourseStore.courseData?.draft &&
                            <Container>
                                <Row>
                                    <Col md={9}>
                                        <CourseBlock/>
                                    </Col>
                                    <Col md={3}>
                                        <MentorBlock/>
                                        <SubCourseButtonsBlock/>
                                    </Col>
                                </Row>
                            </Container>}
                        </>}
                    </div>
                </div>
            </section>
        </main>
    )
}))

export default ApanelCoursePurchasePage;
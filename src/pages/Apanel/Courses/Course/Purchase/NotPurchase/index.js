import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import ComandBlock from "../../../../components/ComandBlock";
import {useHistory, useParams} from "react-router-dom";
import Spinner from "../../../../../../components/Spinner";
import {Container, Row, Col} from "react-bootstrap";
import CourseBlock from "./components/CourseBlock";
import UserBlock from "./components/UserBlock";
import TransactionBlock from "./components/TransactionBlock";
import TransactionAdd from "./components/TransactionAdd";


const ANotPurchasePage = inject('userStore', 'acourseStore', 'apurchaseStore')(observer((store) => {
    useEffect(() => {
        document.body.className = 'bg-light min-vh-100'
        window.scrollTo(0, 0)
    }, []);

    const {acourseStore, apurchaseStore} = store
    const queryParams = useParams()
    const history = useHistory();

    useEffect(() => {
        acourseStore.setCourseID(queryParams?.courseID)
        apurchaseStore.setPurchaseID(queryParams?.purchaseID)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams?.courseID, queryParams?.purchaseID])

    useEffect(() => {
        if (acourseStore.loadError || apurchaseStore.loadError ) {
            history.push(`/apanel/course`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [acourseStore.loadError, apurchaseStore.loadError])


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
                                <Row className="APurchaseManage">
                                    <Col md={6}>
                                        <CourseBlock/>
                                        <UserBlock/>
                                        <TransactionAdd/>
                                    </Col>
                                    <Col md={6}>
                                        <div className="WhiteBlock__Item">
                                        <div className="WhiteBlock__Item__Content">
                                            <TransactionBlock/>
                                        </div>
                                    </div>
                                    </Col>
                                </Row>





                            </Container>}

                            {acourseStore.courseData?.draft &&
                            <Container>
                                <Row>
                                    <Col md={9}>
                                        <CourseBlock/>
                                    </Col>
                                    <Col md={3}>
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

export default ANotPurchasePage;
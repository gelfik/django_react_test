import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import ComandBlock from "../../components/ComandBlock";
import CourseBlock from "./components/CourseBlock";
import {useHistory, useParams} from "react-router-dom";
import Spinner from "../../../../components/Spinner";
import PurchaseListBlock from "./components/PurchaseBlock";
import SubCourseButtonsBlock from "./components/SubCourseButtonsBlock";
import MentorBlock from "./components/MentorsBlock";

const ApanelCoursePage = inject('userStore', 'acourseStore', 'acoursesListStore')(observer((store) => {
    useEffect(() => {
        document.title = "Курсы"
        document.body.className = 'bg-light min-vh-100'
        window.scrollTo(0, 0)
    }, []);

    const {acourseStore, acoursesListStore} = store
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

    useEffect(() => {
        acoursesListStore.loadFilterData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                            <div className="Course">
                                <div className="Course__Left">
                                    <CourseBlock/>
                                    <SubCourseButtonsBlock/>
                                </div>
                                <div className="Course__Right">
                                    <MentorBlock/>
                                </div>
                            </div>}

                            {acourseStore.courseData?.draft && <div className="Course">
                                <div className="Course__Left">
                                    <CourseBlock/>
                                    <SubCourseButtonsBlock/>
                                </div>
                                <div className="Course__Right">
                                    <MentorBlock/>
                                </div>
                            </div>}
                        </>}
                    </div>
                </div>
            </section>
        </main>
    )
}))

export default ApanelCoursePage;
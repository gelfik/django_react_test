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

const ApanelLessonPage = inject('userStore', 'acourseStore', 'acoursesListStore', 'asubCourseStore', 'alessonStore')(observer((store) => {
    useEffect(() => {
        document.title = "Курсы"
        document.body.className = 'bg-light min-vh-100'
        window.scrollTo(0, 0)
    }, []);

    const {acourseStore, acoursesListStore, asubCourseStore, alessonStore} = store
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

                            {!acourseStore.courseData?.draft && asubCourseStore.spinner.spinnerStatus ?
                                <Spinner type={'local'}/> :
                                <section className={'LessonList'}>
                                    <LessonListBlock/>
                                    <LessonBlock/>
                                </section>}

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

export default ApanelLessonPage;
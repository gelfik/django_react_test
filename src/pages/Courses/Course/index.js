import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import BannerBlock from "./components/BannerBlock";

const CoursesCoursePage = inject('userStore', 'courseStore')(observer((store) => {
    const {courseStore} = store

    useEffect(() => {
        courseStore.setCourseError(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.title = `${courseStore?.courseData?.predmet ?? 'Курс'} ${courseStore?.courseData?.courseExamType ?? ''}.${courseStore?.courseData?.courseType?.name ?? ''}`
        document.body.className = 'bg-light min-vh-100'
    }, [courseStore?.courseData]);

    return (
        <main className={'bg-content mt_navbar'}>
            <div className="container-banner">
                {courseStore.courseError ?
                    <h1 className="display-3 fw-bold pb-3">курс не найден</h1>:
                    <BannerBlock/>
                }
            </div>
        </main>
    )
}))

export default CoursesCoursePage;
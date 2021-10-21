import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import BannerBlock from "./components/BannerBlock";

const CoursesCoursePage = inject('userStore', 'courseStore')(observer((store) => {
    const {courseStore} = store

    useEffect(() => {
        courseStore.setCourseError(false)
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.body.className = 'bg-light min-vh-100'
    }, [courseStore?.courseData]);

    return (
        <main className={'bg-content mt_navbar'}>
            <div className="container-banner">
                <BannerBlock/>
            </div>
        </main>
    )
}))

export default CoursesCoursePage;
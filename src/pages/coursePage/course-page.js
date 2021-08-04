import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import BannerBlock from "./components/BannerBlock";

const CoursePage = inject('userStore', 'coursePageStore')(observer((store) => {
    const {coursePageStore} = store
    // const queryParams = useParams()
    // console.log(queryParams)

    useEffect(() => {
        document.title = `${coursePageStore?.courseData?.predmet ?? 'Курс'} ${coursePageStore?.courseData?.courseExamType ?? ''}.${coursePageStore?.courseData?.courseType?.name ?? ''}`
        document.body.className = 'bg-light min-vh-100'
    }, [coursePageStore?.courseData]);

    return (
        <main className={'bg-content mt_navbar'}>
            <div className="container-banner">
                <BannerBlock/>
            </div>
        </main>
    )
}))

export default CoursePage;
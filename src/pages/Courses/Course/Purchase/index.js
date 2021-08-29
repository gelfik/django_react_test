import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import BuyBlock from "./components/BuyBlock";

const CoursesCoursePurchasePage = inject('userStore', 'courseStore')(observer((store) => {
    const {courseStore} = store
    // const queryParams = useParams()
    // console.log(queryParams)

    useEffect(() => {
        courseStore.setCourseError(false)
        window.scrollTo(0, 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        document.title = `${courseStore?.courseData?.predmet ?? 'Курс'} ${courseStore?.courseData?.courseExamType ?? ''}.${courseStore?.courseData?.courseType?.name ?? ''}`
        document.body.className = 'bg-light min-vh-100'
    }, [courseStore?.courseData]);

    return (
        <main className={'bg-content mt_navbar'}>
            <div className="container__wrapper purchase">
                <h1 className="purchase__Title">
                    покупка курса
                </h1>
                <BuyBlock/>
            </div>
        </main>
    )
}))

export default CoursesCoursePurchasePage;
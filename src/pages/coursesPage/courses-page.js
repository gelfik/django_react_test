import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import FilterBlock from "./components/FilterBlock";
import CoursesBlock from "./components/CoursesBlock";
import PaginationBlock from "./components/PaginationBlock";
import Spinner from "../../components/Spinner";

const CoursesPage = inject('userStore', 'coursesPageStore', 'spinnerStore')(observer((store) => {
    const {userStore, coursesPageStore, spinnerStore} = store

    useEffect(() => {
        document.title = "Курсы"
        document.body.className = 'bg-light min-vh-100'
    }, []);

    // useEffect(() => {
    //     coursesPageStore.loadData()
    // }, [])

    return (
        <main className={'mt_navbar bg-content'}>
            <div className="trainings__wrapper">
                <div className="display-3 fw-bold pb-3">курсы</div>
                <FilterBlock/>
                <CoursesBlock/>
                <PaginationBlock/>
            </div>
            {/*<TeacherBlock/>*/}
            {/*<EducationBlock/>*/}
            {/*<div className={'container'}>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/></div>*/}
        </main>
    )
}))

export default CoursesPage;
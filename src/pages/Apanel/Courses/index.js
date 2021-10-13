import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import ComandBlock from "../components/ComandBlock";
import FilterBlock from "./components/FilterBlock";
import CoursesBlock from "./components/CoursesBlock";

const ApanelCoursesPage = inject('userStore', 'acoursesListStore')(observer((store) => {
    const {acoursesListStore} = store

    useEffect(() => {
        document.title = "Курсы"
        document.body.className = 'bg-light min-vh-100'
        window.scrollTo(0, 0)
    }, []);


    useEffect(() => {
        if (!acoursesListStore.spinner.spinnerStatus) {
            acoursesListStore.loadFilterRequest()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [acoursesListStore.filterRequest])


    return (
        <main className={'mt_navbar bg-content'}>
            <section className="ContainerContent">
                <div className="APanel">
                    <div className="Navigation-Wrapper">
                        <ComandBlock/>
                    </div>
                    <div className="Content-Wrapper">
                        <FilterBlock/>
                        <CoursesBlock/>
                    </div>

                    {/*<div className="APanel__Right">*/}
                    {/*    <ApanelCoursesBlock/>*/}
                    {/*</div>*/}

                </div>
            </section>
            {/*<TeacherBlock/>*/}
            {/*<EducationBlock/>*/}
            {/*<div className={'container'}>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/></div>*/}
        </main>
    )
}))

export default ApanelCoursesPage;
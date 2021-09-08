import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import ApanelCoursesBlock from "./components/ApanelCoursesBlock";
import ComandBlock from "../components/ComandBlock";

const ApanelCoursesPage = inject('userStore', 'coursesPageStore', 'spinnerStore')(observer((store) => {
    useEffect(() => {
        document.title = "Курсы"
        document.body.className = 'bg-light min-vh-100'
        window.scrollTo(0, 0)
    }, []);

    return (
        <main className={'mt_navbar bg-content'}>
            <section className="ContainerContent">
                <div className="APanel">
                    <ComandBlock/>
                    <ApanelCoursesBlock/>

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
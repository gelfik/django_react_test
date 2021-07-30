import React from "react";
import {inject, observer} from "mobx-react";
import TeacherBlock from "./components/teacherBlock";
import EducationBlock from "./components/educationBlock";

const MainPage = inject('userStore')(observer((props) => {
    return (
        <div className={'bg-dark'}>

            <div className="container__wrapper">
                <div className="text-white">
                HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>
                </div>
            </div>
            <TeacherBlock/>
            <EducationBlock/>
            {/*<div className={'container'}>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/></div>*/}

        </div>
    )
}))

export default MainPage;
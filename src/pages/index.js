import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import TeacherBlock from "./components/teacherBlock";
import EducationBlock from "./components/educationBlock";

const MainPage = inject('userStore')(observer((props) => {

    useEffect(() => {
        document.title = "Главная"
        document.body.className='bg-dark min-vh-100'
    }, []);

    return (
        <main className={'bg-dark mt_navbar'}>
            {/*<div className="container__wrapper">*/}
            {/*    <div className="text-white">*/}
            {/*        HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <TeacherBlock/>
            <EducationBlock/>
            {/*<div className={'container'}>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/></div>*/}
        </main>
    )
}))

export default MainPage;
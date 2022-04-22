import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import TeacherBlock from "./components/teacherBlock";
import EducationBlock from "./components/educationBlock";
import MainBlock from "./components/mainBlock";

const MainPage = inject("userStore")(
  observer((props) => {
    useEffect(() => {
      document.body.className = "bg-dark min-vh-100";
      window.scrollTo(0, 0);
    }, []);

    return (
      <main className={"bg-dark mt_navbar"}>
        {/*<div className="container__wrapper">*/}
        {/*    <div className="text-white">*/}
        {/*        HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>*/}
        {/*    </div>*/}
        {/*</div>*/}
        <MainBlock />
        <TeacherBlock />
        <EducationBlock />
        {/*<div className={'container'}>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/></div>*/}
      </main>
    );
  })
);

export default MainPage;

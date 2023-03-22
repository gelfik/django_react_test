import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import TeacherBlock from "./components/teacherBlock";
import MainBlock from "./components/mainBlock";
import EducationBlock from "./components/educationBlock";

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
          <script async src="https://telegram.org/js/telegram-widget.js?21" data-telegram-login="rbgrgsrgv_bot" data-size="large" data-auth-url="https://izzibraindev.gelfik.dev" data-request-access="write"></script>
        <MainBlock />
        <TeacherBlock />
        <EducationBlock />
        {/*<div className={'container'}>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/>HelloWorld<br/></div>*/}
      </main>
    );
  })
);

export default MainPage;


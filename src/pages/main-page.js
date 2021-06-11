import React from "react";
import {inject, observer} from "mobx-react";

const MainPage = inject('userStore')(observer((props) => {
    return (
        <div>HelloWorld</div>
    )
}))

export default MainPage;
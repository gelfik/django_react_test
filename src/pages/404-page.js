import React from "react";
import {inject, observer} from "mobx-react";

const Page404 = inject('userStore')(observer((props) => {
    return (
        <div>Not Found</div>
    )
}))

export default Page404;
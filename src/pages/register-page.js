import React from "react";
import {inject, observer} from "mobx-react";

const RegisterPage = inject('userStore')(observer((props) => {
    return (
        <div>RegisterPage</div>
    )
}))

export default RegisterPage;
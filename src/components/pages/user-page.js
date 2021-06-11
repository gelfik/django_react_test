import React from "react";
import {inject, observer} from "mobx-react";
import {Redirect} from "react-router-dom";

const UserPage = inject('userStore')(observer((props) => {
    if (!props.userStore.userAuthStatus) {
        return <Redirect to='/login'/>
    }
    return (
        <div>{props.userStore.userData.lastName} {props.userStore.userData.firstName} {props.userStore.userData.patronymic}</div>
    )
}))

export default UserPage;
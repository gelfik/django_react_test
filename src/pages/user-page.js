import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import Spinner from "../components/Spinner";

const UserPage = inject('userStore')(observer((props) => {
    // const [loading, setLoading] = useState(true)
    // useEffect(() => {
    //     props.userStore.fetchUser().then(() => {
    //         setLoading(false)
    //     })
    // }, [props.userStore])
    //
    // if (!loading) { // Переключи, чтобы избавиться от писки
    //     return <Spinner/>
    // }

    return (
        <div>{props.userStore.userData.lastName} {props.userStore.userData.firstName} {props.userStore.userData.patronymic} {props.userStore.userData.email} {props.userStore.userData.username}</div>
    )
}))

export default UserPage;
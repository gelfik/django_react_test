import React from "react";
import {inject, observer} from "mobx-react";

const UserPage = inject('userStore')(observer((props) => {
    // const [loading, setLoading] = useState(true)
    // useEffect(() => {
    //     if (!props.userStore.userAuthStatus)
    //         // props.userStore.fetchUser().then(() => {
    //         //     console.log(111)
    //     // })
    //     //     RedirectService('/login')
    //         <Redirect to='/login'/>
    // }, [props.userStore])
    //
    // if (!loading) { // Переключи, чтобы избавиться от писки
    //     return <Spinner/>
    // }
    return (<>
            {/*{!props.userStore.userAuthStatus ? <Redirect to='/login'/> : ''}*/}
            <div>{props.userStore.userData.lastName} {props.userStore.userData.firstName} {props.userStore.userData.patronymic} {props.userStore.userData.email} {props.userStore.userData.username}</div>
        </>
    )
}))

export default UserPage;
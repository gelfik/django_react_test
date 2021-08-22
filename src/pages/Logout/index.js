import {inject, observer} from "mobx-react";
import RedirectService from "../../utils/RedirectService";

const LogoutPage = inject('userStore')(observer((props) => {
    props.userStore._clearUserData()
    return (
        RedirectService('/')
    )
}))

export default LogoutPage;
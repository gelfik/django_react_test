import React from "react";
import {inject, observer} from "mobx-react";
import RegisterModal from "../Modals/RegisterModal";
import LoginModal from "../Modals/LoginModal";
import PurchaseDetailModal from "./PurchaseDetailModal";
import ACourseAddModal from "./ACourseAddModal";
import APurchaseUserModal from "./APurchaseUserModal";

const RootModal = inject('userStore')(observer((stores) => {
    const {userStore} = stores
    return (<>
        {!userStore.userAuthStatus && <>
            <LoginModal/>
            <RegisterModal/>
        </>
        }
        {userStore.userAuthStatus && <>
            <PurchaseDetailModal/>
            {userStore.userData.isTeacher && <>
                <ACourseAddModal/>
                <APurchaseUserModal/>
            </>}
        </>}
    </>)
}))

export default RootModal;
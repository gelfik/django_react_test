import React from "react";
import {inject, observer} from "mobx-react";
import RegisterModal from "../Modals/RegisterModal";
import LoginModal from "../Modals/LoginModal";
import PurchaseDetailModal from "./PurchaseDetailModal";
import ACourseAddModal from "./ACourseAddModal";
import APurchaseUserModal from "./APurchaseUserModal";
import ASubCourseAddModal from "./ASubCourseAddModal";

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
                <ASubCourseAddModal/>
            </>}
        </>}
    </>)
}))

export default RootModal;
import React from "react";
import {inject, observer} from "mobx-react";
import RegisterModal from "../Modals/RegisterModal";
import LoginModal from "../Modals/LoginModal";
import PurchaseDetailModal from "./PurchaseDetailModal";
import ACourseAddModal from "./ACourseAddModal";
import APurchaseUserModal from "./APurchaseUserModal";
import ASubCourseAddModal from "./ASubCourseAddModal";
import ACourseEditModal from "./ACourseEditModal";
import ASubCourseEditModal from "./ASubCourseEditModal";
import AMentorAddModal from "./AMentorAddModal";
import APurchaseManagementModal from "./APurchaseManagementModal";
import ATestAskAddModal from "./ATestAskAddModal";
import ATestAskEditModal from "./ATestAskEditModal";

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
                <ACourseEditModal/>
                <APurchaseUserModal/>
                <ASubCourseAddModal/>
                <ASubCourseEditModal/>
                <AMentorAddModal/>
                <APurchaseManagementModal/>
                <ATestAskAddModal/>
                <ATestAskEditModal/>
            </>}
        </>}
    </>)
}))

export default RootModal;
import React from "react";
import {inject, observer} from "mobx-react";
import RegisterModal from "../Modals/RegisterModal";
import LoginModal from "../Modals/LoginModal";
import PurchaseDetailModal from "./PurchaseDetailModal";
import ACourseAddModal from "./ACourseAddModal";
import APurchaseUserModal from "./APurchaseUserModal";
import ASubCourseAddModal from "./ASubCourseAddModal";
import ALessonListAddModal from "./ALessonListAddModal";
import ALessonAddModal from "./ALessonAddModal";
import ACourseEditModal from "./ACourseEditModal";
import ASubCourseEditModal from "./ASubCourseEditModal";
import ALessonListEditModal from "./ALessonListEditModal";
import ALessonEditModal from "./ALessonEditModal";

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
                <ALessonListAddModal/>
                <ALessonAddModal/>
                <ASubCourseEditModal/>
                <ALessonListEditModal/>
                <ALessonEditModal/>
            </>}
        </>}
    </>)
}))

export default RootModal;
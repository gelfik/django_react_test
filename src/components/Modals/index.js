import React from "react";
import {inject, observer} from "mobx-react";
import RegisterModal from "../Modals/RegisterModal";
import LoginModal from "../Modals/LoginModal";
import PurchaseDetailModal from "./PurchaseDetailModal";

const RootModal = inject('userStore')(observer((stores) => {
    const {userStore} = stores
    return (<>
        {!userStore.userAuthStatus && <LoginModal/>}
        {!userStore.userAuthStatus && <RegisterModal/>}
        {userStore.userAuthStatus && <PurchaseDetailModal/>}
    </>)
}))

export default RootModal;
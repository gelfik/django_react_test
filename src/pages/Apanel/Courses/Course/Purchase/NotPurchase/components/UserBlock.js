import React from "react";
import {inject, observer} from "mobx-react";

const UserBlock = inject('userStore', 'apurchaseStore')(observer((store) => {
    const {apurchaseStore} = store

    return (
        <div className="Course__Item">
            <div className="Course__Item__Content">
                <div className="Course__Item__Header">
                    <div className="Course__Item__Data">
                        <div className="Course__Item__Avatar">
                            <img src={`${apurchaseStore?.purchaseData?.user?.avatar?.file?.original}`} alt=''/>
                        </div>
                        <div className="Course__Item__Title">
                            <p>{apurchaseStore?.purchaseData?.user?.firstName} {apurchaseStore?.purchaseData?.user?.lastName}</p>
                            <div className="Course__Item__Title__UserData">
                                <p>Электронная почта: <b>{apurchaseStore?.purchaseData?.user?.email}</b></p>
                                <p>Логин: <b>{apurchaseStore?.purchaseData?.user?.username}</b></p>
                                <p>Телефон: <b>{apurchaseStore?.purchaseData?.user?.phone}</b></p>
                                <div className="UsersList__Item__Title__Links">
                                        <a href={apurchaseStore?.purchaseData?.user?.vkLink}
                                           rel="noreferrer"
                                           className={"UsersList__Item__Title__Links__Button"}
                                           target="_blank">
                                            <svg aria-hidden="true" height="20" width="20">
                                                <use xlinkHref={'#icon-vk-2'}/>
                                            </svg>
                                            <p> перейти</p>
                                        </a>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}))


export default UserBlock;
import React from "react";
import {inject, observer} from "mobx-react";

const CourseBlock = inject('userStore', 'apurchaseStore')(observer((store) => {
    const {apurchaseStore} = store

    return (
        <div className="Course__Item">
            <div className="Course__Item__Content">
                <div className="Course__Item__Header">
                    <div className="Course__Item__Data">
                        <div className="Course__Item__Avatar">
                            <img src={`${apurchaseStore?.purchaseData?.course?.coursePicture}`} alt=''/>
                        </div>
                        <div className="Course__Item__Title">
                            <p>{apurchaseStore?.purchaseData?.course?.name}</p>
                            <div className="Chips">
                                <div className="Chips__Item">
                                    {apurchaseStore?.purchaseData?.course?.predmet}
                                    <span/>
                                </div>
                                <div className="Chips__Item">
                                    {apurchaseStore?.purchaseData?.course?.courseExamType}
                                </div>
                                <div className="Chips__Item">
                                    {apurchaseStore?.purchaseData?.course?.courseType}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}))


export default CourseBlock;
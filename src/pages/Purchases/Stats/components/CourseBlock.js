import React from "react";
import {inject, observer} from "mobx-react";

const CourseBlock = inject('userStore', 'progressStore')(observer((store) => {
    const {progressStore} = store

    return (
        <div className="Course__Item">
            <div className="Course__Item__Content">
                <div className="Course__Item__Header">
                    <div className="Course__Item__Data">
                        <div className="Course__Item__Avatar">
                            <img src={`${progressStore?.purchaseData?.course?.coursePicture}`} alt=''/>
                        </div>
                        <div className="Course__Item__Title">
                            <p>{progressStore?.purchaseData?.course?.name}</p>
                            <div className="Chips">
                                <div className="Chips__Item">
                                    {progressStore?.purchaseData?.course?.predmet}
                                    <span/>
                                </div>
                                <div className="Chips__Item">
                                    {progressStore?.purchaseData?.course?.courseExamType}
                                </div>
                                <div className="Chips__Item">
                                    {progressStore?.purchaseData?.course?.courseType}
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
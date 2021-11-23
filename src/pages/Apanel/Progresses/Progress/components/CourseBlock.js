import React from "react";
import {inject, observer} from "mobx-react";

const CourseBlock = inject('userStore', 'aprogressStore')(observer((store) => {
    const {aprogressStore} = store

    return (
        <div className="Course__Item">
            <div className="Course__Item__Content">
                <div className="Course__Item__Header">
                    <div className="Course__Item__Data">
                        <div className="Course__Item__Avatar">
                            <img src={`${aprogressStore?.courseData?.coursePicture}`} alt=''/>
                        </div>
                        <div className="Course__Item__Title">
                            <p>{aprogressStore?.courseData?.name}</p>
                            <div className="Chips">
                                <div className="Chips__Item">
                                    {aprogressStore?.courseData?.predmet}
                                    <span/>
                                </div>
                                <div className="Chips__Item">
                                    {aprogressStore?.courseData?.courseExamType}
                                </div>
                                <div className="Chips__Item">
                                    {aprogressStore?.courseData?.courseType}
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
import React from "react";
import {inject, observer} from "mobx-react";
import Spinner from "../../../../../components/Spinner";
import {Link} from "react-router-dom";

const CourseBlock = inject('userStore', 'acourseStore')(observer((store) => {
    const {acourseStore} = store

    return (
        <div className="Course__Item">
            <div className="Course__Item__Content">
                <div className="Course__Item__Header">
                    <div className="Course__Item__Data">
                        <div className="Course__Item__Avatar">
                            <img src={`${acourseStore?.courseData?.coursePicture}`} alt=''/>
                        </div>
                        <div className="Course__Item__Title">
                            <p>{acourseStore?.courseData?.name}</p>
                            <div className="Chips">
                                <div className="Chips__Item">
                                    {acourseStore?.courseData?.predmet}
                                    <span/>
                                </div>
                                <div className="Chips__Item">
                                    {acourseStore?.courseData?.courseExamType}
                                </div>
                                <div className="Chips__Item">
                                    {acourseStore?.courseData?.courseType}
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
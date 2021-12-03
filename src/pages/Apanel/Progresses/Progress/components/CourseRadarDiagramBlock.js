import React from "react";
import {inject, observer} from "mobx-react";
import RadarDiagram from "../../../../../components/RadarDiagram";

const CourseRadarDiagramBlock = inject('userStore', 'aprogressStore')(observer((store) => {
    const {aprogressStore} = store

    const getCourseUserProgress = () => {
        return aprogressStore?.courseData?.userProgress?.map((item, i) =>
            <div className="Course__Item">
                <div className="Course__Item__Content">
                    <div className="Course__Item__Header">
                        <div className="Course__Item__Data">
                            <div className="Course__Item__Avatar">
                                <img src={`${item?.user?.avatar?.file?.original}`} alt=''/>
                            </div>
                            <div className="Course__Item__Title">
                                <p>{item?.user?.firstName} {item?.user?.lastName}</p>
                                <span>K={item?.k}</span>
                                <span>Число выполненых работ: {item?.countWork}</span>
                            </div>
                        </div>
                        <RadarDiagram data={item}/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>{getCourseUserProgress()}</>
    )
}))


export default CourseRadarDiagramBlock;
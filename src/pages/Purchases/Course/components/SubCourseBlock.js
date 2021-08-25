import React from "react";
import {inject, observer} from "mobx-react";
import StickyBox from "react-sticky-box";
import LessonBlock from "./LessonBlock";
import LessonListBlock from "./LessonListBlock";

const SubCourseBlock = inject('purchaseStore', 'purCoursePageStore')(observer((store) => {
    return (
        <section className={'LessonList'}>
            <div className="LessonList__Left">
                <LessonListBlock/>
            </div>
            <div className="LessonList__Right">
                <LessonBlock/>
            </div>
        </section>
    )
}))

export default SubCourseBlock;
import React from "react";
import {inject, observer} from "mobx-react";
// import LessonBlock from "./LessonBlock";
import LessonListBlock from "./LessonListBlock";
import StickyBox from "react-sticky-box";

const SubCourseBlock = inject('purchaseStore', 'purCoursePageStore')(observer((store) => {
    return (
        <section className={'LessonList'}>
            <div className="LessonList__Left">
                <LessonListBlock/>
            </div>
            <StickyBox offsetTop={98} offsetBottom={20} className="LessonList__Right">
                {/*<LessonBlock/>*/}
            </StickyBox>
        </section>
    )
}))

export default SubCourseBlock;
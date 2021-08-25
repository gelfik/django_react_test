import React from "react";
import {inject, observer} from "mobx-react";

const SubCoursesButtonBlock = inject('purchaseStore', 'purCoursePageStore')(observer((store) => {
    const {purchaseStore, purCoursePageStore} = store

    const getButtonSubCourses = () => {
        return purchaseStore?.purchaseData?.courseSub?.map((item, i) =>
            <button type="button"
                    className={`btn btn-outline-dark SubCourses__ButtonSubActive ${item.id === purCoursePageStore.activeSub ? 'active' : ''}`}
                    key={i} onClick={() => {
                purCoursePageStore.setActiveSub(item.id)
            }}>
                {item.name}
            </button>
        )
    }

    return (
        <section className={'SubCourses'}>
            <h3>подкурсы</h3>
            {getButtonSubCourses()}
        </section>
    )
}))

export default SubCoursesButtonBlock;
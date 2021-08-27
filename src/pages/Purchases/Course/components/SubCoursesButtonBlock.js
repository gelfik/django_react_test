import React from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router-dom";

const SubCoursesButtonBlock = inject('purchaseStore', 'purCoursePageStore', 'subCourseStore')(observer((store) => {
    const {purchaseStore} = store
    const history = useHistory();
    const queryParams = useParams()

    const getButtonSubCourses = () => {
        return purchaseStore?.purchaseData?.courseSub?.map((item, i) =>
            <button type="button"
                    className={`btn btn-outline-dark SubCourses__ButtonSubActive ${item.id === Number(queryParams?.subID) ? 'active' : ''}`}
                    key={i} onClick={() => {
                history.push(`/purchases/${queryParams?.purchaseID}/sub/${item.id}`)
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
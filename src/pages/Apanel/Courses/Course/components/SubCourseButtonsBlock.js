import React from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router-dom";

const SubCourseButtonsBlock = inject('userStore', 'acourseStore')(observer((store) => {
    const {acourseStore} = store
    const queryParams = useParams()
    const history = useHistory();

    const getButtonSubCourses = () => {
        return acourseStore?.courseData?.subCourses?.map((item, i) =>
            <button type="button"
                    className={`btn btn-outline-dark SubCourses__ButtonSubActive ${item.id === Number(queryParams?.subID) ? 'active' : ''}`}
                    key={i} onClick={() => {
                history.push(`/apanel/course/${queryParams?.courseID}/sub/${item.id}`)
            }}>
                {item.name}
            </button>
        )
    }

    return (
        <div className={'SubCourses'}>
            <h3>подкурсы</h3>
            {getButtonSubCourses()}
        </div>
    )
}))

export default SubCourseButtonsBlock;
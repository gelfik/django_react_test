import React from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router-dom";

const SubCourseButtonsBlock = inject('userStore', 'acourseStore', 'modalStore')(observer((store) => {
    const {acourseStore, modalStore} = store
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
            <svg aria-hidden="true" height="20" width="20" className={'SubCourses__PlusButton'} onClick={modalStore.ASubCourseAddModalShow}>
                        <use xlinkHref={'#icon-plus'}/>
                    </svg>
            {getButtonSubCourses()}
        </div>
    )
}))

export default SubCourseButtonsBlock;
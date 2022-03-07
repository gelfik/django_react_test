import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router-dom";

const SubCourseButtonsBlock = inject('userStore', 'aprogressStore', 'aprogressSubStore')(observer((store) => {
        const {aprogressStore, aprogressSubStore} = store
        const queryParams = useParams()
        const history = useHistory();
        const [accordionStatus, SetAccordion] = useState(false);

        useEffect(() => {
            SetAccordion(false)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [queryParams?.subID])


        const getButtonSubCourses = () => {
            return aprogressStore?.courseData?.subCourses?.map((item, i) =>
                <button type="button"
                        className={`btn btn-outline-dark SubCourses__ButtonSubActive ${item.id === Number(queryParams?.subID) ? 'active' : ''}`}
                        key={i} onClick={() => {
                    history.push(`/apanel/progress${queryParams?.courseID}/sub${item.id}`)
                }}>
                    {item.name}
                </button>
            )
        }

        const getNotActive = () => {
            return <div className={'SubCourses'}>
                <div className={'SubCourses__Title'}>
                    <span>разделы </span>
                </div>
                {getButtonSubCourses()}
            </div>
        }

        const getActive = () => {
            return <>{accordionStatus ? <div className={'SubCourses'}>
                <div className={'SubCourses__Title'}>
                    <span>разделы </span>
                </div>
                {getButtonSubCourses()}
            </div> : <div className={'SubCourses'}>
                <div className={'SubCourses__Title'}>
                    <span>активный раздел </span>
                </div>
                <button type="button"
                        className={`btn btn-outline-dark SubCourses__ButtonSubActive active`}>
                    {aprogressSubStore.subData?.name}
                </button>
                <button type="button"
                        className={`btn btn-outline-dark SubCourses__ButtonSubActive`}
                        onClick={() => {
                            SetAccordion(true)
                            history.push(`/apanel/progress${queryParams?.courseID}`)
                        }}>
                    сменить раздел
                </button>
            </div>}

            </>
        }

        return (
            <>{queryParams?.subID ? getActive() : getNotActive()}</>
        )
    })
)

export default SubCourseButtonsBlock;

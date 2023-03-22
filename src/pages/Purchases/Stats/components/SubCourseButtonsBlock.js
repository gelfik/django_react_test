import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router-dom";

const SubCourseButtonsBlock = inject('userStore', 'progressStore', 'progressSubStore')(observer((store) => {
        const {progressStore, progressSubStore} = store
        const queryParams = useParams()
        const history = useHistory();
        const [accordionStatus, SetAccordion] = useState(false);

        useEffect(() => {
            SetAccordion(false)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [queryParams?.subID])


        const getButtonSubCourses = () => {
            return progressStore?.purchaseData?.pay?.map((item, i) =>
                <button type="button"
                        className={`btn btn-outline-dark SubCourses__ButtonSubActive ${item?.courseSub?.id === Number(queryParams?.subID) ? 'active' : ''}`}
                        key={i} onClick={() => {
                    history.push(`/purchases${queryParams?.purchaseID}/stats/sub${item?.courseSub?.id}`)
                }}>
                    {item?.courseSub?.name}
                </button>
            )
        }

        const getNotActive = () => {
            return <div className={'SubCourses__Grid'}>
                <div className={'SubCourses__Title'}>
                    <span>разделы </span>
                </div>
                {getButtonSubCourses()}
            </div>
        }

        const getActive = () => {
            return <>{accordionStatus ? <div className={'SubCourses__Grid'}>
                <div className={'SubCourses__Title'}>
                    <span>разделы </span>
                </div>
                {getButtonSubCourses()}
            </div> : <div className={'SubCourses__Grid'}>
                <div className={'SubCourses__Title'}>
                    <span>активный раздел </span>
                </div>
                <button type="button"
                        className={`btn btn-outline-dark SubCourses__ButtonSubActive active`}>
                    {progressSubStore.subData?.name}
                </button>
                <button type="button"
                        className={`btn btn-outline-dark SubCourses__ButtonSubActive`}
                        onClick={() => {
                            SetAccordion(true)
                            history.push(`/purchases${queryParams?.purchaseID}/stats`)
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

import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router-dom";

const LessonButtonsBlock = inject('userStore', 'progressSubStore', 'progressLessonStore')(observer((store) => {
        const {progressSubStore, progressLessonStore} = store
        const queryParams = useParams()
        const history = useHistory();
        const [accordionStatus, SetAccordion] = useState(false);

        useEffect(() => {
            SetAccordion(false)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [queryParams?.lessonID])


        const getButtonLessons = () => {
            return progressSubStore?.subData?.lessons?.map((item, i) =>
                <button type="button"
                        className={`btn btn-outline-dark SubCourses__ButtonSubActive ${item.id === Number(queryParams?.lessonID) ? 'active' : ''}`}
                        key={i} onClick={() => {
                    history.push(`/purchases${queryParams?.purchaseID}/stats/sub${queryParams?.subID}/lesson${item.id}`)
                }}>
                    {item.date}
                </button>
            )
        }

        const getNotActive = () => {
            return <div className={'SubCourses__Grid'}>
                <div className={'SubCourses__Title'}>
                    <span>занятия </span>
                </div>
                {getButtonLessons()}
            </div>
        }

        const getActive = () => {
            return <>{accordionStatus ? <div className={'SubCourses__Grid'}>
                <div className={'SubCourses__Title'}>
                    <span>занятия </span>
                </div>
                {getButtonLessons()}
            </div> : <div className={'SubCourses__Grid'}>
                <div className={'SubCourses__Title'}>
                    <span>активное занятие </span>
                </div>
                <button type="button"
                        className={`btn btn-outline-dark SubCourses__ButtonSubActive active`}>
                    {progressLessonStore.lessonData?.date}
                </button>
                <button type="button"
                        className={`btn btn-outline-dark SubCourses__ButtonSubActive`}
                        onClick={() => {
                            SetAccordion(true)
                            history.push(`/purchases${queryParams?.purchaseID}/sub${queryParams?.subID}`)
                        }}>
                    сменить занятие
                </button>
            </div>}

            </>
        }

        return (
            <>{queryParams?.lessonID ? getActive() : getNotActive()}</>
        )
    })
)

export default LessonButtonsBlock;
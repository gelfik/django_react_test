import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router-dom";

const LessonButtonsBlock = inject('userStore', 'aprogressSubStore', 'aprogressLessonStore')(observer((store) => {
        const {aprogressSubStore, aprogressLessonStore} = store
        const queryParams = useParams()
        const history = useHistory();
        const [accordionStatus, SetAccordion] = useState(false);

        useEffect(() => {
            SetAccordion(false)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [queryParams?.lessonID])


        const getButtonLessons = () => {
            return aprogressSubStore?.subData?.lessons?.map((item, i) =>
                <button type="button"
                        className={`btn btn-outline-dark SubCourses__ButtonSubActive ${item.id === Number(queryParams?.lessonID) ? 'active' : ''}`}
                        key={i} onClick={() => {
                    history.push(`/apanel/progress${queryParams?.courseID}/sub${queryParams?.subID}/lesson${item.id}`)
                }}>
                    {item.date}
                </button>
            )
        }

        const getNotActive = () => {
            return <div className={'SubCourses'}>
                <div className={'SubCourses__Title'}>
                    <span>занятия </span>
                </div>
                {getButtonLessons()}
            </div>
        }

        const getActive = () => {
            return <>{accordionStatus ? <div className={'SubCourses'}>
                <div className={'SubCourses__Title'}>
                    <span>занятия </span>
                </div>
                {getButtonLessons()}
            </div> : <div className={'SubCourses'}>
                <div className={'SubCourses__Title'}>
                    <span>активное занятие </span>
                </div>
                <button type="button"
                        className={`btn btn-outline-dark SubCourses__ButtonSubActive active`}>
                    {aprogressLessonStore.lessonData?.date}
                </button>
                <button type="button"
                        className={`btn btn-outline-dark SubCourses__ButtonSubActive`}
                        onClick={() => {
                            SetAccordion(true)
                            history.push(`/apanel/progress${queryParams?.courseID}/sub${queryParams?.subID}`)
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
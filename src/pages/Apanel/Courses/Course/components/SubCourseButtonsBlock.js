import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {useHistory, useParams} from "react-router-dom";

const SubCourseButtonsBlock = inject('userStore', 'acourseStore', 'modalStore', 'asubCourseStore')(observer((store) => {
        const {acourseStore, modalStore, asubCourseStore} = store
        const queryParams = useParams()
        const history = useHistory();
        const [accordionStatus, SetAccordion] = useState(false);

        useEffect(() => {
            SetAccordion(false)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [queryParams?.subID])


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

        const getNotActive = () => {
            return <div className={'SubCourses'}>
                <div className={'SubCourses__Title'}>
                    <span>подкурсы </span>
                    {acourseStore.courseData?.draft &&
                    <svg aria-hidden="true" height="20" width="20" className={'SubCourses__PlusButton'}
                         onClick={modalStore.ASubCourseAddModalShow}>
                        <use xlinkHref={'#icon-plus'}/>
                    </svg>}
                </div>
                {getButtonSubCourses()}
            </div>
        }

        const getActive = () => {
            return <>{accordionStatus ? <div className={'SubCourses'}>
                <div className={'SubCourses__Title'}>
                    <span>подкурсы </span>
                    {acourseStore.courseData?.draft &&
                    <svg aria-hidden="true" height="20" width="20" className={'SubCourses__PlusButton'}
                         onClick={modalStore.ASubCourseAddModalShow}>
                        <use xlinkHref={'#icon-plus'}/>
                    </svg>}
                </div>
                {getButtonSubCourses()}
                {/*<button type="button"*/}
                {/*        className={`btn btn-outline-dark SubCourses__ButtonSubActive`}*/}
                {/*        onClick={() => {*/}
                {/*            SetAccordion(false)*/}
                {/*        }}>*/}
                {/*    свернуть*/}
                {/*</button>*/}
            </div> : <div className={'SubCourses'}>
                <div className={'SubCourses__Title'}>
                    <span>активный подкурс </span>
                </div>
                <button type="button"
                        className={`btn btn-outline-dark SubCourses__ButtonSubActive active`}>
                    {asubCourseStore.subCourseData?.name}
                </button>
                <button type="button"
                        className={`btn btn-outline-dark SubCourses__ButtonSubActive`}>
                    редактировать
                </button>
                <button type="button"
                        className={`btn btn-outline-dark SubCourses__ButtonSubActive`}
                        onClick={() => {
                            SetAccordion(true)
                            history.push(`/apanel/course/${queryParams?.courseID}`)
                        }}>
                    сменить подкурс
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
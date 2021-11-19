import React from "react";
import {inject, observer} from "mobx-react";
import Moment from "moment";
import {dayText, mounthText} from "../../../../../../utils/DateService";
import StickyBox from "react-sticky-box";
import {useHistory, useParams} from "react-router-dom";
import {Col, Row} from "react-bootstrap";

const LessonListBlock = inject('userStore', 'asubCourseStore', 'modalStore', 'alessonStore', 'acourseStore')(observer((store) => {
    const {asubCourseStore, modalStore, alessonStore, acourseStore} = store

    const history = useHistory();
    const queryParams = useParams()

    const getDate = (date) => {
        const newDate = Moment(date, "DD.MM.YYYY")
        return `${newDate.date()} ${mounthText(newDate.month())}, ${dayText(newDate.day())}`
    }

    const getTime = (date) => {
        const newDate = Moment(date, "H:m")
        let hour = newDate.hour(newDate.hour()).format('HH')
        let minute = newDate.minute(newDate.minutes()).format('mm')
        return `${hour}:${minute}`
    }

    const getLesson = (lessonID, item, type) => {
        return (
            <div onClick={() => {
                alessonStore.setLessonType(type)
                history.push(`/apanel/course${queryParams?.courseID}/sub${queryParams?.subID}/lesson${lessonID}`)
            }}
                 className={`LessonList__Left__Item__Content ${(lessonID === Number(queryParams?.lessonID) && alessonStore.lessonType === type) ? 'LessonList__Left__Item__Active' : ''} ${item.isOpen ? 'LessonList__Left__Item__ItemOpen' : 'LessonList__Left__Item__ItemClose'}`}>
                <div className="LessonList__Left__Item__Time">
                    {item.time && `${getTime(item.time)}мск`}
                </div>
                <div className="LessonList__Left__Item__Data">
                    <div className="LessonList__Left__Item__Data__Chips">
                        <div className="LessonList__Left__Item__Data__Chips__Item">
                            {type === 'lecture' && 'Лекция'}
                            {type === 'testPOL' && 'Тест на пол.'}
                            {type === 'testCHL' && 'Тест на цел.'}
                            {type === 'taskABC' && 'Задание'}
                        </div>
                        <svg fill="none" height="20" width="20" onClick={modalStore.ALessonEditModalShow}>
                            <use xlinkHref={'#icon-pencil'}/>
                        </svg>
                    </div>

                    <div className="LessonList__Left__Item__Data__Title">
                        {item.name}
                    </div>
                </div>
            </div>
        )
    }


    // const getLessons = (data, lessonDate) => {
    //     return data?.map((item, i) =>
    //         <div key={i} onClick={() => {
    //             history.push(`/apanel/course${queryParams?.courseID}/sub${queryParams?.subID}/lesson${item.id}`)
    //         }}
    //              className={`LessonList__Left__Item__Content ${item.id === Number(queryParams?.lessonID) ? 'LessonList__Left__Item__Active' : ''} ${item.isOpen ? 'LessonList__Left__Item__ItemOpen' : 'LessonList__Left__Item__ItemClose'}`}>
    //             <div className="LessonList__Left__Item__Time">
    //                 {item.video && `${getTime(lessonDate)}мск`}
    //             </div>
    //             <div className="LessonList__Left__Item__Data">
    //                 <div className="LessonList__Left__Item__Data__Chips">
    //                     <div className="LessonList__Left__Item__Data__Chips__Item">
    //                         {item.video && 'Видео'}
    //                         {item.homework && 'Домашка'}
    //                         {item.files && 'Файл'}
    //                     </div>
    //                     <svg fill="none" height="20" width="20" onClick={modalStore.ALessonEditModalShow}>
    //                         <use xlinkHref={'#icon-pencil'}/>
    //                     </svg>
    //                 </div>
    //
    //                 <div className="LessonList__Left__Item__Data__Title">
    //                     {item.video && item.video?.name}
    //                     {item.homework && item.homework?.name}
    //                     {item.files && item.files?.name}
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }

    const getItemsLeasons = () => {
        return asubCourseStore?.subCourseData?.lessons?.map((item, i) =>
            <div className="LessonList__Left__Item" key={i}>
                <StickyBox offsetTop={136} offsetBottom={20} className="LessonList__Left__Item__Date">
                    <p className={`${item?.isOpen ? 'Open' : 'Close'}`}>{getDate(item.date)}</p>
                    <div className="LessonList__Left__Item__Date__Admin" onClick={() => {
                        alessonStore.setLessonID(acourseStore.courseID, asubCourseStore.subCourseID, item.id)
                    }}>
                        <svg fill="none" height="20" width="20" onClick={modalStore.ALessonListEditModalShow}>
                            <use xlinkHref={'#icon-pencil'}/>
                        </svg>

                        {(!item.lecture || !item.testPOL || !item.testCHL || !item.taskABC) &&
                        <svg aria-hidden="true" height="20" width="20" onClick={modalStore.ALessonAddModalShow}>
                            <use xlinkHref={'#icon-plus'}/>
                        </svg>}

                    </div>
                </StickyBox>
                <div className="LessonList__Left__Item__Panel">
                    <div className="LessonList__Left__Item__Wrapper">
                        {item.lecture && getLesson(item.id, item.lecture, 'lecture')}
                        {item.testPOL && getLesson(item.id, item.testPOL, 'testPOL')}
                        {item.testCHL && getLesson(item.id, item.testCHL, 'testCHL')}
                        {item.taskABC && getLesson(item.id, item.taskABC, 'taskABC')}
                        {/*{getLessons(item.lessonList, item.lessonDate)}*/}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="LessonList__Left">
            <div className="LessonList__Left__RowButton">
                <Row>
                    <Col>
                        <button type="button" className={`btn btn-outline-dark`}
                                onClick={modalStore.ALessonListAddModalShow}>
                            добавить занятие
                        </button>
                    </Col>
                </Row>
            </div>
            {getItemsLeasons()}
        </div>
    )
}))

export default LessonListBlock;
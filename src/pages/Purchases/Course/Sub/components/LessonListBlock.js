import React from "react";
import {inject, observer} from "mobx-react";
import {dayText, mounthText} from "../../../../../utils/DateService";
import Moment from 'moment';
import StickyBox from "react-sticky-box";
import {useHistory, useParams} from "react-router-dom";

const LessonListBlock = inject('purchaseStore', 'subCourseStore', 'lessonStore', 'courseStore')(observer((store) => {
    const {subCourseStore, lessonStore} = store
    const history = useHistory();
    const queryParams = useParams()

    const getDate = (date) => {
        const newDate = Moment(date, "YYYY-MM-DD")
        return `${newDate.date()} ${mounthText(newDate.month())}, ${dayText(newDate.day())}`
    }

    const getTime = (date) => {
        const newDate = Moment(date, "H:m")
        let hour = newDate.hour(newDate.hour()).format('HH')
        let minute = newDate.minute(newDate.minutes()).format('mm')
        return `${hour}:${minute}`
    }


    const getLessons = (lessonID, item, type) => {
        return (
            <div onClick={() => {
                lessonStore.setLessonType(type)
                history.push(`/purchases${queryParams?.purchaseID}/sub${queryParams?.subID}/lesson${lessonID}`)
            }}
                 className={`LessonList__Left__Item__Content ${(lessonID === Number(queryParams?.lessonID) && lessonStore.lessonType === type) ? 'LessonList__Left__Item__Active' : ''} LessonList__Left__Item__ItemDefault`}>
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
                        {/*{item.homework &&*/}
                        {/*<div className="LessonList__Left__Item__Data__Chips__Item">*/}
                        {/*    {!item.homework?.answerStatus && 'решена'}*/}
                        {/*    {item.homework?.answerStatus && 'не решена'}*/}
                        {/*</div>}*/}
                    </div>
                    <div className="LessonList__Left__Item__Data__Title">
                        {item.lecture && item.lecture?.name}
                        {item.testPOL && item.testPOL?.name}
                        {item.testCHL && item.testCHL?.name}
                        {item.taskABC && item.taskABC?.name}
                    </div>
                    <div className="LessonList__Left__Item__Data__Title">
                        {item.name}
                    </div>
                </div>
            </div>
        )
    }

    const getItemsLeasons = () => {
        return subCourseStore?.subCourseData?.lessons?.map((item, i) =>
            <div className="LessonList__Left__Item" key={i}>
                <StickyBox offsetTop={66} offsetBottom={20} className="LessonList__Left__Item__Date">
                    {getDate(item.date)}
                </StickyBox>
                <div className="LessonList__Left__Item__Panel">
                    <div className="LessonList__Left__Item__Wrapper">
                        {item.lecture && getLessons(item.id, item.lecture, 'lecture')}
                        {item.testPOL && getLessons(item.id, item.testPOL, 'testPOL')}
                        {item.testCHL && getLessons(item.id, item.testCHL, 'testCHL')}
                        {item.taskABC && getLessons(item.id, item.taskABC, 'taskABC')}

                    </div>
                </div>
            </div>
        )
    }

    return (<div className="LessonList__Left">
            {getItemsLeasons()}
        </div>
    )
}))

export default LessonListBlock;
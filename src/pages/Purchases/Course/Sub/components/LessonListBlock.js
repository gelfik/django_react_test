import React from "react";
import {inject, observer} from "mobx-react";
import {dayText, mounthText} from "../../../../../utils/DateService";
import Moment from 'moment';
import StickyBox from "react-sticky-box";
import {useHistory, useParams} from "react-router-dom";

const LessonListBlock = inject('purchaseStore', 'subCourseStore')(observer((store) => {
    const {subCourseStore} = store
    const history = useHistory();
    const queryParams = useParams()

    const getDate = (date) => {
        const newDate = Moment(date, "DD.MM.YYYY H:m")
        return `${newDate.date()} ${mounthText(newDate.month())}, ${dayText(newDate.day())}`
    }

    const getTime = (date) => {
        const newDate = Moment(date, "DD.MM.YYYY H:m")
        let hour = newDate.hour(newDate.hour()).format('HH')
        let minute = newDate.minute(newDate.minutes()).format('mm')
        return `${hour}:${minute}`
    }


    const getLessons = (data, lessonDate) => {
        return data?.map((item, i) =>
            <div key={i} onClick={() => {
                history.push(`/purchases/${queryParams?.purchaseID}/sub/${queryParams?.subID}/lesson/${item.id}`)
            }}
                 className={`LessonList__Left__Item__Content ${item.id === Number(queryParams?.lessonID) ? 'LessonList__Left__Item__Active' : ''}`}>
                <div className="LessonList__Left__Item__Time">
                    {item.video && `${getTime(lessonDate)}мск`}
                </div>
                <div className="LessonList__Left__Item__Data">
                    <div className="LessonList__Left__Item__Data__Chips">
                        <div className="LessonList__Left__Item__Data__Chips__Item">
                            {item.video && 'Видео'}
                            {item.homework && 'Домашка'}
                            {item.files && 'Файл'}

                        </div>
                        {item.homework &&
                        <div className="LessonList__Left__Item__Data__Chips__Item">
                            {item.homework?.answerStatus && 'решена'}
                            {!item.homework?.answerStatus && 'не решена'}
                        </div>}
                    </div>
                    <div className="LessonList__Left__Item__Data__Title">
                        {item.video && item.video?.name}
                        {item.homework && item.homework?.name}
                        {item.files && item.files?.name}
                    </div>
                </div>
            </div>
        )
    }

    const getItemsLeasons = () => {
        return subCourseStore?.subCourseData?.lessons?.map((item, i) =>
            <div className="LessonList__Left__Item" key={i}>
                <StickyBox offsetTop={66} offsetBottom={20} className="LessonList__Left__Item__Date">
                    {getDate(item.lessonDate)}
                </StickyBox>
                <div className="LessonList__Left__Item__Panel">
                    <div className="LessonList__Left__Item__Wrapper">
                        {getLessons(item.lessonList, item.lessonDate)}
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
import React from "react";
import {inject, observer} from "mobx-react";
import Moment from "moment";
import {dayText, mounthText} from "../../../../../../utils/DateService";
import StickyBox from "react-sticky-box";
import {useHistory, useParams} from "react-router-dom";

const LessonListBlock = inject('userStore', 'asubCourseStore')(observer((store) => {
    const {asubCourseStore} = store

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
                history.push(`/apanel/course/${queryParams?.courseID}/sub/${queryParams?.subID}/lesson/${item.id}`)
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
                        {!item.isOpen && <div className="LessonList__Left__Item__Data__Chips__ItemClose">
                            Закрыт
                        </div>}
                        {item.isOpen && <div className="LessonList__Left__Item__Data__Chips__ItemOpen">
                            Открыт
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
        return asubCourseStore?.subCourseData?.lessons?.map((item, i) =>
            <div className="LessonList__Left__Item" key={i}>
                <StickyBox offsetTop={66} offsetBottom={20} className="LessonList__Left__Item__Date">
                    <p>{getDate(item.lessonDate)}</p>
                    {item?.isOpen && 'Открыт'}
                    {!item?.isOpen && 'Закрыт'}
                    <div className="LessonList__Left__Item__Date__Admin">
                        <svg fill="none" height="20" width="20">
                            <use xlinkHref={'#icon-pencil'}/>
                        </svg>
                        <svg aria-hidden="true" height="20" width="20">
                            <use xlinkHref={'#icon-plus'}/>
                        </svg>
                    </div>
                </StickyBox>
                <div className="LessonList__Left__Item__Panel">
                    <div className="LessonList__Left__Item__Wrapper">
                        {getLessons(item.lessonList, item.lessonDate)}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="LessonList__Left">
            {getItemsLeasons()}
        </div>
    )
}))

export default LessonListBlock;
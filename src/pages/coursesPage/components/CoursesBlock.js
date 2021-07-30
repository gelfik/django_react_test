import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {FloatingLabel, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

const CoursesBlock = inject('userStore', 'coursesPageStore')(observer((store) => {
    const {coursesPageStore} = store

    // useEffect(() => {
    //     if (coursesPageStore.coursesData.length === 0) {
    //         coursesPageStore.loadCoursesData()
    //     }
    // }, [coursesPageStore.coursesData])

    useEffect(() => {
        coursesPageStore.loadFilterRequest()
    }, [coursesPageStore.filterRequest])

    const getCoursesList = () => {
        if (coursesPageStore?.coursesData?.results?.length === 0) {
            return <div className="display-6">
                Курсы по заданному фильтру не найдены!
            </div>
        }
        return <ul className="trainings__list">
            {getItemCourses()}
        </ul>
    }

    const getItemCourses = () => {
        return coursesPageStore?.coursesData?.results?.map((item, i) =>
                // <div key={i} className="col-lg-4 col-12">
                <li key={i} className="trainings__item rounded-4">
                    <Link className={'card-training'} to={`courses/${item.id}`}>
                        <div className="card-training__info">
                            <div className="card-training__title">
                                <h3>{item.predmet} {item.courseExamType}. {item.courseName}</h3>
                            </div>
                            <div className="card-training__desc">
                                <div className="card-training__lesson-wrap">
                                    <div className={'card-training__lesson-name card-training__lesson-name--malachite'}>
                                        <span>{item.predmet}</span>
                                    </div>
                                    <div className="card-training__lesson-type">
                                        <span>{item.courseExamType}</span>
                                    </div>
                                </div>
                                <div className="card-training__lesson-price">
                                    <p className="card-training__lesson-price-new">
                                        {item.price} ₽
                                        <span>/мес</span>
                                    </p>
                                </div>
                            </div>
                            <div className="card-training__teacher">
                                <div className="card-training__lesson-form">
                                    <p>курс</p>
                                </div>
                                <div className="card-training__author">
                                    <div className="card-training__author-img">
                                        <img src={`${item.teacher.avatar.url}${item.teacher.avatar.small}`}
                                             alt={`${item.teacher.lastName} ${item.teacher.firstName}`} width={40}
                                             height={40}/>
                                    </div>
                                    <div className="card-training__author-name">
                                        <p>{item.teacher.firstName}</p>
                                        <p>{item.teacher.lastName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Link>
                </li>
            // </div>
        )
    }

    return (
        <>
            {getCoursesList()}
        </>
    )
}))

export default CoursesBlock;
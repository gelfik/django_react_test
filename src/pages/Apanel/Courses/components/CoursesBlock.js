import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import Spinner from "../../../../components/Spinner";

const CoursesBlock = inject('userStore', 'acoursesStore')(observer((store) => {
    const {acoursesStore} = store


    useEffect(() => {
        if (!acoursesStore.spinner.spinnerStatus) {
            acoursesStore.loadFilterRequest()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [acoursesStore.filterRequest])

    const getCoursesList = () => {
        if (acoursesStore?.coursesData?.results?.length === 0) {
            return <div className="display-6">
                Курсы по заданному фильтру не найдены!
            </div>
        }
        return <>{getItemCourses()}</>
    }

    const getItemCourses = () => {
        return acoursesStore?.coursesData?.map((item, i) =>
            <div className="Course__Item" key={i}>
                <div className="Course__Item__Content">
                    <div className="Course__Item__Header">
                        <Link to={`/apanel/courses/${item?.id}`} className="Course__Item__Data">
                            <div className="Course__Item__Avatar">
                                <img src={`${item?.coursePicture}`} alt=''/>
                            </div>
                            <div className="Course__Item__Title">
                                <p>{item?.name}</p>
                                <div className="Chips">
                                    <div className="Chips__Item">
                                        {item?.predmet}
                                        <span/>
                                    </div>
                                    <div className="Chips__Item">
                                        {item?.courseExamType}
                                    </div>
                                    <div className="Chips__Item">
                                        {item?.courseType}
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="Course__Item__APanel">
                            {item?.draft &&
                            <div className="Course__Item__APanel__Draft">
                                <p className="IsDraft">черновик</p>
                            </div>}
                            {!item?.draft &&
                            <div className="Course__Item__APanel__UserCount">
                                <p>{item?.purchaseCount} покупок</p>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    // {coursesPageStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <CoursesBlock/>}

    return (
        <div className="Course">
            {acoursesStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : getCoursesList()}
        </div>
    )
}))

export default CoursesBlock;
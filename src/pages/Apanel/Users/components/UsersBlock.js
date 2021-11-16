import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import Spinner from "../../../../components/Spinner";

const UsersBlock = inject('userStore', 'ausersListStore')(observer((store) => {
    const {ausersListStore} = store


    useEffect(() => {
        if (!ausersListStore.spinner.spinnerStatus) {
            ausersListStore.loadFilterRequest()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ausersListStore.filterRequest])

    const getUsersList = () => {
        if (ausersListStore?.usersData?.results?.length === 0) {
            return <div className="display-6">
                Пользователь не найден!
            </div>
        }
        return <>{getItemCourses()}</>
    }

    const getItemCourses = () => {
        return ausersListStore?.usersData?.results?.map((item, i) =>
            <div className="UsersList__Item" key={i}>
                <div className="UsersList__Item__Content">
                    <div className="UsersList__Item__Wrapper">
                        <Link className="UsersList__Item__Data" to={`/apanel/users/user${item?.id}`}>
                            <div className="UsersList__Item__Avatar">
                                <img src={item?.avatar?.file?.small} alt={`${item?.lastName} ${item?.firstName}`}/>
                            </div>
                            <div className="UsersList__Item__Title">
                                <p>{item?.lastName} {item?.firstName}</p>
                                <div className="Chips">
                                    {item?.isTeacher && <div className="Chips__Item">
                                        Преподаватель
                                        <span/>
                                    </div>}
                                    {item?.isMentor && <div className="Chips__Item">
                                        Наставник
                                        <span/>
                                    </div>}
                                    {item?.username && <div className="Chips__Item">
                                        {item?.username}
                                    </div>}
                                    {item?.email && <div className="Chips__Item">
                                        {item?.email}
                                    </div>}
                                    {item?.phone && <div className="Chips__Item">
                                        {item?.phone}
                                    </div>}
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
    // {coursesPageStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <CourseBlock/>}

    return (
        <div className="UsersList">
            {ausersListStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : getUsersList()}
        </div>
    )
}))

export default UsersBlock;
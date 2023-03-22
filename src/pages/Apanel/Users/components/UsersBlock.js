import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";
import Spinner from "../../../../components/Spinner";
import {Row, Col} from "react-bootstrap";

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
            <Col md={4} key={i}>
                <div className="UsersList__Item" >
                    <div className="UsersList__Item__Content">
                        <div className="UsersList__Item__Wrapper">
                            <Link className="UsersList__Item__Data" to={`/apanel/users/user${item?.id}`}>
                                <div className="UsersList__Item__Avatar">
                                    <img src={item?.avatar?.file?.small} alt={`${item?.lastName} ${item?.firstName}`}/>
                                </div>
                                <div className="UsersList__Item__Title">
                                    <div
                                        className="UsersList__Item__Title__Name">{item?.lastName} {item?.firstName}</div>
                                    <div className="Chips">
                                        {item?.isTeacher && <div className="Chips__Item">
                                            Преподаватель
                                            <span/>
                                        </div>}
                                        {item?.isMentor && <div className="Chips__Item">
                                            Наставник
                                            <span/>
                                        </div>}
                                    </div>
                                    <div className="UsersList__Item__Title__Links">
                                        <div
                                           className={"UsersList__Item__Title__Links__Button"}
                                           onClick={(e)=>{e.preventDefault();window.open(`${item?.vkLink}`, "_blank")}}>
                                            <svg aria-hidden="true" height="20" width="20">
                                                <use xlinkHref={'#icon-vk-2'}/>
                                            </svg>
                                            <p> перейти</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </Col>
        )
    }
    // {coursesPageStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <CourseBlock/>}

    return (
        <div className="UsersList">
            <Row>
                {ausersListStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : getUsersList()}
            </Row>
        </div>
    )
}))

export default UsersBlock;
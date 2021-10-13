import React from "react";
import {inject, observer} from "mobx-react";
import {Link, useHistory} from "react-router-dom";

const ComandBlock = inject('userStore')(observer((store) => {
    const {userStore} = store
    const history = useHistory();

    return (
        // <div className="Navigation-Wrapper">
            <div className="Navigation">
                <Link to={'/apanel'} className="Navigation__User" >
                    <img src={userStore.userData.avatar?.small} alt={`${userStore.userData.lastName} ${userStore.userData.firstName}`}/>
                    
                    <div className="Navigation__User__Name">
                        {userStore.userData.lastName} {userStore.userData.firstName}
                    </div>
                    <div className="Navigation__User__Role">
                        {userStore.userData.isTeacher && 'Преподаватель'}
                        {userStore.userData.isMentor && 'Наставник'}
                    </div>
                </Link>
                <Link to={'/apanel/course'} className={`Navigation__Item ${history.location.pathname.startsWith('/apanel/course') && 'Active'}`} >
                    <svg width="32" height="32">
                        <use xlinkHref={'#icon-course'}/>
                    </svg>
                    <span>курсы</span>
                </Link>
                <Link to={'/apanel/users'} className={`Navigation__Item ${history.location.pathname.startsWith('/apanel/users') && 'Active'}`}>
                    <svg width="32" height="32">
                        <use xlinkHref={'#icon-user'}/>
                    </svg>
                    <span>пользователи</span>
                </Link>
            </div>
        // </div>
    )
}))

export default ComandBlock;
import React from "react";
import {inject, observer} from "mobx-react";

const MentorBlock = inject('userStore', 'acourseStore', 'modalStore')(observer((store) => {
    const {acourseStore} = store

    const getMentors = () => {
        if (acourseStore?.courseData?.mentors?.length === 0) {
            return <div className="Course__Contact__Item">
                <div className="Course__Contact__Item__Content">
                    <div className="Course__Contact__Item__Content__Name">
                        <p>
                            наставники еще не добавлены
                        </p>
                    </div>
                </div>
            </div>
        }

        return acourseStore?.courseData?.mentors?.map((item, i) =>
            <div className="Course__Contact__Item" key={i}>
                <img src={`${item?.avatar?.file?.small}`}
                     alt={`${item?.firstName} ${item?.lastName}`}/>
                <div className="Course__Contact__Item__Content">
                    <div className="Course__Contact__Item__Content__Name">
                        <span
                            className='Course__Contact__Item__Content__Name__User'>{item?.firstName} {item?.lastName} </span>
                    </div>

                    <div className="Course__Contact__Item__Content__Links">
                        <a href={item?.vkLink}
                           rel="noreferrer"
                           className={"Course__Contact__Item__Content__Links__Button"}
                           target="_blank">
                            <svg aria-hidden="true" height="20" width="20">
                                <use xlinkHref={'#icon-vk-2'}/>
                            </svg>
                            <p> перейти</p>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="Course__Contact">
            <div className="Course__Contact__Teacher">
                <div className="Course__Contact__Title">
                    <span>наставники </span>
                    <svg aria-hidden="true" height="20" width="20">
                        <use xlinkHref={'#icon-plus'}/>
                    </svg>
                </div>
                {getMentors()}
            </div>
        </div>
    )
}))

export default MentorBlock;
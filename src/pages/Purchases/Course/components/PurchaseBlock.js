import React from "react";
import {inject, observer} from "mobx-react";
import {Link, useHistory, useParams} from "react-router-dom";
import {Row, Col} from "react-bootstrap";

const PurchaseBlock = inject('purchaseStore', 'modalStore')(observer((store) => {
    const {purchaseStore, modalStore} = store
    const history = useHistory();
    const queryParams = useParams()

    const getMentors = () => {
        return purchaseStore?.purchaseData?.course?.mentors?.map((item, i) =>
            <div key={i} className="Course__Contact__Item Course__Contact__Mentors__Item">
                <img src={`${item?.avatar?.file?.small}`}
                     alt={`${item?.firstName} ${item?.lastName}`}/>
                <div className="Course__Contact__Item__Content">
                    <div className="Course__Contact__Item__Content__Name">
                        <p>
                            {item?.firstName} {item?.lastName}
                        </p>
                    </div>

                    <div className="Course__Contact__Item__Content__Links">
                        <a href={item?.vkLink}
                           rel="noreferrer"
                           className={"Course__Contact__Item__Content__Links__Button"}
                           target="_blank">
                            <svg aria-hidden="true" height="20" width="20">
                                <use xlinkHref={'#icon-vk-2'}/>
                            </svg>
                            <p>
                                перейти
                            </p>
                        </a>
                    </div>
                </div>
            </div>
        )
    }


    const getButtonSubCourses = () => {
        return purchaseStore?.purchaseData?.pay?.map((item, i) =>
            <button type="button"
                    className={`btn btn-outline-dark SubCourses__ButtonSubActive ${item.courseSub.id === Number(queryParams?.subID) ? 'active' : ''}`}
                    key={i} onClick={() => {
                history.push(`/purchases${queryParams?.purchaseID}/sub${item.courseSub.id}`)
            }}>
                {item.courseSub.name}
            </button>
        )
    }

    return (
        <section className={'Course CoursePage'}>

            <Row>
                <Col md={9}>
                    <div className="Course__Left">
                        <div className="Course__Item">
                            <div className="Course__Item__Content">
                                <div className="Course__Item__Header">
                                    <div className="Course__Item__Data">
                                        <div className="Course__Item__Avatar">
                                            <img src={`${purchaseStore?.purchaseData?.course?.coursePicture}`}
                                                 alt=''/>
                                        </div>
                                        <div className="Course__Item__Title">
                                            <p>{purchaseStore?.purchaseData?.course?.name}</p>
                                            <div className="Chips">
                                                <div className="Chips__Item">
                                                    {purchaseStore?.purchaseData?.course?.predmet}
                                                    <span/>
                                                </div>
                                                <div className="Chips__Item">
                                                    {purchaseStore?.purchaseData?.course?.courseExamType}
                                                </div>
                                                <div className="Chips__Item">
                                                    {purchaseStore?.purchaseData?.course?.courseType}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="Course__Item__PayInfo">
                                        {purchaseStore?.purchaseData?.courseSubAll &&
                                        <span className="Course__Item__PayInfo__PayStatus">
                                        <svg fill="none" height="16" width="16">
                                            <use xlinkHref={'#check-valid'}/>
                                        </svg>
                                        <p>Курс куплен полностью</p>
                                    </span>
                                        }
                                        {!purchaseStore?.purchaseData?.courseSubAll &&
                                        <Link to={`/purchases${purchaseStore?.purchaseData?.id}/purchase`}
                                              className="Course__Item__PayInfo__Link">докупить
                                            курс</Link>}
                                        <div className="Course__Item__PayInfo__Link" onClick={() => {
                                            modalStore.PurchaseDetailModalShow();
                                        }}>история платежей
                                        </div>
                                        <Link to={`/purchases${purchaseStore?.purchaseData?.id}/statistics`}
                                              className="Course__Item__PayInfo__Link">моя статистика</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={'SubCourses'}>
                            <h3>подкурсы</h3>
                            {getButtonSubCourses()}
                        </div>
                    </div>
                </Col>
                <Col md={3}>
                    <div className="Course__Contact Course__Right">
                        <div className="Course__Contact__Teacher">
                            <div className="Course__Contact__Title">
                                преподаватель
                            </div>
                            <div className="Course__Contact__Item">
                                <img
                                    src={`${purchaseStore?.purchaseData?.course?.teacher?.user?.avatar?.file?.small}`}
                                    alt={`${purchaseStore?.purchaseData?.course?.teacher?.user?.firstName} ${purchaseStore?.purchaseData?.course?.teacher?.user?.lastName}`}/>
                                <div className="Course__Contact__Item__Content">
                                    <div className="Course__Contact__Item__Content__Name">
                                        <p>
                                            {purchaseStore?.purchaseData?.course?.teacher?.user?.firstName} {purchaseStore?.purchaseData?.course?.teacher?.user?.lastName}
                                        </p>
                                    </div>

                                    <div className="Course__Contact__Item__Content__Links">

                                        {purchaseStore?.purchaseData?.course?.teacher?.teacherLink?.vk && (
                                            <TeacherSocial
                                                type={"vk"}
                                                teacher={purchaseStore?.purchaseData?.course?.teacher}
                                            />
                                        )}
                                        {purchaseStore?.purchaseData?.course?.teacher?.teacherLink
                                            ?.instagram && (
                                            <TeacherSocial
                                                type={"instagram"}
                                                teacher={purchaseStore?.purchaseData?.course?.teacher}
                                            />
                                        )}
                                        {purchaseStore?.purchaseData?.course?.teacher?.teacherLink
                                            ?.telegram && (
                                            <TeacherSocial
                                                type={"telegram"}
                                                teacher={purchaseStore?.purchaseData?.course?.teacher}
                                            />
                                        )}
                                        {purchaseStore?.purchaseData?.course?.teacher?.teacherLink?.youtube && (
                                            <TeacherSocial
                                                type={"youtube"}
                                                teacher={purchaseStore?.purchaseData?.course?.teacher}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {purchaseStore?.purchaseData?.course?.mentors?.length > 0 &&
                        <div className="Course__Contact__Teacher Course__Contact__Mentors">
                            <div className="Course__Contact__Title">
                                наставник
                            </div>
                            {getMentors()}
                        </div>}
                    </div>
                </Col>
            </Row>
        </section>
    )
}))


const TeacherSocial = ({type, teacher}) => {
        const svgType = () => {
            switch (type) {
                case "vk":
                    return (
                        <svg aria-hidden="true" height="20" width="20">
                            <use xlinkHref={'#icon-vk-2'}/>
                        </svg>
                    );
                case "instagram":
                    return (
                        <svg aria-hidden="true" height="20" width="20">
                            <use xlinkHref={'#icon-instagram-2'}/>
                        </svg>
                    );
                case "telegram":
                    return (
                        <svg aria-hidden="true" height="20" width="20">
                            <use xlinkHref={'#icon-telegram-2'}/>
                        </svg>
                    );
                case "youtube":
                    return (
                        <svg aria-hidden="true" height="20" width="20">
                            <use xlinkHref={'#icon-youtube-2'}/>
                        </svg>
                    );
                default:
                    return null;
            }
        };

        return (
            <a href={teacher.teacherLink[type]}
               rel="noreferrer"
               className={"Course__Contact__Item__Content__Links__Button"}
               target="_blank">
                {svgType()}
            </a>
        );
    }
;


export default PurchaseBlock;
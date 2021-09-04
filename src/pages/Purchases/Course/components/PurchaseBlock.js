import React from "react";
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

const PurchaseBlock = inject('purchaseStore', 'modalStore')(observer((store) => {
    const {purchaseStore, modalStore} = store

    const getMentors = () => {
        return purchaseStore?.purchaseData?.course?.mentors?.map((item, i) =>
            <div className="Purchase__Contact__Item Purchase__Contact__Mentors__Item">
                <img src={`${item?.avatar?.file?.small}`}
                     alt={`${item?.firstName} ${item?.lastName}`}/>
                <div className="Purchase__Contact__Item__Content">
                    <div className="Purchase__Contact__Item__Content__Name">
                        <p>
                            {item?.firstName} {item?.lastName}
                        </p>
                    </div>

                    <div className="Purchase__Contact__Item__Content__Links">
                        <a href={item?.vkLink}
                           rel="noreferrer"
                           className={"Purchase__Contact__Item__Content__Links__Button"}
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

    return (
        <section className={'Purchase PurchasePage'}>
            <div className="Purchase__Item Purchase__Left">
                <div className="Purchase__Item__Content">
                    <div className="Purchase__Item__Header">
                        <div className="Purchase__Item__Data">
                            <div className="Purchase__Item__Avatar">
                                <img src={`${purchaseStore?.purchaseData?.course?.coursePicture}`} alt=''/>
                            </div>
                            <div className="Purchase__Item__Title">
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
                        <div className="Purchase__Item__PayInfo">
                            {purchaseStore?.purchaseData?.courseSubAll &&
                            <span className="Purchase__Item__PayInfo__PayStatus">
                                        <svg fill="none" height="16" width="16">
                                            <use xlinkHref={'#check-valid'}/>
                                        </svg>
                                        <p>Курс куплен полностью</p>
                                    </span>
                            }
                            {!purchaseStore?.purchaseData?.courseSubAll &&
                            <Link to={`/purchases/${purchaseStore?.purchaseData?.id}/purchase`}
                                  className="Purchase__Item__PayInfo__Link">Докупить
                                курс</Link>}
                            <div className="Purchase__Item__PayInfo__Link" onClick={() => {
                                modalStore.PurchaseDetailModalShow();
                            }}>история платежей
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Purchase__Contact Purchase__Right">
                <div className="Purchase__Contact__Teacher">
                    <div className="Purchase__Contact__Title">
                        преподаватель
                    </div>
                    <div className="Purchase__Contact__Item">
                        <img src={`${purchaseStore?.purchaseData?.course?.teacher?.user?.avatar?.file?.small}`}
                             alt={`${purchaseStore?.purchaseData?.course?.teacher?.user?.firstName} ${purchaseStore?.purchaseData?.course?.teacher?.user?.lastName}`}/>
                        <div className="Purchase__Contact__Item__Content">
                            <div className="Purchase__Contact__Item__Content__Name">
                                <p>
                                    {purchaseStore?.purchaseData?.course?.teacher?.user?.firstName} {purchaseStore?.purchaseData?.course?.teacher?.user?.lastName}
                                </p>
                            </div>

                            <div className="Purchase__Contact__Item__Content__Links">

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
                <div className="Purchase__Contact__Teacher Purchase__Contact__Mentors">
                    <div className="Purchase__Contact__Title">
                        наставник
                    </div>
                    {getMentors()}
                </div>}
            </div>
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
           className={"Purchase__Contact__Item__Content__Links__Button"}
           target="_blank">
            {svgType()}
        </a>
    );
};


export default PurchaseBlock;
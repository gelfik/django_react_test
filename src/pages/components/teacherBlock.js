import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Carousel} from "react-bootstrap";

const TeacherBlock = inject(
    "userStore",
    "mainPageStore"
)(
    observer((store) => {
        const {mainPageStore} = store;
        const [activeTeacher, setActiveTeacher] = useState(0);

        // СДЕЛАТЬ ЗАГРУЗКУ ТОЛЬКО ПРИ ОТКРЫТИИ ЭТОГО КОМПОНЕНТА
        // if (mainPageStore.teacherData.length === 0) {
        //     mainPageStore.loadTeacherData()
        // }

        useEffect(() => {
            if (mainPageStore.teacherData.length === 0) {
                mainPageStore.loadTeacherData();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [mainPageStore.teacherData]);

        const getActiveButton = (index) => {
            if (index === activeTeacher) {
                return "active";
            }
        };

        const getButtonSubject = () => {
            return mainPageStore.teacherData.map((item, i) => (
                <div
                    className={`lesson-slider-alt__tab-item show ${getActiveButton(i)}`}
                    key={i}
                >
                    <button
                        className={`button-like-link btn-reset`}
                        onClick={() => {
                            setActiveTeacher(i);
                        }}
                    >
                        {item.subject}
                    </button>
                </div>
            ));
        };

        const getItemSubject = () => {
            return mainPageStore.teacherData.map((item, i) => (
                <Carousel.Item
                    key={`CarouselItemTeacher_${i}`}
                    style={{transition: ".8s all"}}
                >
                    <img
                        className="d-block w-100 rounded-top-5"
                        src={`${item.user?.avatar?.file?.original}`}
                        alt={`${item.user?.lastName} ${item.user?.firstName} ${item.subject}`}
                    />
                    {/*<Carousel.Caption>*/}
                    <div className={"carousel-caption-my"}>
                        <p className={"carousel-caption-p text-dark fw-bold"}>
                            <span className={"bg-white"}>{`${item.user?.lastName}`}</span>
                        </p>
                        <p className={"carousel-caption-p text-dark fw-bold"}>
                            <span className={"bg-white"}>{`${item.user?.firstName}`}</span>
                        </p>
                    </div>
                    {/*<div className="carousel-social">*/}
                    {/*    {getIcon()}*/}
                    {/*</div>*/}
                    {/*</Carousel.Caption>*/}
                    <div className="p-3 bg-white rounded-bottom-5">
                        <svg height={'64'} width={'64'} className={'desktop-none'} style={{position: 'absolute', right: '1rem'}}>
                            <use xlinkHref={'#icon-swipe-2'}/>
                        </svg>
                        {getIcon()}
                        <h2 className={"text-dark position-relative"}>
                            {item?.shortDescription}
                        </h2>
                        <h4 className={"text-dark text-muted position-relative desktop-none"}>
                            {item?.subject}
                        </h4>
                        <p className={"text-dark position-relative"}
                           style={{whiteSpace: 'break-spaces'}}>{item?.description}</p>
                    </div>
                </Carousel.Item>
            ));
        };

        const handleSelect = (selectedIndex, e) => {
            setActiveTeacher(selectedIndex);
        };

        const getIcon = () => {
            let linkStatus = false;
            if (
                mainPageStore.teacherData[activeTeacher]?.teacherLink?.vk ||
                mainPageStore.teacherData[activeTeacher]?.teacherLink?.instagram ||
                mainPageStore.teacherData[activeTeacher]?.teacherLink?.telegram ||
                mainPageStore.teacherData[activeTeacher]?.teacherLink?.youtube
            )
                linkStatus = true;
            if (linkStatus)
                return (
                    <ul className={"list-inline icon-social-list"}>
                        {mainPageStore.teacherData[activeTeacher]?.teacherLink?.vk && (
                            <TeacherSocial
                                type={"vk"}
                                teacher={mainPageStore.teacherData[activeTeacher]}
                            />
                        )}
                        {mainPageStore.teacherData[activeTeacher]?.teacherLink
                            ?.instagram && (
                            <TeacherSocial
                                type={"instagram"}
                                teacher={mainPageStore.teacherData[activeTeacher]}
                            />
                        )}
                        {mainPageStore.teacherData[activeTeacher]?.teacherLink
                            ?.telegram && (
                            <TeacherSocial
                                type={"telegram"}
                                teacher={mainPageStore.teacherData[activeTeacher]}
                            />
                        )}
                        {mainPageStore.teacherData[activeTeacher]?.teacherLink?.youtube && (
                            <TeacherSocial
                                type={"youtube"}
                                teacher={mainPageStore.teacherData[activeTeacher]}
                            />
                        )}
                    </ul>
                );
        };

        return (
            <div className="new-section ">
                <div className={"container"}>
                    <div className="row">
                        <div className="col-lg-6 ">
                            <div>
                                <h1 className={"text-white"}>Наши преподаватели</h1>
                                <div className="lesson-slider-alt__tab-list mobile-none">
                                    {getButtonSubject()}
                                </div>
                            </div>
                        </div>
                        <div className="col scroll_y_off">
                            <Carousel
                                controls={false}
                                interval={999999}
                                fade
                                indicators={false}
                                activeIndex={activeTeacher}
                                touch
                                onSelect={handleSelect}
                            >
                                {getItemSubject()}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        );
    })
);

const TeacherSocial = ({type, teacher}) => {
    const svgType = () => {
        switch (type) {
            case "vk":
                return (
                    <svg aria-hidden="true" height="25" width="25">
                        <use xlinkHref={'#icon-vk'}/>
                    </svg>
                );
            case "instagram":
                return (
                    <svg aria-hidden="true" height="25" width="25">
                        <use xlinkHref={'#icon-instagram'}/>
                    </svg>
                );
            case "telegram":
                return (
                    <svg aria-hidden="true" height="25" width="25">
                        <use xlinkHref={'#icon-telegram'}/>
                    </svg>
                );
            case "youtube":
                return (
                    <svg aria-hidden="true" height="25" width="25">
                        <use xlinkHref={'#icon-youtube'}/>
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <li className="list-inline-item m-0">
            <a
                href={teacher.teacherLink[type]}
                rel="noreferrer"
                className={
                    "icon-social icon-social--black icon-social--md icon-social--bg-blue"
                }
                target="_blank"
            >
                {svgType()}
            </a>
        </li>
    );
};

export default TeacherBlock;

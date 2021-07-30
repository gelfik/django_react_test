import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Carousel} from "react-bootstrap";


const TeacherBlock = inject('userStore', 'mainPageStore')(observer((store) => {
    const {mainPageStore} = store
    const [activeTeacher, setActiveTeacher] = useState(0)

    // СДЕЛАТЬ ЗАГРУЗКУ ТОЛЬКО ПРИ ОТКРЫТИИ ЭТОГО КОМПОНЕНТА
    // if (mainPageStore.teacherData.length === 0) {
    //     mainPageStore.loadTeacherData()
    // }

    useEffect(() => {
        if (mainPageStore.teacherData.length === 0) {
            mainPageStore.loadTeacherData()
        }
    }, [mainPageStore.teacherData])

    const getActiveButton = (index) => {
        if (index === activeTeacher) {
            return 'active'
        }
    }

    const getButtonSubject = () => {
        return mainPageStore.teacherData.map((item, i) =>
            <div className={`lesson-slider-alt__tab-item show ${getActiveButton(i)}`} key={i}>
                <button className={`button-like-link btn-reset`}
                        onClick={() => {
                            setActiveTeacher(i)
                        }}>{item.subject}
                </button>
            </div>
        )
    }


    const getItemSubject = () => {
        return mainPageStore.teacherData.map((item, i) =>
            <Carousel.Item key={`CarouselItemTeacher_${i}`}>
                <img
                    className="d-block w-100 rounded-top-5"
                    src={`${item.avatar.url}${item.avatar.orig}`}
                    alt={`${item.lastName} ${item.firstName} ${item.subject}`}
                />
                {/*<Carousel.Caption>*/}
                <div className={'carousel-caption-my'}>
                    <p className={'carousel-caption-p text-dark fw-bold'}><span
                        className={'bg-white'}>{`${item.lastName}`}</span></p>
                    <p className={'carousel-caption-p text-dark fw-bold'}><span
                        className={'bg-white'}>{`${item.firstName}`}</span></p>
                </div>
                {/*<div className="carousel-social">*/}
                {/*    {getIcon()}*/}
                {/*</div>*/}
                {/*</Carousel.Caption>*/}
                <div className="p-3 bg-white rounded-bottom-5">
                    {getIcon()}
                    <h2 className={'text-dark position-relative'}>{item?.shortDescription}</h2>
                    <h4 className={'text-dark text-muted position-relative desktop-none'}>{item?.subject}</h4>
                    <p className={'text-dark position-relative'}>{item?.description}</p>
                </div>
            </Carousel.Item>
        )
    }

    const handleSelect = (selectedIndex, e) => {
        setActiveTeacher(selectedIndex);
    };

    const getIcon = () => {
        let linkStatus = false
        if (mainPageStore.teacherData[activeTeacher]?.teacherLink?.vk || mainPageStore.teacherData[activeTeacher]?.teacherLink?.instagram || mainPageStore.teacherData[activeTeacher]?.teacherLink?.telegram || mainPageStore.teacherData[activeTeacher]?.teacherLink?.youtube)
            linkStatus = true
        if (linkStatus)
            return (<ul className={'list-inline icon-social-list'}>
                {mainPageStore.teacherData[activeTeacher]?.teacherLink?.vk &&
                <TeacherSocial type={'vk'} teacher={mainPageStore.teacherData[activeTeacher]}/>}
                {mainPageStore.teacherData[activeTeacher]?.teacherLink?.instagram &&
                <TeacherSocial type={'instagram'} teacher={mainPageStore.teacherData[activeTeacher]}/>}
                {mainPageStore.teacherData[activeTeacher]?.teacherLink?.telegram &&
                <TeacherSocial type={'telegram'} teacher={mainPageStore.teacherData[activeTeacher]}/>}
                {mainPageStore.teacherData[activeTeacher]?.teacherLink?.youtube &&
                <TeacherSocial type={'youtube'} teacher={mainPageStore.teacherData[activeTeacher]}/>}
            </ul>)
    }


    return (
        <div className="new-section ">
            <div className={'container'}>
                <div className="row">
                    <div className="col-lg-6 mobile-none">
                        <div>
                            <h1 className={'text-white'}>Наши преподаватели</h1>
                            <div className="lesson-slider-alt__tab-list">
                                {getButtonSubject()}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <Carousel controls={false} interval={999999} fade indicators={false} activeIndex={activeTeacher}
                                  touch
                                  onSelect={handleSelect}>
                            {getItemSubject()}
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    )
}))

const TeacherSocial = ({type, teacher}) => {
    const svgType = () => {
        switch (type) {
            case 'vk':
                return (<svg aria-hidden="true" height="25" width="25">
                    <svg id="icon-vk" viewBox="0 0 25 15">
                        <path
                            d="M23.93 1.167h-4.004a.904.904 0 00-.796.476s-1.597 2.941-2.11 3.932c-1.38 2.665-2.274 1.828-2.274.591V1.902A1.344 1.344 0 0013.403.558h-3.01a2.411 2.411 0 00-2.131.99S9.79 1.3 9.79 3.36c0 .51.027 1.98.05 3.212a.888.888 0 01-1.548.614 26.21 26.21 0 01-3.04-5.53.843.843 0 00-.767-.49H.847A.618.618 0 00.263 2c1.105 3.03 5.863 12.552 11.294 12.552h2.286a.903.903 0 00.903-.903v-1.38a.888.888 0 011.495-.647l2.737 2.57c.245.231.57.36.907.36h3.593c1.733 0 1.733-1.203.788-2.133-.665-.655-3.064-3.184-3.064-3.184a1.24 1.24 0 01-.096-1.61c.776-1.021 2.044-2.692 2.582-3.408.736-.978 2.067-3.05.242-3.05z"
                            fill="currentColor"/>
                    </svg>
                </svg>)
            case 'instagram':
                return (<svg aria-hidden="true" height="25" width="25">
                    <svg id="icon-insta" viewBox="0 0 25 25">
                        <path
                            d="M12.842 6.475c-3.58 0-6.547 2.827-6.547 6.348s2.915 6.348 6.547 6.348c3.631 0 6.546-2.877 6.546-6.348 0-3.472-2.966-6.348-6.546-6.348zm0 10.415c-2.302 0-4.194-1.835-4.194-4.067s1.892-4.067 4.194-4.067c2.301 0 4.194 1.835 4.194 4.067s-1.893 4.067-4.194 4.067zM19.644 7.768c.82 0 1.483-.644 1.483-1.439 0-.794-.664-1.438-1.483-1.438-.82 0-1.483.644-1.483 1.438 0 .795.664 1.44 1.483 1.44z"
                            fill="currentColor"/>
                        <path
                            d="M23.48 2.608C22.15 1.268 20.258.574 18.11.574H7.573C3.123.574.157 3.451.157 7.766v10.167c0 2.132.716 3.968 2.148 5.307 1.381 1.29 3.223 1.934 5.32 1.934h10.433c2.2 0 4.041-.694 5.37-1.934 1.382-1.29 2.098-3.125 2.098-5.258V7.766c0-2.083-.716-3.869-2.046-5.158zm-.205 15.374c0 1.538-.562 2.778-1.483 3.62-.92.844-2.2 1.29-3.734 1.29H7.625c-1.535 0-2.813-.446-3.734-1.29-.92-.892-1.381-2.132-1.381-3.67V7.767c0-1.488.46-2.728 1.38-3.62.87-.844 2.2-1.29 3.735-1.29H18.16c1.534 0 2.813.446 3.733 1.339.87.892 1.381 2.132 1.381 3.57v10.217z"
                            fill="currentColor"/>
                    </svg>
                </svg>)
            case 'telegram':
                return (<svg aria-hidden="true" height="25" width="25">
                    <svg id="icon-tg-2" viewBox="0 0 25 19">
                        <path
                            d="M21.477 1.828l-3.239 15.274c-.244 1.078-.881 1.347-1.787.839l-4.935-3.637-2.381 2.29c-.264.264-.484.484-.992.484l.355-5.026 9.146-8.265c.398-.354-.086-.55-.618-.196L5.72 10.71.85 9.187c-1.06-.33-1.078-1.059.22-1.567L20.111.285c.882-.33 1.654.196 1.366 1.543z"
                            fill="currentColor"/>
                    </svg>
                </svg>)
            case 'youtube':
                return (<svg aria-hidden="true" height="25" width="25">
                    <svg id="icon-youtube" viewBox="0 0 25 17">
                        <path
                            d="M24.769 3.43a3.382 3.382 0 00-3.08-3.067 99.7 99.7 0 00-8.167-.321c-4.171 0-7.32.17-9.356.33a3.383 3.383 0 00-3.099 3.071 54.261 54.261 0 00-.232 5.108c0 2.013.107 3.715.23 5.01a3.382 3.382 0 003.099 3.067c2.036.16 5.185.33 9.358.33 3.465 0 6.272-.164 8.166-.321a3.382 3.382 0 003.08-3.068c.125-1.305.233-3.025.233-5.07 0-2.044-.108-3.764-.232-5.068zM10.23 12.05V4.95l7.006 3.55-7.006 3.552z"
                            fill="currentColor"/>
                    </svg>
                </svg>)
            default:
                return null
        }
    }

    return (
        <li className="list-inline-item m-0">
            <a href={teacher.teacherLink[type]} rel="noreferrer"
               className={'icon-social icon-social--black icon-social--md icon-social--bg-blue'} target="_blank" >
                {svgType()}
            </a>
        </li>
    )
}

export default TeacherBlock;
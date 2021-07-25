import {inject, observer} from "mobx-react";
import React, {useEffect, useState} from "react";
import {Carousel} from "react-bootstrap";


const TeacherBlock = inject('userStore', 'mainPageStore')(observer((store) => {
    const {userStore, mainPageStore} = store
    const [activeTeacher, setActiveTeacher] = useState(0)

    // СДЕЛАТЬ ЗАГРУЗКУ ТОЛЬКО ПРИ ОТКРЫТИИ ЭТОГО КОМПОНЕНТА
    // if (mainPageStore.teacherData.length === 0) {
    //     mainPageStore.loadTeacherData()
    // }

    useEffect(()=>{
        if (mainPageStore.teacherData.length === 0) {
            mainPageStore.loadTeacherData()
        }
    }, [mainPageStore.teacherData])

    const getActiveButton = (index) => {
        if (index===activeTeacher) {
            return 'active'
        }
    }

    const getButtonSubject = () => {
        return mainPageStore.teacherData.map((item, i) =>
            <button className={`btn btn btn-outline-dark btn-lg me-2 ${getActiveButton(i)}`} key={`buttonSubject${i}`} onClick={() => {
                setActiveTeacher(i)
            }}>{item.subject}
            </button>
        )
    }


    const getItemSubject = () => {
        return mainPageStore.teacherData.map((item, i) =>
            <Carousel.Item key={`CarouselItemTeacher_${i}`}>
                <img
                    className="d-block w-100 rounded-3"
                    src={`${item.avatar.url}${item.avatar.orig}`}
                    alt={`${item.name} ${item.subject}`}
                />
                <Carousel.Caption>
                    <h3>{`${item.name}`}</h3>
                    <p>{`${item.shortDescription}`}</p>
                </Carousel.Caption>
            </Carousel.Item>
        )
    }

    const handleSelect = (selectedIndex, e) => {
        setActiveTeacher(selectedIndex);
    };

    return (

        <div className="row">
            <div className="col-md-6">
                <div>
                    <h1>Наши преподаватели</h1>
                    {getButtonSubject()}
                </div>
            </div>
            <div className="col">
                <div className={'bg-dark rounded-4 p-3'}>
                    <Carousel fade indicators={false} activeIndex={activeTeacher} touch onSelect={handleSelect}>
                        {getItemSubject()}
                    </Carousel>
                    <p className={'text-white position-relative'}>{mainPageStore?.teacherData[activeTeacher]?.description}</p>
                </div>
            </div>
        </div>
    )
}))


export default TeacherBlock;
import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Link, useParams} from "react-router-dom";
import Spinner from "../../../components/Spinner";

const BannerBlock = inject('userStore', 'coursePageStore', 'modalStore')(observer((store) => {
    const {userStore, coursePageStore, modalStore} = store
    const queryParams = useParams()

    useEffect(() => {
        if ((coursePageStore.courseData.length === 0) || (Number(coursePageStore?.courseData?.id) !== Number(queryParams?.courseID))) {
            coursePageStore.loadCourseData(queryParams?.courseID)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coursePageStore.courseData])


    return (
        <>
            {/*<section className={'banner'}>*/}
            {/*    <div className="banner__wrapper">*/}
            {/*        <div className="purchased__sidebar_base-info">*/}
            {/*            <div className="purchased__avatar_wrapper">*/}
            {/*                <img src={`${coursePageStore?.courseData?.coursePicture}`} alt=""*/}
            {/*                     className="purchased__info_avatar"/>*/}
            {/*            </div>*/}
            {/*            <div className="purchased__text_wrapper">*/}
            {/*                <div className="purchased__text_title">*/}
            {/*                    {coursePageStore?.courseData?.predmet} {coursePageStore?.courseData?.courseExamType}.{coursePageStore?.courseData?.courseType?.name}*/}
            {/*                </div>*/}
            {/*                <div className="purchased__chips_wrapper">*/}
            {/*                    <div className="chips-subject">*/}
            {/*                        {coursePageStore?.courseData?.predmet}*/}
            {/*                        <span className="chips-subject__notification" style={{background: '#12DA67'}}/>*/}
            {/*                    </div>*/}
            {/*                    <div className="chips-subject">*/}
            {/*                        {coursePageStore?.courseData?.courseExamType}*/}
            {/*                    </div>*/}
            {/*                    <div className="chips-subject">*/}
            {/*                        {coursePageStore?.courseData?.courseType?.name}*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="banner__description">*/}
            {/*                    {coursePageStore?.courseData?.shortDescription}*/}
            {/*                </div>*/}
            {/*                <div className="buy-course__info_items">*/}
            {/*                    <div className="course__footer_item buy__course">*/}
            {/*                        <svg className="course__footer_item_img" width="16" height="16">*/}
            {/*                            <use xlinkHref={'#icon-course-arrow'}/>*/}
            {/*                        </svg>*/}
            {/*                        <p className="course__footer_item_title">длительность курса</p>*/}
            {/*                        <p className="course__footer_item_date">{coursePageStore?.courseData?.courseType?.duration}</p>*/}
            {/*                    </div>*/}
            {/*                    <div className="course__footer_item">*/}
            {/*                        <div className="footer__account">*/}
            {/*                            <img*/}
            {/*                                src={`${coursePageStore?.courseData?.teacher?.avatar?.url}${coursePageStore?.courseData?.teacher?.avatar?.orig}`}*/}
            {/*                                alt=""/>*/}
            {/*                            <div className="course__footer_name">*/}
            {/*                                <p>{coursePageStore?.courseData?.teacher?.firstName} {coursePageStore?.courseData?.teacher?.lastName}</p>*/}
            {/*                                <span>преподаватель</span>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*                <div className="banner__buttons">*/}
            {/*                    <div className="buy__course">приобрести курс</div>*/}
            {/*                    <span className="price">*/}
            {/*                    <p>{coursePageStore?.courseData?.price} ₽/мес</p>*/}
            {/*                </span>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
            <section className={'BannerCourse'}>
                <div className="BannerCourse__Wrapper">
                    {coursePageStore.spinner.spinnerStatus ? <Spinner type={'local'}/> :
                        <div className="BannerCourse__Wrapper__SidebarInfo">
                            <div className="BannerCourse__Wrapper__SidebarInfo__Avatar">
                                {coursePageStore?.courseData?.coursePicture &&
                                <img src={`${coursePageStore?.courseData?.coursePicture}`} alt=""/>}
                            </div>
                            <div className="BannerCourse__Wrapper__SidebarInfo__Items">
                                <div className="Title">
                                    {coursePageStore?.courseData?.predmet} {coursePageStore?.courseData?.courseExamType}.{coursePageStore?.courseData?.courseType?.name}
                                    <div className="Title__Price">
                                        {Number(coursePageStore?.courseData?.price) === 0 && `Бесплатно`}
                                        {Number(coursePageStore?.courseData?.price) !== 0 && `${coursePageStore?.courseData?.price}₽/мес`}
                                    </div>
                                </div>
                                <div className="Chips">
                                    <div className="Chips__Item">
                                        {coursePageStore?.courseData?.predmet}
                                        <span/>
                                    </div>
                                    <div className="Chips__Item">
                                        {coursePageStore?.courseData?.courseExamType}
                                    </div>
                                    <div className="Chips__Item">
                                        {coursePageStore?.courseData?.courseType?.name}
                                    </div>
                                </div>
                                <div className="Description">
                                    {coursePageStore?.courseData?.shortDescription} Lorem ipsum dolor sit amet,
                                    consectetur
                                    adipisicing elit. Ad adipisci alias aliquam aspernatur commodi, deserunt ea fugit
                                    harum
                                    illum impedit molestiae necessitatibus optio quo repudiandae tempora temporibus
                                    tenetur
                                    veniam. Adipisci esse fuga harum incidunt nostrum reiciendis veniam voluptatem? Ea
                                    exercitationem minus quos reprehenderit. Animi enim expedita perspiciatis tempora
                                    unde
                                    ut.
                                </div>
                                <div className="DetailCourse">
                                    <div className="DetailCourse__Item DetailCourse__CourseData">
                                        <svg className="DetailCourse__Item__IconCourseDetail" width="16" height="16">*/}
                                            <use xlinkHref={'#icon-course-arrow'}/>
                                        </svg>
                                        <p className="DetailCourse__Item__Title">длительность курса</p>
                                        <p className="DetailCourse__Item__Date">{coursePageStore?.courseData?.courseType?.duration}</p>
                                    </div>
                                    <div className="DetailCourse__Item">
                                        <div className="DetailCourse__Item__Teacher">
                                            {coursePageStore?.courseData?.teacher?.avatar?.file?.original && <img
                                                src={`${coursePageStore?.courseData?.teacher?.avatar?.file?.original}`}
                                                alt=""/>}
                                            <div className="DetailCourse__Item__Teacher__Name">
                                                <p>{coursePageStore?.courseData?.teacher?.firstName} {coursePageStore?.courseData?.teacher?.lastName}</p>
                                                <span>преподаватель</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="BuyData">
                                    {!userStore.userAuthStatus && <div className={"BuyData__Button"} onClick={modalStore.LoginModalShow}>приобрести курс</div>}
                                    {userStore.userAuthStatus && <Link to={`/courses/${queryParams?.courseID}/purchase`} className="BuyData__Button">приобрести курс</Link>}
                                    <span className="BuyData__Price desktop-none">
                                        {Number(coursePageStore?.courseData?.price) === 0 && `Бесплатно`}
                                        {Number(coursePageStore?.courseData?.price) !== 0 && `${coursePageStore?.courseData?.price}₽/мес`}
                                    </span>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </section>
        </>
    )
}))

export default BannerBlock;
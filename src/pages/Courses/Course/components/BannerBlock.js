import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {Link, useHistory, useParams} from "react-router-dom";
import Spinner from "../../../../components/Spinner";

const BannerBlock = inject('userStore', 'coursePageStore', 'modalStore', 'courseStore')(observer((store) => {
        const {userStore, coursePageStore, modalStore, courseStore} = store
        const queryParams = useParams()
        const history = useHistory();

        useEffect(() => {
            if ((courseStore.courseData.length === 0) || (Number(courseStore?.courseData?.id) !== Number(queryParams?.courseID))) {
                courseStore.loadCourseData(queryParams?.courseID).then(() => {
                    if (courseStore.courseError) {
                        history.push(`/courses`)
                    }
                })
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        const buyFreeSubmit = () => {
            coursePageStore.buyFreeData(queryParams?.courseID).then(() => {
                if (coursePageStore.buyCourseStore.buyText.valid !== '') {
                    history.push(`/purchases/${queryParams?.courseID}`)
                }
            })
        }


        return (
            <>
                <section className={'BannerCourse'}>
                    <div className="BannerCourse__Wrapper">
                        {courseStore.spinner.spinnerStatus ? <Spinner type={'local'}/> :
                            <div className="BannerCourse__Wrapper__SidebarInfo">
                                <div className="BannerCourse__Wrapper__SidebarInfo__Avatar">
                                    {courseStore?.courseData?.coursePicture &&
                                    <img src={`${courseStore?.courseData?.coursePicture}`} alt=""/>}
                                </div>
                                <div className="BannerCourse__Wrapper__SidebarInfo__Items">
                                    <div className="Title">
                                        {courseStore?.courseData?.name}
                                        <div className="Title__Price">
                                            {Number(courseStore?.courseData?.price) === 0 && `Бесплатно`}
                                            {Number(courseStore?.courseData?.price) !== 0 && `${courseStore?.courseData?.price}₽/мес`}
                                        </div>
                                    </div>
                                    <div className="Chips">
                                        <div className="Chips__Item">
                                            {courseStore?.courseData?.predmet}
                                            <span/>
                                        </div>
                                        <div className="Chips__Item">
                                            {courseStore?.courseData?.courseExamType}
                                        </div>
                                        <div className="Chips__Item">
                                            {courseStore?.courseData?.courseType?.name}
                                        </div>
                                    </div>
                                    <div className="Description">
                                        {courseStore?.courseData?.shortDescription} Lorem ipsum dolor sit amet,
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
                                            <p className="DetailCourse__Item__Date">{courseStore?.courseData?.courseType?.duration}</p>
                                        </div>
                                        <div className="DetailCourse__Item">
                                            <div className="DetailCourse__Item__Teacher">
                                                {courseStore?.courseData?.teacher?.user?.avatar?.file?.original && <img
                                                    src={`${courseStore?.courseData?.teacher?.user?.avatar?.file?.original}`}
                                                    alt=""/>}
                                                <div className="DetailCourse__Item__Teacher__Name">
                                                    <p>{courseStore?.courseData?.teacher?.user?.firstName} {courseStore?.courseData?.teacher?.user?.lastName}</p>
                                                    <span>{courseStore?.courseData?.teacher?.role}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="BuyData">
                                        {!userStore.userAuthStatus &&
                                        <div className={"BuyData__Button"} onClick={modalStore.LoginModalShow}>приобрести
                                            курс</div>}
                                        {userStore.userAuthStatus && <>
                                            {Number(courseStore?.courseData?.price) === 0 &&
                                            <div className="BuyData__Button" onClick={() => {
                                                buyFreeSubmit()
                                            }}>приобрести курс</div>}
                                            {Number(courseStore?.courseData?.price) !== 0 &&
                                            <Link to={`/courses/${queryParams?.courseID}/purchase`}
                                                  className="BuyData__Button">приобрести курс</Link>}
                                        </>}
                                        <span className="BuyData__Price desktop-none">
                                        {Number(courseStore?.courseData?.price) === 0 && `Бесплатно`}
                                            {Number(courseStore?.courseData?.price) !== 0 && `${courseStore?.courseData?.price}₽/мес`}
                                    </span>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </section>
            </>
        )
    }
))

export default BannerBlock;
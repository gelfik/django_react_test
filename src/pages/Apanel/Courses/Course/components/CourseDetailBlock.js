import React from "react";
import {inject, observer} from "mobx-react";
import Spinner from "../../../../../components/Spinner";
import {Link} from "react-router-dom";

// const CourseBlock = inject('userStore', 'acourseStore')(observer((store) => {
//     const {acourseStore} = store
//
//     return (
//         <div className="Course__Item">
//             <div className="Course__Item__Content">
//                 <div className="Course__Item__Header">
//                     <div className="Course__Item__Data">
//                         <div className="Course__Item__Avatar">
//                             <img src={`${acourseStore?.courseData?.coursePicture}`} alt=''/>
//                         </div>
//                         <div className="Course__Item__Title">
//                             <p>{acourseStore?.courseData?.name}</p>
//                             <div className="Chips">
//                                 <div className="Chips__Item">
//                                     {acourseStore?.courseData?.predmet}
//                                     <span/>
//                                 </div>
//                                 <div className="Chips__Item">
//                                     {acourseStore?.courseData?.courseExamType}
//                                 </div>
//                                 <div className="Chips__Item">
//                                     {acourseStore?.courseData?.courseType}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }))

const CourseDetailBlock = inject('userStore', 'acourseStore')(observer((store) => {
    const {acourseStore} = store

    return (
        <section className={'BannerCourse'}>
            <div className="BannerCourse__Wrapper">
                {acourseStore.spinner.spinnerStatus ? <Spinner type={'local'}/> :
                    <div className="BannerCourse__Wrapper__SidebarInfo">
                        <div className="BannerCourse__Wrapper__SidebarInfo__Avatar">
                            {acourseStore?.courseData?.coursePicture &&
                            <img src={`${acourseStore?.courseData?.coursePicture}`} alt=""/>}
                        </div>
                        <div className="BannerCourse__Wrapper__SidebarInfo__Items">
                            <div className="Title">
                                {acourseStore?.courseData?.name}
                                <div className="Title__Price">
                                    {Number(acourseStore?.courseData?.price) === 0 && `Бесплатно`}
                                    {Number(acourseStore?.courseData?.price) !== 0 && `${acourseStore?.courseData?.price}₽/мес`}
                                </div>
                            </div>
                            <div className="Chips">
                                <div className="Chips__Item">
                                    {acourseStore?.courseData?.predmet}
                                    <span/>
                                </div>
                                <div className="Chips__Item">
                                    {acourseStore?.courseData?.courseExamType}
                                </div>
                                <div className="Chips__Item">
                                    {acourseStore?.courseData?.courseType}
                                </div>
                            </div>
                            <div className="Description">
                                {acourseStore?.courseData?.shortDescription}
                            </div>
                            <div className="Description">
                                {acourseStore?.courseData?.description} Lorem ipsum dolor sit amet,
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
                            <div className="EditData">
                                <div className={"EditData__Button"}>редактировать</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </section>
    )
}))


export default CourseDetailBlock;
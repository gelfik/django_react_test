import UserStore from "./UserStore";
import SpinnerStore from "./SpinnerStore";
import TokenStore from "./TokenStore";
import initAxios from "../utils/AxiosService";
import PictureStore from "./PictureStore";
import ModalStore from "./ModalStore";
import RegisterStore from "./RegisterStore";
import LoginStore from "./LoginStore";
import MainPageStore from "./pageStores/MainPageStore";
import UiStore from "./UiStore";
import CoursesPageStore from "./pageStores/courses/CoursesPageStore";
import CoursePageStore from "./pageStores/courses/CoursePageStore";
import PurchasePageStore from "./pageStores/courses/PurchasePageStore";
import BuyCourseStore from "./BuyCourseStore";
import CourseStore from "./CourseStore";
import PurchasesListStore from "./PurchasesListStore";
import PurchaseStore from "./PurchaseStore";
import PurCoursePageStore from "./pageStores/purchases/PurCoursePageStore";
import SubCourseStore from "./SubCourseStore";
import LessonStore from "./LessonStore";
import PurchaseCourseStore from "./PurchaseCourseStore";
import ACoursesListStore from "./ACoursesListStore";
import ACourseStore from "./ACourseStore";
import ASubCourseStore from "./ASubCourseStore";
import ALessonStore from "./ALessonStore";
import ATestStore from "./ATestStore";
import TestStore from "./TestStore";
import AUsersListStore from "./AUsersListStore";
import AGroupListStore from "./AGroupListStore";
import AMentorStore from "./AMentorStore";
import APurchaseStore from "./APurchaseStore";
import APurManageStore from "./APurManageStore";
import AProgressesListStore from "./AProgressesListStore";
import AProgressStore from "./AProgressStore";
import AProgressSubStore from "./AProgressSubStore";
import AProgressLessonStore from "./AProgressLessonStore";
import ProgressStore from "./ProgressStore";
import ProgressSubStore from "./ProgressSubStore";
import ProgressLessonStore from "./ProgressLessonStore"


class RootStore {
    constructor(initialState = null) {
        this.tokenStore = new TokenStore(initialState?.tokenStore);
        this.$axios = initAxios(this.tokenStore);
        this.userStore = new UserStore(this.tokenStore, this.$axios);
        this.spinnerStore = new SpinnerStore();
        this.pictureStore = new PictureStore(this.$axios)
        this.modalStore = new ModalStore();
        this.registerStore = new RegisterStore(this.$axios, this.userStore);
        this.loginStore = new LoginStore(this.$axios);

        this.courseStore = new CourseStore(this.$axios)
        this.buyCourseStore = new BuyCourseStore(this.$axios)

        this.purchasesListStore = new PurchasesListStore(this.$axios)
        this.purchaseStore = new PurchaseStore(this.$axios)
        this.subCourseStore = new SubCourseStore(this.$axios)
        this.lessonStore = new LessonStore(this.$axios)
        this.purchaseCourseStore = new PurchaseCourseStore(this.$axios)

        this.mainPageStore = new MainPageStore(this.$axios);
        this.coursesPageStore = new CoursesPageStore(this.$axios);
        this.coursePageStore = new CoursePageStore(this.$axios, this.buyCourseStore)
        this.purchasePageStore = new PurchasePageStore(this.$axios, this.buyCourseStore)
        this.purCoursePageStore = new PurCoursePageStore(this.$axios)
        this.atestStore = new ATestStore(this.$axios)
        this.testStore = new TestStore(this.$axios)

        this.progressStore = new ProgressStore(this.$axios)
        this.progressSubStore = new ProgressSubStore(this.$axios)
        this.progressLessonStore = new ProgressLessonStore(this.$axios)

        this.acoursesListStore = new ACoursesListStore(this.$axios);
        this.acourseStore = new ACourseStore(this.$axios)
        this.apurchaseStore = new APurchaseStore(this.$axios)
        this.amentorStore = new AMentorStore(this.$axios)
        this.asubCourseStore = new ASubCourseStore(this.$axios)
        this.alessonStore = new ALessonStore(this.$axios)

        this.aprogressesListStore = new AProgressesListStore(this.$axios)
        this.aprogressStore = new AProgressStore(this.$axios)
        this.aprogressSubStore = new AProgressSubStore(this.$axios)
        this.aprogressLessonStore = new AProgressLessonStore(this.$axios)

        this.agroupListStore = new AGroupListStore(this.$axios);
        this.ausersListStore = new AUsersListStore(this.$axios, this.agroupListStore);

        this.apurManageStore = new APurManageStore(this.$axios)


        this.uiStore = new UiStore();
    }
}

export default RootStore;
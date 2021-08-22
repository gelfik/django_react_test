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

        this.mainPageStore = new MainPageStore(this.$axios);
        this.coursesPageStore = new CoursesPageStore(this.$axios);
        this.coursePageStore = new CoursePageStore(this.$axios, this.buyCourseStore)
        this.purchasePageStore = new PurchasePageStore(this.$axios, this.buyCourseStore)

        this.uiStore = new UiStore();
    }
}

export default RootStore;
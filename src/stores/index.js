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
import CoursesPageStore from "./pageStores/CoursesPageStore";
import CoursePageStore from "./pageStores/CoursePageStore";
import PurchasePageStore from "./pageStores/PurchasePageStore";


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

        this.mainPageStore = new MainPageStore(this.$axios);
        this.coursesPageStore = new CoursesPageStore(this.$axios);
        this.coursePageStore = new CoursePageStore(this.$axios)
        this.purchasePageStore = new PurchasePageStore(this.$axios)

        this.uiStore = new UiStore();
    }
}

export default RootStore;
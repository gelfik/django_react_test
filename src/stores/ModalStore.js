import {action, computed, makeObservable, observable} from "mobx"

export default class ModalStore {
    _showLoginModalStatus = false
    _showRegisterModalStatus = false
    _showPurchaseDetailModalStatus = false

    _showCourseAddModalStatus = false
    _showACourseEditModalStatus = false

    _showAPurchaseUserModalStatus = false

    _showASubCourseAddModalStatus = false
    _showASubCourseEditModalStatus = false

    _showALessonListAddModalStatus = false
    _showALessonAddModalStatus = false

    _showALessonListEditModalStatus = false
    _showALessonEditModalStatus = false

    _showAHomeworkAskAddModalStatus = false


    constructor() {
        makeObservable(this, {
            _showLoginModalStatus: observable,
            _showRegisterModalStatus: observable,
            _showPurchaseDetailModalStatus: observable,
            _showCourseAddModalStatus: observable,
            _showACourseEditModalStatus: observable,
            _showAPurchaseUserModalStatus: observable,
            _showASubCourseAddModalStatus: observable,
            _showASubCourseEditModalStatus: observable,
            _showALessonListAddModalStatus: observable,
            _showALessonAddModalStatus: observable,
            _showALessonListEditModalStatus: observable,
            _showALessonEditModalStatus: observable,
            _showAHomeworkAskAddModalStatus: observable,
            LoginModalStatus: computed,
            RegisterModalStatus: computed,
            PurchaseDetailModalStatus: computed,
            CourseAddModalStatus: computed,
            ACourseEditModalStatus: computed,
            APurchaseUserModalStatus: computed,
            ASubCourseAddModalStatus: computed,
            ASubCourseEditModalStatus: computed,
            ALessonListAddModalStatus: computed,
            ALessonListEditModalStatus: computed,
            ALessonAddModalStatus: computed,
            ALessonEditModalStatus: computed,
            AHomeworkAskAddModalStatus: computed,
            LoginModalClose: action,
            LoginModalShow: action,
            RegisterModalClose: action,
            RegisterModalShow: action,
            PurchaseDetailModalClose: action,
            PurchaseDetailModalShow: action,
            CourseAddModalClose: action,
            CourseAddModalShow: action,
            ACourseEditModalClose: action,
            ACourseEditModalShow: action,
            APurchaseUserModalClose: action,
            APurchaseUserModalShow: action,
            ASubCourseAddModalClose: action,
            ASubCourseAddModalShow:action,
            ASubCourseEditModalClose: action,
            ASubCourseEditModalShow:action,
            ALessonListAddModalShow: action,
            ALessonListAddModalClose: action,
            ALessonListEditModalShow: action,
            ALessonListEditModalClose: action,
            ALessonAddModalShow: action,
            ALessonAddModalClose: action,
            ALessonEditModalShow: action,
            ALessonEditModalClose: action,
            AHomeworkAskAddModalShow: action,
            AHomeworkAskAddModalClose: action,
        })
    }

    get LoginModalStatus() {
        return this._showLoginModalStatus;
    }

    get RegisterModalStatus() {
        return this._showRegisterModalStatus;
    }

    get PurchaseDetailModalStatus() {
        return this._showPurchaseDetailModalStatus;
    }

    get CourseAddModalStatus() {
        return this._showCourseAddModalStatus;
    }

    get ACourseEditModalStatus() {
        return this._showACourseEditModalStatus;
    }

    get APurchaseUserModalStatus() {
        return this._showAPurchaseUserModalStatus;
    }

    get ASubCourseAddModalStatus() {
        return this._showASubCourseAddModalStatus;
    }

    get ASubCourseEditModalStatus() {
        return this._showASubCourseEditModalStatus;
    }

    get ALessonListAddModalStatus() {
        return this._showALessonListAddModalStatus;
    }

    get ALessonListEditModalStatus() {
        return this._showALessonListEditModalStatus;
    }

    get ALessonAddModalStatus() {
        return this._showALessonAddModalStatus;
    }

    get ALessonEditModalStatus() {
        return this._showALessonEditModalStatus;
    }

     get AHomeworkAskAddModalStatus() {
        return this._showAHomeworkAskAddModalStatus;
    }

    LoginModalClose = () => {
        this._showLoginModalStatus = false;
    }
    LoginModalShow = () => {
        this._showLoginModalStatus = true;
    }

    RegisterModalClose = () => {
        this._showRegisterModalStatus = false;
    }
    RegisterModalShow = () => {
        this._showRegisterModalStatus = true;
    }

    PurchaseDetailModalClose = () => {
        this._showPurchaseDetailModalStatus = false;
    }
    PurchaseDetailModalShow = () => {
        this._showPurchaseDetailModalStatus = true;
    }

    CourseAddModalClose = () => {
        this._showCourseAddModalStatus = false;
    }
    CourseAddModalShow = () => {
        this._showCourseAddModalStatus = true;
    }

    ACourseEditModalClose = () => {
        this._showACourseEditModalStatus = false;
    }
    ACourseEditModalShow = () => {
        this._showACourseEditModalStatus = true;
    }

    APurchaseUserModalClose = () => {
        this._showAPurchaseUserModalStatus = false;
    }
    APurchaseUserModalShow = () => {
        this._showAPurchaseUserModalStatus = true;
    }

    ASubCourseAddModalClose = () => {
        this._showASubCourseAddModalStatus = false;
    }
    ASubCourseAddModalShow = () => {
        this._showASubCourseAddModalStatus = true;
    }

    ASubCourseEditModalClose = () => {
        this._showASubCourseEditModalStatus = false;
    }
    ASubCourseEditModalShow = () => {
        this._showASubCourseEditModalStatus = true;
    }

    ALessonListAddModalClose = () => {
        this._showALessonListAddModalStatus = false;
    }
    ALessonListAddModalShow = () => {
        this._showALessonListAddModalStatus = true;
    }

    ALessonListEditModalClose = () => {
        this._showALessonListEditModalStatus = false;
    }
    ALessonListEditModalShow = () => {
        this._showALessonListEditModalStatus = true;
    }

    ALessonAddModalClose = () => {
        this._showALessonAddModalStatus = false;
    }
    ALessonAddModalShow = () => {
        this._showALessonAddModalStatus = true;
    }

    ALessonEditModalClose = () => {
        this._showALessonEditModalStatus = false;
    }
    ALessonEditModalShow = () => {
        this._showALessonEditModalStatus = true;
    }

    AHomeworkAskAddModalClose = () => {
        this._showAHomeworkAskAddModalStatus = false;
    }
    AHomeworkAskAddModalShow = () => {
        this._showAHomeworkAskAddModalStatus = true;
    }

}
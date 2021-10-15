import {action, computed, makeObservable, observable} from "mobx"

export default class ModalStore {
    _showLoginModalStatus = false
    _showRegisterModalStatus = false
    _showPurchaseDetailModalStatus = false

    _showCourseAddModalStatus = false

    _showAPurchaseUserModalStatus = false
    _showASubCourseAddModalStatus = false

    constructor() {
        makeObservable(this, {
            _showLoginModalStatus: observable,
            _showRegisterModalStatus: observable,
            _showPurchaseDetailModalStatus: observable,
            _showCourseAddModalStatus: observable,
            _showAPurchaseUserModalStatus: observable,
            _showASubCourseAddModalStatus: observable,
            LoginModalStatus: computed,
            RegisterModalStatus: computed,
            PurchaseDetailModalStatus: computed,
            CourseAddModalStatus: computed,
            APurchaseUserModalStatus: computed,
            ASubCourseAddModalStatus: computed,
            LoginModalClose: action,
            LoginModalShow: action,
            RegisterModalClose: action,
            RegisterModalShow: action,
            PurchaseDetailModalClose: action,
            PurchaseDetailModalShow: action,
            CourseAddModalClose: action,
            CourseAddModalShow: action,
            APurchaseUserModalClose: action,
            APurchaseUserModalShow: action,
            ASubCourseAddModalClose: action,
            ASubCourseAddModalShow:action,
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

    get APurchaseUserModalStatus() {
        return this._showAPurchaseUserModalStatus;
    }

    get ASubCourseAddModalStatus() {
        return this._showASubCourseAddModalStatus;
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
}
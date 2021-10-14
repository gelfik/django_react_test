import {action, computed, makeObservable, observable} from "mobx"

export default class ModalStore {
    _showLoginModalStatus = false
    _showRegisterModalStatus = false
    _showPurchaseDetailModalStatus = false

    _showCourseAddModalStatus = false

    _showAPurchaseUserModalStatus = false
    _showASubCourseModalStatus = false

    constructor() {
        makeObservable(this, {
            _showLoginModalStatus: observable,
            _showRegisterModalStatus: observable,
            _showPurchaseDetailModalStatus: observable,
            _showCourseAddModalStatus: observable,
            _showAPurchaseUserModalStatus: observable,
            _showASubCourseModalStatus: observable,
            LoginModalStatus: computed,
            RegisterModalStatus: computed,
            PurchaseDetailModalStatus: computed,
            CourseAddModalStatus: computed,
            APurchaseUserModalStatus: computed,
            ASubCourseModalStatus: computed,
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
            ASubCourseModalClose: action,
            ASubCourseModalShow:action,
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

    get ASubCourseModalStatus() {
        return this._showASubCourseModalStatus;
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

    ASubCourseModalClose = () => {
        this._showASubCourseModalStatus = false;
    }
    ASubCourseModalShow = () => {
        this._showASubCourseModalStatus = true;
    }
}
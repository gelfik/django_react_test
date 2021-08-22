import {action, computed, makeObservable, observable} from "mobx"

export default class ModalStore {
    _showLoginModalStatus = false
    _showRegisterModalStatus = false
    _showPurchaseDetailModalStatus = false

    constructor() {
        makeObservable(this, {
            _showLoginModalStatus: observable,
            _showRegisterModalStatus: observable,
            _showPurchaseDetailModalStatus: observable,
            LoginModalStatus: computed,
            RegisterModalStatus: computed,
            PurchaseDetailModalStatus: computed,
            LoginModalClose: action,
            LoginModalShow: action,
            RegisterModalClose: action,
            RegisterModalShow: action,
            PurchaseDetailModalClose: action,
            PurchaseDetailModalShow: action,
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
}
import {action, computed, makeObservable, observable, toJS} from "mobx"
import RequestsService from "../utils/RequestsService";
import CookieService from "../utils/CookieService";
import SpinnerStore from "./SpinnerStore";

export default class UserStore {
    requestService = new RequestsService()
    cookieService = new CookieService()

    _spinnerStore = new SpinnerStore()
    _firstSpinerStore = new SpinnerStore()
    _userAuthStatus = false;
    _userData = {}
    _userAuthToken = this.cookieService.getCookie('Authorization')
    _userCheckStatus = false;

    constructor() {
        makeObservable(this, {
            _userAuthStatus: observable,
            _userData: observable,
            _userAuthToken: observable,
            _userCheckStatus: observable,
            userAuthStatus: computed,
            setUserAuthStatus: action,
            userAuthToken: computed,
            setUserAuthToken: action,
            fetchUser: action,
            userData: computed,
            setUserData: action,
            userCheckStatus: computed,
            setUserCheckStatus: action,
        })
        this.fetchUser().then(r => console.log('USER FETCHED'))
    }

    fetchUser = async () => {
        if (this.userAuthToken) {
            await this.getUserData().then(response => {
                if (response.username) {
                    this.setUserAuthStatus(true)
                    this.setUserData(response)
                }
            })
            // setTimeout(()=>{this.firstSpinnerStore.setSpinnerStatus(false)}, 1000)
            this.firstSpinnerStore.setSpinnerStatus(false)
        } else {
            this.firstSpinnerStore.setSpinnerStatus(false)

            // if (window.location.pathname !== '/login')
            //     window.location.href = '/login'
        }
    }

    get spinnerStore() {
        return this._spinnerStore;
    }

    get firstSpinnerStore() {
        return this._firstSpinerStore;
    }

    get userAuthStatus() {
        return this._userAuthStatus;
    }

    get userData() {
        return toJS(this._userData); // Чтобы не разбираться с обсервер элементами можно обернуть такой функцией,
        // так в консоли будет видно весь контент нормально.
        // Так же в некотором роде убирает сайд эффекты.
        // toJS = observer value => js value
    }

    get userAuthToken() {
        return this._userAuthToken;
    }

    get userCheckStatus() {
        return this._userCheckStatus;
    }

    setUserAuthStatus = (value) => {
        this._userAuthStatus = value;
    }


    setUserData = (value) => {
        this._userData = value;
    }

    setUserAuthToken = (value) => {
        this._userAuthToken = value;
    }

    setUserCheckStatus = (value) => {
        this._userCheckStatus = value
    }

    login = data => {
        return this.requestService._post('/login/', data).then(([response, status]) => {
            if (status) {
                const {token} = response;
                this.cookieService.setCookie('Authorization', `Token ${token}`)
                this.setUserAuthToken(this.cookieService.getCookie('Authorization'))
                this.setUserAuthStatus(true)
            }
            return [response, status]
        })
    }

    registration = data => {
        return this.requestService._post('/register/', data).then(([response, status]) => {
            return [response, status]
        })
    }

    logout = () => {
        this._clearUserData()
    }

    async getUserData() {
        const [res, status] = await this.requestService._get('/user/')
        if (status) {
            return this._transformUserData(res)
        } else {
            this._clearUserData()
            return this._transformErrorMsg(res)
        }
    }

    _clearUserData() {
        this.setUserAuthStatus(false)
        this.cookieService.deleteCookie('Authorization')
        this.setUserAuthToken(this.cookieService.getCookie('Authorization'))
        this.setUserData({})
    }

    _transformErrorMsg(msg) {
        return {error: msg.detail}
    }

    _transformUserData(userData) {
        return {
            email: userData.email,
            username: userData.username,
            lastName: userData.last_name,
            firstName: userData.first_name,
            patronymic: userData.patronymic,
            isActive: userData.is_active
        }
    }
}
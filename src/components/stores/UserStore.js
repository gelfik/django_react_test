import {action, computed, makeObservable, observable} from "mobx"
import RequestsService from "../utils/RequestsService";
import CookieService from "../utils/CookieService";

export default class UserStore {
    constructor() {
        makeObservable(this, {
            _userAuthStatus: observable,
            _userData: observable,
            userAuthStatus: computed,
            setUserAuthStatus: action,
            userData: computed,
            setUserData: action,
        })
    }

    requestService = new RequestsService()
    cookieService = new CookieService()

    _userAuthStatus = false;
    _userData = {}


    get userAuthStatus() {
        return this._userAuthStatus;
    }

    setUserAuthStatus = (value) => {
        this._userAuthStatus = value;
    }

    get userData() {
        return this._userData;
    }

    setUserData = (value) => {
        this._userData = value;
    }

    login = data => {
        return this.requestService._post('/login/', data).then(([response, status]) => {
            if (status) {
                const {token} = response;
                this.cookieService.setCookie('Authorization', `Token ${token}`)
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

    async getUserData() {
        const [res, status] = await this.requestService._get('/user/')
        if (status) {
            return this._transformUserData(res)
        } else {
            this.setUserAuthStatus(false)
            this.cookieService.deleteCookie('Authorization')
            return this._transformErrorMsg(res)
        }
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
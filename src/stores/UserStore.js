import {action, computed, makeObservable, observable, toJS} from "mobx"
import RequestsService from "../utils/RequestsService";
import CookieService from "../utils/CookieService";
import SpinnerStore from "./SpinnerStore";
import TokenStore from "./TokenStore";

export default class UserStore {
    requestService = new RequestsService()
    cookieService = new CookieService()
    tokenStore = TokenStore

    _spinnerStore = new SpinnerStore()
    _firstSpinerStore = new SpinnerStore()
    _userAuthStatus = false
    _userData = {}
    _client = undefined
    _errors = undefined

    constructor(tokenStore, $client) {
        makeObservable(this, {
            // _client: observable,
            _userAuthStatus: observable,
            _errors: observable,
            errors: computed,
            _userData: observable,
            client: computed,
            userAuthStatus: computed,
            setUserAuthStatus: action,
            userData: computed,
            setUserData: action,
            fetchUser: action,
            getUserData: action,
            updateUser: action,
        })
        this.tokenStore = tokenStore
        this._client = $client
        this.fetchUser().then(r => console.log('USER FETCHED'))
    }

    getAllMethods(object) {
        return Object.getOwnPropertyNames(object).filter(function (property) {
            return typeof object[property] == 'function';
        });
    }

    fetchUser = async () => {
        if (this.tokenStore.token.value) {
            await this.getUserData().then(response => {
                if (response.username) {
                    this.setUserAuthStatus(true)
                    this.setUserData(response)
                    return this.userData
                }
            }).catch(error => {
                if (error.response?.status === 401 || error.response?.status === 403) {
                    this._clearUserData()
                }
                return new Promise((resolve => {
                    this.setUserData({})
                    resolve(null)
                }))
            })
            // setTimeout(()=>{this.firstSpinnerStore.setSpinnerStatus(false)}, 1000)
            this.firstSpinnerStore.setSpinnerStatus(false)
        } else {
            this.firstSpinnerStore.setSpinnerStatus(false)
        }
    }

    get client() {
        return this._client;
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
        return this._transformUserData(toJS(this._userData)); // Чтобы не разбираться с обсервер элементами можно обернуть такой функцией,
        // так в консоли будет видно весь контент нормально.
        // Так же в некотором роде убирает сайд эффекты.
        // toJS = observer value => js value
    }

    get errors() {
        return toJS(this._errors)
    }


    setUserAuthStatus = (value) => {
        this._userAuthStatus = value;
    }


    setUserData = (value) => {
        this._userData = value;
    }

    // login = data => {
    //     return this.requestService._post('/login/', data).then(([response, status]) => {
    //         if (status) {
    //             const {token} = response;
    //             this.tokenStore.setToken(`Token ${token}`)
    //             this.setUserAuthStatus(true)
    //         }
    //         return [response, status]
    //     })
    // }

    login = (data) => {
        return this.client.post('/users/login/', data).then((response) => {
            this.tokenStore.setToken(`Token ${response.data.token}`)
            this.setUserAuthStatus(true)
            this.getUserData().then(userData => {
                this.setUserData(userData);
            });
        }).catch(errors => {
            this.setErrors(this.checkErrors(errors.response.data))
        })
    }

    setErrors = (value) => {
        this._errors = value;
    }

    checkErrors = (errors, localErrors = {}, parent = null) => {
        for (const [key, value] of Object.entries(errors)) {
            if (typeof value === 'string') {
                Object.assign(localErrors, {[parent ? parent : key]: value})
            }
            if (typeof value === 'object' && value !== null) {
                this.checkErrors(value, localErrors, key)
            }
        }
        return localErrors;
    }

    registration = data => {
        return this.client.post('/users/register/', data).then((response) => {
            // console.log(response)
            this.tokenStore.setToken(`Token ${response.data.token}`)
            this.setUserAuthStatus(true)
            this.setUserData(response.data)
        }).catch(errors => {
            this.setErrors(this.checkErrors(errors.response.data))
        })
    }


    updateUser = (data) => {
        return this.client.post('/users/edit/', data).then((response) => {
            this.setUserData(response.data)
            // this.getUserData().then(userData => {
            //     this.setUserData(userData)
            // });
        }).catch(errors => {
            this.setErrors(this.checkErrors(errors.response.data))
        })
    }


    logout = () => {
        this._clearUserData()
    }

    getUserData = () => {
        return this.client.get('/users/user/')
            .then(response => {
                this.setUserAuthStatus(true)
                return response.data
            })
    }


    _clearUserData() {
        this.setUserAuthStatus(false)
        this.tokenStore.removeToken()
        this.setUserData({})
    }

    _transformAvatarData(avatarData) {
        if (avatarData) {
            return {
                small: avatarData.url + avatarData.small,
                profile: avatarData.url + avatarData.profile,
                medium: avatarData.url + avatarData.medium,
                large: avatarData.url + avatarData.large
            }
        } else {
            return {
                small: null,
                profile: null,
                medium: null,
                large: null
            }
        }
    }

    _transformUserData(userData) {
        return {
            email: userData.email,
            username: userData.username,
            phone: userData.phone,
            vkLink: userData.vkLink,
            lastName: userData.lastName,
            firstName: userData.firstName,
            patronymic: userData.patronymic,
            avatar: this._transformAvatarData(userData.avatar),
            // avatar: userData.avatar,
            isActive: userData.is_active
        }
    }
}
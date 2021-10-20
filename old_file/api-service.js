import CookieService from "./cookie-service";

export default class ApiService {
    _apiBase = 'https://busservice.gelfik.dev/api/users'

    CookieServices = new CookieService()

    async getResource(url = '') {
        let headers = {}

        let auth_token = this.CookieServices.getCookie('Authorization')

        if (auth_token !== undefined) {
            headers.Authorization = auth_token
        }
        const res = await fetch(`${this._apiBase}${url}`, {
            method: 'GET',
            mode: 'cors',
            headers: headers,
        })

        if (!res.ok) {
            if (res.status === 403) {
                this.CookieServices.deleteCookie('Authorization')
            }
            // throw new Error(`Could not fetch ${url}, receved ${res.status}`)
        }
        return [await res.json(), res.ok];
    }

    async postResource(url = '', data = {}) {
        let headers = {}

        let auth_token = this.CookieServices.getCookie('Authorization')

        if (auth_token !== undefined) {
            headers.Authorization = auth_token
        }
        headers['Content-Type'] = 'application/json'
        const res = await fetch(`${this._apiBase}${url}`, {
            method: 'post',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(data)
        })

        return [await res.json(), res.ok];
    }

    // getUserData = async () => {
    //     const res = await this.getResource('/User', 'GET')
    //     console.log(res)
    //     return res
    // }


    async getUserData() {
        const [res, status] = await this.getResource('/User')
        if (status) {
            return this._transformUserData(res)
        } else {
            return this._transformErrorMsg(res)
        }
    }

    async postUserLogin(email, password) {
        const [res, status] = await this.postResource('/login', {email:email, password:password})
        return [res, status]
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
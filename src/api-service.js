import CookieService from "./cookie-service";

export default class ApiService {
    _apiBase = 'http://localhost:8000/api/users'

    CookieServices = new CookieService()

    async getResource(url, method) {
        let headers = {}

        let auth_token = this.CookieServices.getCookie('Authorization')

        if (auth_token !== undefined) {
            headers.Authorization = auth_token
        }
        const res = await fetch(`${this._apiBase}${url}`, {
            method: `${method}`,
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

    // getUserData = async () => {
    //     const res = await this.getResource('/user/', 'GET')
    //     console.log(res)
    //     return res
    // }



    async getUserData() {
        const [res, status] = await this.getResource('/user/', 'GET')
        if (status) {
            return this._transformUserData(res)
        } else {
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
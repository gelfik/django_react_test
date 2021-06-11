import CookieService from "../CookieService";

export default class RequestsService {
    _apiBase = 'https://busservice.gelfik.dev/api/users'

    CookieServices = new CookieService()

    _get = (url) => {
        let headers = {
            'Content-Type': 'application/json'
        }
        let authToken = this.CookieServices.getCookie('Authorization')
        if (authToken) {
            headers.Authorization = authToken
        }
        return fetch(`${this._apiBase}${url}`, {
            method: 'GET',
            mode: 'cors',
            headers: headers,
        }).then(async response => [await response.json(), response.ok])
    }

    _post = (url, data) => {
        let headers = {
            'Content-Type': 'application/json'
        }
        let authToken = this.CookieServices.getCookie('Authorization')
        if (authToken) {
            headers.Authorization = authToken
        }
        return fetch(`${this._apiBase}${url}`, {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: JSON.stringify(data)
        }).then(async response => [await response.json(), response.ok])
    }
}
import {action, computed, makeObservable, observable } from "mobx"
import Cookie from "mobx-cookie";

export default class TokenStore {
    _token = new Cookie('Authorization');

    constructor() {
        makeObservable(this, {
            _token: observable,
            token: computed,
            setToken: action,
            removeToken: action,
        })
    }

    get token() {
        return this._token;
    }

    setToken = (value) => {
        this.token.set(value, {expires: 365})
    }

    removeToken = () => {
        this.token.remove();
    }
}
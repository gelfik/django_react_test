import {action, computed, makeObservable, observable, toJS} from "mobx";
import {validateEmail} from "../utils/ValidatorService";

export default class LoginStore {
    constructor($client) {
        makeObservable(this, {
            _regData: observable,
            setKeyRegData: action,
            setRegData: action,
            regData: computed,
            isValid: action,
        })
        this.client = $client;
    }

    _regData = {
        email: null,
        password: null,
    };

    setKeyRegData = (key, value) => {
        this._regData[key] = value;
    }

    setRegData = (value) => {
        this._regData = value;
    }

    get regData() {
        return toJS(this._regData);
    }

    isValid = (key) => {
        if (!this.regData[key]) {
            return ''
        }
        switch (key) {
            case "email":
                return validateEmail(this.regData[key]) ? 'is-valid' : 'is-invalid'
            case "password":
                return this.regData[key]?.length >= 5 ? 'is-valid' : 'is-invalid'
            default:
                return this.regData[key]?.length >= 3 ? 'is-valid' : 'is-invalid'
        }
    }

    get isButtonDisabled() {
        return Object.keys(this.regData).map((key) => {
            return this.isValid(key)
        }).every((item) => item === 'is-valid')
    }
}
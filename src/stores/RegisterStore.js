import {action, computed, makeObservable, observable, toJS} from "mobx";
import {validateEmail, validatePhone} from "../utils/ValidatorService";

export default class RegisterStore {
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
        lastName: null,
        firstName: null,
        email: null,
        vkLink: null,
        password: null,
        password2: null,
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
            case "vkLink":
                return this.regData[key]?.length >= 8 ? 'is-valid' : 'is-invalid'
            case "email":
                return validateEmail(this.regData[key]) ? 'is-valid' : 'is-invalid'
            case "phone":
                return validatePhone(this.regData[key]) && (this.regData[key]?.length >= 11) ? 'is-valid' : 'is-invalid'
            case "password":
                return this.regData[key]?.length >= 8 ? 'is-valid' : 'is-invalid'
            case "password2":
                return (this.regData[key] === this.regData['password']) && (this.regData[key]?.length >= 8) ? 'is-valid' : 'is-invalid'
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
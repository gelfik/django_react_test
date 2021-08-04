import {action, computed, makeObservable, observable } from "mobx"

export default class SpinnerStore {
    _spinnerStatus = false;

    constructor() {
        makeObservable(this, {
            _spinnerStatus: observable,
            spinnerStatus: computed,
            setSpinnerStatus: action,
        })
    }

    get spinnerStatus() {
        return this._spinnerStatus;
    }

    setSpinnerStatus = (value) => {
        this._spinnerStatus = value;
    }
}
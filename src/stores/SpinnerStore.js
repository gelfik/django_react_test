import {action, computed, makeObservable, observable } from "mobx"

export default class SpinnerStore {
    _spinerStatus = true;

    constructor() {
        makeObservable(this, {
            _spinerStatus: observable,
            spinerStatus: computed,
            setSpinnerStatus: action,
        })
    }

    get spinerStatus() {
        return this._spinerStatus;
    }

    setSpinnerStatus = (value) => {
        this._spinerStatus = value;
    }
}
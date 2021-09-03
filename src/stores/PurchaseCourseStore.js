import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class PurchaseCourseStore {
    _courseData = []

    _spinner = new SpinnerStore()

    _courseError = false

    constructor($client) {
        makeObservable(this, {
            _courseData: observable,
            setCourseData: action,
            loadCourseData: action,
            courseData: computed,

            _spinner: observable,
            spinner: computed,

            _courseError: observable,
            courseError: computed,
            setCourseError: action,
        })

        this.client = $client;
    }

    get courseError() {
        return this._courseError;
    }

    setCourseError(value) {
        this._courseError = value
    }

    get spinner() {
        return this._spinner;
    }

    get courseData() {
        return toJS(this._courseData);
    }

    setCourseData = (value) => {
        this._courseData = value
    }

    loadCourseData = (purchaseID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.get(`/purchase/${purchaseID}/subBuy/`)
            .then(response => {
                this.setCourseError(false)
                this.setCourseData(response.data)
                this.spinner.setSpinnerStatus(false)
            }).catch(reason => {
                this.setCourseError(true)
                this.spinner.setSpinnerStatus(false)
            })
    }

}
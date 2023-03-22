import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class SubCourseStore {
    _subCourseData = []

    _spinner = new SpinnerStore()

    _subCourseError = false

    _subCourseID = undefined

    constructor($client) {
        makeObservable(this, {
            _subCourseData: observable,
            subCourseData: computed,
            setSubCourseData: action,
            loadSubCourseData: action,

            _spinner: observable,
            spinner: computed,

            _subCourseError: observable,
            subCourseError: computed,
            setSubCourseError: action,

            _subCourseID: observable,
            subCourseID: computed,
            setSubCourseID: action,
        })

        this.client = $client;
    }

    get subCourseID() {
        return this._subCourseID;
    }

    setSubCourseID = (purchaseID, value) => {
        if (this.subCourseID !== value) {
            this._subCourseID = value
            this.loadSubCourseData(purchaseID, this.subCourseID)
        }
    }

    get subCourseError() {
        return this._subCourseError;
    }

    setSubCourseError(value) {
        this._subCourseError = value
    }

    get spinner() {
        return this._spinner;
    }

    get subCourseData() {
        return toJS(this._subCourseData);
    }

    setSubCourseData = (value) => {
        this._subCourseData = value
    }

    loadSubCourseData = (purchaseID, subCourseID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.get(`/purchase${purchaseID}/sub${subCourseID}`)
            .then(response => {
                this.setSubCourseError(false)
                this.setSubCourseData(response.data)
                this.spinner.setSpinnerStatus(false)
            }).catch(reason => {
                this.setSubCourseError(true)
                this.spinner.setSpinnerStatus(false)
            })
    }

}
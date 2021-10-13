import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class ASubCourseStore {
    _subCourseData = {}

    _spinner = new SpinnerStore()

    _loadError = false

    _subCourseID = undefined

    constructor($client) {
        makeObservable(this, {
            _subCourseData: observable,
            subCourseData: computed,
            setSubCourseData: action,
            loadSubCourseData: action,

            _spinner: observable,
            spinner: computed,

            _loadError: observable,
            loadError: computed,
            setLoadError: action,


            _subCourseID: observable,
            subCourseID: computed,
            setSubCourseID: action,
        })

        this.client = $client;
    }


    get subCourseData() {
        return toJS(this._subCourseData);
    }

    setSubCourseData = (value) => {
        this._subCourseData = value
    }

    loadSubCourseData = (CourseID, SubCourseID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.get(`/apanel/course/${CourseID}/sub/${SubCourseID}/`)
            .then(response => {
                this.setLoadError(false)
                this.setSubCourseData(response.data)
                this.spinner.setSpinnerStatus(false)
            }).catch(reason => {
                this.setLoadError(true)
                this.spinner.setSpinnerStatus(false)
            })
    }

    get subCourseID() {
        return this._subCourseID;
    }

    setSubCourseID = (CourseID, value, force = false) => {
        if ((this.subCourseData.length === 0) || (this.subCourseID !== value) || (force)) {
            this._subCourseID = value
            this.loadSubCourseData(CourseID, this.subCourseID)
        }
    }

    get loadError() {
        return this._loadError;
    }

    setLoadError(value) {
        this._loadError = value
    }

    get spinner() {
        return this._spinner;
    }
}
import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class AProgressStore {
    _courseData = {}

    _spinner = new SpinnerStore()

    _loadError = false

    _courseID = undefined

    constructor($client) {
        makeObservable(this, {
            _courseData: observable,
            courseData: computed,
            setCourseData: action,
            loadCourseData: action,

            _spinner: observable,
            spinner: computed,

            _loadError: observable,
            loadError: computed,
            setLoadError: action,

            _courseID: observable,
            courseID: computed,
            setCourseID: action,
        })

        this.client = $client;
    }


    get courseID() {
        return this._courseID;
    }

    setCourseID = (value, force = false) => {
        if ((this.courseData.length === 0) || (this.courseID !== value) || (force)) {
            this._courseID = value
            this.loadCourseData(this.courseID)
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

    get courseData() {
        return toJS(this._courseData);
    }

    setCourseData = (value) => {
        this._courseData = value
    }

    loadCourseData = (CourseID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.get(`/apanel/progress${CourseID}`)
            .then(response => {
                this.setLoadError(false)
                this.setCourseData(response.data)
                this.spinner.setSpinnerStatus(false)
            }).catch(reason => {
                this.setLoadError(true)
                this.spinner.setSpinnerStatus(false)
            })
    }

}
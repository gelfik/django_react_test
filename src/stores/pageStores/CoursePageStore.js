import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "../SpinnerStore";

export default class CoursePageStore {
    _courseData = []

    _spinner = new SpinnerStore()

    constructor($client) {
        makeObservable(this, {
            _courseData: observable,
            setCourseData: action,
            loadCourseData: action,
            courseData: computed,

            _spinner: observable,
            spinner: computed,
        })
        this.client = $client;
        // this.loadTeacherData()
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
        return this.client.get(`/courses/course${CourseID}`)
            .then(response => {
                this.setCourseData(response.data)
                this.spinner.setSpinnerStatus(false)
            })
    }

}
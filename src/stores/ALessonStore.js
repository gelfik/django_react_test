import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class ALessonStore {
    _spinner = new SpinnerStore()
    _lessonData = {}
    _lessonType = undefined

    constructor($client) {
        makeObservable(this, {
            _spinner: observable,
            spinner: computed,

            _lessonData: observable,
            lessonData: computed,
            setLessonData: action,
            loadLessonData: action,

            _lessonType: observable,
            lessonType: computed,
            setLessonType: action,
        })

        this.client = $client;
    }

    get spinner() {
        return this._spinner;
    }

    get lessonData() {
        return toJS(this._lessonData);
    }

    setLessonData = (value) => {
        this._lessonData = value
    }

    loadLessonData = (CourseID, SubCourseID, LessonID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.get(`/apanel/course${CourseID}/sub${SubCourseID}/lesson${LessonID}`)
            .then(response => {
                this.setLoadError(false)
                this.setLessonData(response.data)
                this.spinner.setSpinnerStatus(false)
            }).catch(reason => {
                this.setLoadError(true)
                this.spinner.setSpinnerStatus(false)
            })
    }

    get lessonType() {
        return this._lessonType;
    }

    setLessonType(value) {
        this._lessonType = value
    }

}
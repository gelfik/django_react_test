import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class ALessonStore {
    _spinner = new SpinnerStore()
    _loadError = false
    _lessonID = undefined
    _lessonData = {}
    _lessonType = undefined


    constructor($client) {
        makeObservable(this, {
            _spinner: observable,
            spinner: computed,

            _loadError: observable,
            loadError: computed,
            setLoadError: action,

            _lessonID: observable,
            lessonID: computed,
            setLessonID: action,

            _lessonData: observable,
            lessonData: computed,
            setLessonData: action,
            loadLessonData: action,

            _lessonType: observable,
            lessonType: computed,
            setLessonType: action,

            getTest: action,
        })

        this.client = $client;
    }

    get spinner() {
        return this._spinner;
    }

    get loadError() {
        return this._loadError;
    }

    setLoadError(value) {
        this._loadError = value
    }

    get lessonID() {
        return this._lessonID;
    }

    setLessonID = (CourseID, SubCourseID, value, force = false) => {
        if ((this.lessonData.length === 0) || (this.lessonID !== value) || (force)) {
            this._lessonID = value
            this.loadLessonData(CourseID, SubCourseID, this.lessonID)
        }
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

    getTest = () => {
        if (this.lessonType === 'testPOL') return this.lessonData?.testPOL
        if (this.lessonType === 'testCHL') return this.lessonData?.testCHL
    }

}
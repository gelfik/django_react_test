import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class ASubCourseStore {
    _subCourseData = {}

    _spinner = new SpinnerStore()

    _loadError = false

    _subCourseID = undefined

    _errorsAdd = undefined

    _lessonListAddData = {}

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

            _errorsAdd: observable,
            errorsAdd:computed,
            setErrorAdd: action,

            _lessonListAddData: observable,
            lessonListAddData: computed,
            setlessonListAddData: action
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

    get errorsAdd() {
        return toJS(this._errorsAdd);
    }

    setErrorAdd = (value) => {
        this._errorsAdd = value;
    }

    loadLessonListAdd = (data, courseID) => {
        return this.client.post(`/apanel/course/${courseID}/sub/${this.subCourseID}/lessonList/add/`, data).then((response) => {
            // console.log(response.data.status)
            this.setlessonListAddData(response.data)
            this.setErrorAdd(undefined)
        }).catch(errors => {
            this.setlessonListAddData({})
            if (errors.response.data?.errors) {
                this.setErrorAdd(errors.response.data?.errors)
            }
            if (errors.response.data?.detail) {
                this.setErrorAdd({error:errors.response.data?.detail})
            }
            if (errors.response.data?.error) {
                this.setErrorAdd({error:errors.response.data?.error})
            }
        })
    }

    get lessonListAddData() {
        return toJS(this._lessonListAddData);
    }

    setlessonListAddData = (value) => {
        this._lessonListAddData = value;
    }


    drbdrbdrb = () => {
        console.log(this.errorsAdd)
    }

}
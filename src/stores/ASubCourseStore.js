import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class ASubCourseStore {
    _subCourseData = {}

    _spinner = new SpinnerStore()

    _loadError = false

    _subCourseID = undefined

    _errorsAdd = undefined

    _lessonListAddData = {}

    _errorsEdit = undefined

    _subCourseEditData = {}

    _subCourseDeleteData = {}

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
            setlessonListAddData: action,
            loadLessonListAdd: action,

            _errorsEdit: observable,
            errorsEdit: computed,
            setErrorEdit: action,

            loadSubCourseEdit: action,

            _subCourseEditData: observable,
            subCourseEditData: computed,
            setSubCourseEditData: action,

            loadSubCourseDelete: action,

            _subCourseDeleteData: observable,
            subCourseDeleteData: computed,
            setSubCourseDeleteData: action,
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
            this.setSubCourseID(courseID, this.subCourseID, true)
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

    get errorsEdit() {
        return toJS(this._errorsEdit);
    }

    setErrorEdit = (value) => {
        this._errorsEdit = value;
    }

    loadSubCourseEdit = (data, courseID) => {
        return this.client.post(`/apanel/course/${courseID}/sub/${this.subCourseID}/edit/`, data).then((response) => {
            // console.log(response.data)
            this.setSubCourseEditData(response.data)
            this.setErrorEdit(undefined)
            this.loadSubCourseData(courseID, this.subCourseID)
        }).catch(errors => {
            // console.log(errors.response)
            this.setSubCourseEditData({})
            if (errors.response.data?.errors) {
                this.setErrorEdit(errors.response.data?.errors)
            }
            if (errors.response.data?.detail) {
                this.setErrorEdit({error:errors.response.data?.detail})
            }
            if (errors.response.data?.error) {
                this.setErrorEdit({error:errors.response.data?.error})
            }
            // this.setErroAddrByKey(this.checkErrors(errors.response.data))
        })
    }

    get subCourseEditData() {
        return toJS(this._subCourseEditData);
    }

    setSubCourseEditData = (value) => {
        this._subCourseEditData = value;
    }

    loadSubCourseDelete = (courseID) => {
        return this.client.delete(`/apanel/course/${courseID}/sub/${this.subCourseID}/delete/`).then((response) => {
            // console.log(response.data)
            this.setSubCourseDeleteData(response.data)
        }).catch(errors => {
            this.setSubCourseDeleteData(errors.response.data)
            // this.setErroAddrByKey(this.checkErrors(errors.response.data))
        })
    }

    get subCourseDeleteData() {
        return toJS(this._subCourseDeleteData);
    }

    setSubCourseDeleteData = (value) => {
        this._subCourseDeleteData = value;
    }
}
import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class ALessonStore {
    _lessonData = {}

    _spinner = new SpinnerStore()

    _loadError = false

    _errorsAdd = undefined

    _lessonID = undefined
    _lessonListID = undefined

    _lessonAddData = {}

    _lessonListAddData = {}
    _lessonListEditData = {}

    _errorsEdit = undefined

    constructor($client) {
        makeObservable(this, {
            _lessonData: observable,
            lessonData: computed,
            setLessonData: action,
            loadLessonData: action,

            _spinner: observable,
            spinner: computed,

            _loadError: observable,
            loadError: computed,
            setLoadError: action,

            _lessonID: observable,
            lessonID: computed,
            setLessonID: action,

            _lessonListID: observable,
            lessonListID: computed,
            setLessonListID: action,

            _errorsAdd: observable,
            errorsAdd:computed,
            setErrorAdd: action,

            _lessonAddData:observable,
            lessonAddData:computed,
            setlessonAddData:action,
            loadLessonAdd:action,

            _lessonListEditData: observable,
            lessonListEditData: computed,
            setLessonListEditData: action,
            loadLessonListEdit: action,

            _errorsEdit: observable,
            errorsEdit: computed,
            setErrorEdit: action,
        })

        this.client = $client;
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

    get lessonID() {
        return this._lessonID;
    }

    setLessonID = (CourseID, SubCourseID, value, force = false) => {
        if ((this.lessonData.length === 0) || (this.lessonID !== value) || (force)) {
            this._lessonID = value
            this.loadLessonData(CourseID, SubCourseID, this.lessonID)
        }
    }

    get lessonListID() {
        return this._lessonListID;
    }

    setLessonListID(value) {
        this._lessonListID = value
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

    loadLessonAdd = (data, courseID, subCourseID) => {
        return this.client.post(`/apanel/course${courseID}/sub${subCourseID}/lessonList${this.lessonListID}/lesson/add`, data).then((response) => {
            // console.log(response.data.status)
            this.setlessonAddData(response.data)
            this.setErrorAdd(undefined)
            this.setLessonID(courseID,subCourseID, this.lessonAddData?.lessonID)
        }).catch(errors => {
            this.setlessonAddData({})
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

    get lessonAddData() {
        return toJS(this._lessonListAddData);
    }

    setlessonAddData = (value) => {
        this._lessonListAddData = value;
    }

    get errorsEdit() {
        return toJS(this._errorsEdit);
    }

    setErrorEdit = (value) => {
        this._errorsEdit = value;
    }

    loadLessonListEdit = (data, courseID, subCourseID) => {
        return this.client.post(`/apanel/course${courseID}/sub${subCourseID}/lessonList${this.lessonListID}/edit`, data).then((response) => {
            // console.log(response.data)
            this.setLessonListEditData(response.data)
            this.setErrorEdit(undefined)
        }).catch(errors => {
            // console.log(errors.response)
            this.setLessonListEditData({})
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

    get lessonListEditData() {
        return toJS(this._lessonListEditData);
    }

    setLessonListEditData = (value) => {
        this._lessonListEditData = value;
    }

}
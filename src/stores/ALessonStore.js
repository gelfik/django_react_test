import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class ALessonStore {
    _lessonData = {}

    _spinner = new SpinnerStore()

    _loadError = false

    _errorsAdd = undefined
    _errorsEdit = undefined
    _errorsLessonEdit = undefined

    _lessonID = undefined
    _lessonListID = undefined
    _lessonFileListID = undefined

    _lessonAddData = {}
    _lessonEditData = {}
    _lessonDeleteData = {}

    _lessonListAddData = {}
    _lessonListEditData = {}
    _lessonListDeleteData = {}

    _lessonFileAdd = {}
    _lessonFileDelete = {}

    _lessonType = undefined


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

            _lessonType: observable,
            lessonType: computed,
            setLessonType: action,

            _lessonID: observable,
            lessonID: computed,
            setLessonID: action,

            _lessonListID: observable,
            lessonListID: computed,
            setLessonListID: action,

            _errorsAdd: observable,
            errorsAdd: computed,
            setErrorAdd: action,

            _errorsEdit: observable,
            errorsEdit: computed,
            setErrorEdit: action,

            _errorsLessonEdit: observable,
            errorsLessonEdit: computed,
            setErrorLessonEdit: action,

            _lessonAddData: observable,
            lessonAddData: computed,
            setlessonAddData: action,
            loadLessonAdd: action,

            _lessonEditData: observable,
            lessonEditData: computed,
            setlessonEditData: action,
            loadLessonEdit: action,

            _lessonDeleteData: observable,
            lessonDeleteData: computed,
            setLessonDeleteData: action,
            loadLessonDelete: action,

            _lessonListEditData: observable,
            lessonListEditData: computed,
            setLessonListEditData: action,
            loadLessonListEdit: action,

            _lessonListDeleteData: observable,
            lessonListDeleteData: computed,
            setLessonListDeleteData: action,
            loadLessonListDelete: action,

            _lessonFileAdd:observable,
            lessonFileAdd: computed,
            setLessonFileAdd: action,
            loadLessonFileAdd: action,

            // _lessonFileDelete:observable,
            // lessonFileDelete: computed,
            // setLessonFileDelete: action,
            // loadLessonFileDelete: action,



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

    get lessonType() {
        return this._lessonType;
    }

    setLessonType(value) {
        this._lessonType = value
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
            this.setLessonID(courseID, subCourseID, this.lessonAddData?.lessonID)
        }).catch(errors => {
            this.setlessonAddData({})
            if (errors.response.data?.errors) {
                this.setErrorAdd(errors.response.data?.errors)
            }
            if (errors.response.data?.detail) {
                this.setErrorAdd({error: errors.response.data?.detail})
            }
            if (errors.response.data?.error) {
                this.setErrorAdd({error: errors.response.data?.error})
            }
        })
    }

    get lessonAddData() {
        return toJS(this._lessonListAddData);
    }

    setlessonAddData = (value) => {
        this._lessonListAddData = value;
    }


    get errorsLessonEdit() {
        return toJS(this._errorsLessonEdit);
    }

    setErrorLessonEdit = (value) => {
        this._errorsLessonEdit = value;
    }

    loadLessonEdit = (data, courseID, subCourseID) => {
        return this.client.post(`/apanel/course${courseID}/sub${subCourseID}/lesson${this.lessonID}/edit`, data).then((response) => {
            // console.log(response.data.status)
            this.setlessonEditData(response.data)
            this.setErrorLessonEdit(undefined)
            this.loadLessonData(courseID, subCourseID, this.lessonID)
        }).catch(errors => {
            this.setlessonEditData({})
            if (errors.response.data?.errors) {
                this.setErrorLessonEdit(errors.response.data?.errors)
            }
            if (errors.response.data?.detail) {
                this.setErrorLessonEdit({error: errors.response.data?.detail})
            }
            if (errors.response.data?.error) {
                this.setErrorLessonEdit({error: errors.response.data?.error})
            }
        })
    }

    get lessonEditData() {
        return toJS(this._lessonEditData);
    }

    setlessonEditData = (value) => {
        this._lessonEditData = value;
    }


    loadLessonDelete = (courseID, subCourseID) => {
        return this.client.delete(`/apanel/course${courseID}/sub${subCourseID}/lesson${this.lessonID}/delete`).then((response) => {
            // console.log(response.data.status)
            this.setLessonDeleteData(response.data)
        }).catch(errors => {
            this.setLessonDeleteData({})
            if (errors.response.data?.errors) {
                this.setLessonDeleteData(errors.response.data)
            }
        })
    }

    get lessonDeleteData() {
        return toJS(this._lessonDeleteData);
    }

    setLessonDeleteData = (value) => {
        this._lessonDeleteData = value;
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
                this.setErrorEdit({error: errors.response.data?.detail})
            }
            if (errors.response.data?.error) {
                this.setErrorEdit({error: errors.response.data?.error})
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

    loadLessonListDelete = (courseID, subCourseID) => {
        return this.client.delete(`/apanel/course${courseID}/sub${subCourseID}/lessonList${this.lessonListID}/delete`).then((response) => {
            // console.log(response.data)
            this.setLessonListDeleteData(response.data)
        }).catch(errors => {
            // console.log(errors.response)
            this.setLessonListDeleteData(errors.response.data)
            // this.setErroAddrByKey(this.checkErrors(errors.response.data))
        })
    }

    get lessonListDeleteData() {
        return toJS(this._lessonListDeleteData);
    }

    setLessonListDeleteData = (value) => {
        this._lessonListDeleteData = value;
    }

    loadLessonFileAdd = (data, courseID, subCourseID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.put(`apanel/course${courseID}/sub${subCourseID}/lesson${this.lessonID}/fileLoad`, data).then((response) => {
            this.setLessonFileAdd(response.data)
            this.spinner.setSpinnerStatus(false)
        }).catch(errors => {
            this.setLessonFileAdd(errors.response.data)
            this.spinner.setSpinnerStatus(false)
        })
    }

    get lessonFileAdd() {
        return toJS(this._lessonFileAdd);
    }

    setLessonFileAdd = (value) => {
        this._lessonFileAdd = value;
    }

}
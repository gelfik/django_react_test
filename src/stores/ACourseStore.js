import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class ACourseStore {
    _courseData = {}
    _purchaseData = []

    _spinner = new SpinnerStore()

    _loadError = false

    _courseID = undefined

    _purchaseUserID = undefined

    _errorsAdd = undefined

    _errorsEdit = undefined

    _subCourseAddData = {}

    _courseEditData = {}

    _courseDraftData = {}

    _courseDeleteData = {}

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

            _purchaseUserID: observable,
            purchaseUserID: computed,
            setPurchaseUserID: action,

            _purchaseData: observable,
            purchaseData: computed,
            setPurchaseData: action,
            loadPurchaseData: action,

            _errorsAdd: observable,
            errorsAdd: computed,
            setErrorAdd: action,

            loadSubCourseAdd: action,

            _subCourseAddData: observable,
            subCourseAddData: computed,
            setSubCourseAddData: action,

            _errorsEdit: observable,
            errorsEdit: computed,
            setErrorEdit: action,

            loadCourseEdit: action,

            _courseEditData: observable,
            courseEditData: computed,
            setCourseEditData: action,

            loadCourseDraft: action,

            _courseDraftData: observable,
            courseDraftData: computed,
            setCourseDraftData: action,

            loadCourseDelete: action,

            _courseDeleteData: observable,
            courseDeleteData: computed,
            setCourseDeleteData: action,

            loadMentorAdd: action,
            loadMentorDelete: action,
        })

        this.client = $client;
    }


    get purchaseData() {
        return toJS(this._purchaseData);
    }

    setPurchaseData = (value) => {
        this._purchaseData = value
    }

    loadPurchaseData = (CourseID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.get(`/apanel/course${CourseID}/purchaseList`)
            .then(response => {
                this.setLoadError(false)
                this.setPurchaseData(response.data)
                this.spinner.setSpinnerStatus(false)
            }).catch(reason => {
                this.setLoadError(true)
                this.spinner.setSpinnerStatus(false)
            })
    }

    get purchaseUserID() {
        return this._purchaseUserID;
    }

    setPurchaseUserID = (value) => {
        this._purchaseUserID = value
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
        return this.client.get(`/apanel/course${CourseID}`)
            .then(response => {
                this.setLoadError(false)
                this.setCourseData(response.data)
                this.spinner.setSpinnerStatus(false)
                this.loadPurchaseData(CourseID)
            }).catch(reason => {
                this.setLoadError(true)
                this.spinner.setSpinnerStatus(false)
            })
    }

    get errorsAdd() {
        return toJS(this._errorsAdd);
    }

    setErrorAdd = (value) => {
        this._errorsAdd = value;
    }

    loadSubCourseAdd = (data) => {
        return this.client.post(`/apanel/course${this.courseID}/sub/add`, data).then((response) => {
            // console.log(response.data.status)
            this.setSubCourseAddData(response.data)
            this.setErrorAdd(undefined)
        }).catch(errors => {
            this.setSubCourseAddData({})
            if (errors.response.data?.errors) {
                this.setErrorAdd(errors.response.data?.errors)
            }
            if (errors.response.data?.detail) {
                this.setErrorAdd({error:errors.response.data?.detail})
            }
            if (errors.response.data?.error) {
                this.setErrorAdd({error:errors.response.data?.error})
            }
            // this.setErroAddrByKey(this.checkErrors(errors.response.data))
        })
    }

    get subCourseAddData() {
        return toJS(this._subCourseAddData);
    }

    setSubCourseAddData = (value) => {
        this._subCourseAddData = value;
    }

    get errorsEdit() {
        return toJS(this._errorsEdit);
    }

    setErrorEdit = (value) => {
        this._errorsEdit = value;
    }

    loadCourseEdit = (data) => {
        return this.client.post(`/apanel/course${this.courseID}/edit`, data).then((response) => {
            // console.log(response.data)
            this.setCourseEditData(response.data)
            this.setErrorEdit(undefined)
            this.loadCourseData(this.courseID)
        }).catch(errors => {
            // console.log(errors.response)
            this.setCourseEditData({})
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

    get courseEditData() {
        return toJS(this._courseEditData);
    }

    setCourseEditData = (value) => {
        this._courseEditData = value;
    }



    loadCourseDraft = () => {
        return this.client.post(`/apanel/course${this.courseID}/edit`, {draft: true}).then((response) => {
            // console.log(response.data)
            this.setCourseDraftData(response.data)
            this.loadCourseData(this.courseID)
        }).catch(errors => {
            // console.log(errors.response)
            this.setCourseDraftData(errors.response.data)
            // if (errors.response.data?.errors) {
            //     this.setErrorEdit(errors.response.data?.errors)
            // }
            // if (errors.response.data?.detail) {
            //     this.setErrorEdit({error:errors.response.data?.detail})
            // }
            // if (errors.response.data?.error) {
            //     this.setErrorEdit({error:errors.response.data?.error})
            // }
            // this.setErroAddrByKey(this.checkErrors(errors.response.data))
        })
    }

    get courseDraftData() {
        return toJS(this._courseDraftData);
    }

    setCourseDraftData = (value) => {
        this._courseDraftData = value;
    }

    loadCourseDelete = () => {
        return this.client.delete(`/apanel/course${this.courseID}/delete`).then((response) => {
            // console.log(response.data)
            this.setCourseDeleteData(response.data)
        }).catch(errors => {
            this.setCourseDeleteData(errors.response.data)
            // this.setErroAddrByKey(this.checkErrors(errors.response.data))
        })
    }

    get courseDeleteData() {
        return toJS(this._courseDeleteData);
    }

    setCourseDeleteData = (value) => {
        this._courseDeleteData = value;
    }

    loadMentorAdd = (courseID, mentorID) => {
        return this.client.post(`apanel/course${courseID}/mentor${mentorID}`).then((response) => {
            this.loadCourseData(courseID)
        })
    }

    loadMentorDelete = (courseID, mentorID) => {
        return this.client.delete(`apanel/course${courseID}/mentor${mentorID}`).then((response) => {
            this.loadCourseData(courseID)
        })
    }

}
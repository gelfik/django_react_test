import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class ACourseStore {
    _courseData = {}
    _purchaseData = []

    _spinner = new SpinnerStore()

    _loadError = false

    _courseID = undefined

    _purchaseUserID = undefined

    _subCourseID = undefined

    _errorsAdd = undefined

    _subCourseAddData = {}

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
        return this.client.get(`/apanel/course/${CourseID}/purchaseList/`)
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
        return this.client.get(`/apanel/course/${CourseID}/`)
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
        return this.client.post(`/apanel/course/${this.courseID}/sub/add/`, data).then((response) => {
            // console.log(response.data.status)
            this.setSubCourseAddData(response.data)
            this.setErrorAdd(undefined)
        }).catch(errors => {
            this.setSubCourseAddData({})
            if (errors.response.data?.errors) {
                this.setErrorAdd(errors.response.data?.errors)
            }
            if (errors.response.data?.detail) {
                this.setErrorAdd(errors.response.data?.detail)
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

}
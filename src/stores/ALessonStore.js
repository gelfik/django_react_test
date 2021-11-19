import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class ALessonStore {
    _spinner = new SpinnerStore()
    _loadError = false
    _lessonID = undefined
    _lessonData = {}
    _lessonType = undefined
    _response = {}
    _lessonAddType = undefined


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

            _response: observable,
            response: computed,
            setResponse: action,

            _lessonAddType: observable,
            lessonAddType: computed,
            setLessonAddType: action,

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

    get response() {
        return toJS(this._response);
    }

    setResponse = (value) => {
        this._response = value
    }

    get lessonAddType() {
        return this._lessonAddType
    }

    setLessonAddType = (value) => {
        this._lessonAddType = value
    }

    loadLessonEdit = (data, courseID, subCourseID) => {
        return this.client.put(`/apanel/course${courseID}/sub${subCourseID}/lesson${this.lessonID}`, data).then((response) => {
            this.setResponse({status: true})
            this.setLessonData(response.data)
            // this.loadLessonData(courseID, subCourseID, this.lessonID)
            // this.loadLessonData(courseID, subCourseID, this.lessonID)
        }).catch(errors => {
            this.setResponse({})
            if (errors.response.data?.errors) {
                this.setResponse(errors.response.data?.errors)
            }
            if (errors.response.data?.detail) {
                this.setResponse({error: errors.response.data?.detail})
            }
            if (errors.response.data?.error) {
                this.setResponse({error: errors.response.data?.error})
            }
        })
    }

    loadLessonDelete = (courseID, subCourseID) => {
        return this.client.delete(`/apanel/course${courseID}/sub${subCourseID}/lesson${this.lessonID}/delete`).then((response) => {
            this.setResponse(response.data)
        }).catch(errors => {
            this.setResponse({})
            if (errors.response.data?.errors) {
                this.setResponse(errors.response.data)
            }
        })
    }

    loadLessonListEdit = (data, courseID, subCourseID) => {
        return this.client.post(`/apanel/course${courseID}/sub${subCourseID}/lesson${this.lessonID}/edit`, data).then((response) => {
            // console.log(response.data)
            this.setResponse(response.data)
        }).catch(errors => {
            // console.log(errors.response)
            this.setResponse({})
            if (errors.response.data?.errors) {
                this.setResponse(errors.response.data?.errors)
            }
            if (errors.response.data?.detail) {
                this.setResponse({error: errors.response.data?.detail})
            }
            if (errors.response.data?.error) {
                this.setResponse({error: errors.response.data?.error})
            }
            // this.setErroAddrByKey(this.checkErrors(errors.response.data))
        })
    }

    loadLessonListDelete = (courseID, subCourseID) => {
        return this.client.delete(`/apanel/course${courseID}/sub${subCourseID}/lesson${this.lessonID}`).then((response) => {
            // console.log(response.data)
            this.setResponse(response.data)
        }).catch(errors => {
            // console.log(errors.response)
            this.setResponse(errors.response.data)
            // this.setErroAddrByKey(this.checkErrors(errors.response.data))
        })
    }

    loadLessonAdd = (data, courseID, subCourseID) => {
        return this.client.post(`/apanel/course${courseID}/sub${subCourseID}/lesson${this.lessonID}/add`, data).then((response) => {
            // console.log(response.data.status)
            this.setResponse(response.data)
            this.setLessonID(courseID, subCourseID, this.response?.lessonID)
        }).catch(errors => {
            this.setResponse({})
            if (errors.response.data?.errors) {
                this.setResponse(errors.response.data?.errors)
            }
            if (errors.response.data?.detail) {
                this.setResponse({error: errors.response.data?.detail})
            }
            if (errors.response.data?.error) {
                this.setResponse({error: errors.response.data?.error})
            }
        })
    }

    loadLectureFileAdd = (data, courseID, subCourseID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.put(`apanel/course${courseID}/sub${subCourseID}/lesson${this.lessonID}/fileLoad`, data).then((response) => {
            this.setResponse(response.data)
            this.spinner.setSpinnerStatus(false)
        }).catch(errors => {
            this.setResponse(errors.response.data)
            this.spinner.setSpinnerStatus(false)
        })
    }

    getTest = () => {
        if (this.lessonType === 'testPOL') return this.lessonData?.testPOL
        if (this.lessonType === 'testCHL') return this.lessonData?.testCHL
    }

}
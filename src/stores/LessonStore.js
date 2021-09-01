import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";


export default class LessonStore {
    _lessonData = {}

    _spinner = new SpinnerStore()

    _loadError = false

    _lessonID = undefined

    constructor($client) {
        makeObservable(this, {
            _lessonData: observable,
            lessonData: computed,
            setLessonData: action,
            loadLessonData: action,
            loadHomeworkData: action,

            _spinner: observable,
            spinner: computed,

            _loadError: observable,
            loadError: computed,
            setLoadError: action,

            _lessonID: observable,
            lessonID: computed,
            setLessonID: action,
        })
        this.client = $client;
    }



    get lessonID() {
        return this._lessonID;
    }

    setLessonID = (purchaseID, subID, value) => {
        if (this.lessonID !== value) {
            this._lessonID = value
            this.loadLessonData(purchaseID, subID, this.lessonID)
        }
    }

    get loadError() {
        return this._loadError;
    }

    setLoadError = (value) => {
        this._loadError = value
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

    loadLessonData = (purchaseID, subID, lessonID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.get(`/purchase/${purchaseID}/sub/${subID}/lesson/${lessonID}/`)
            .then(response => {
                this.setLoadError(false)
                this.spinner.setSpinnerStatus(false)
                this.setLessonData(response.data)
            }).catch(reason => {
                this.setLoadError(true)
                this.spinner.setSpinnerStatus(false)
            })
    }


    loadHomeworkData = (purchaseID, subID, lessonID, homeworkID, data) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.post(`/purchase/${purchaseID}/homework/${homeworkID}/`, data)
            .then(response => {
                this.setLoadError(false)
                this.spinner.setSpinnerStatus(false)
                this.loadLessonData(purchaseID, subID, lessonID)
            }).catch(reason => {
                this.setLoadError(true)
                this.spinner.setSpinnerStatus(false)
            })
    }

}
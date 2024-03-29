import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class AProgressLessonStore {
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

    setLessonID = (PurchaseID, SubID, value, force = false) => {
        if ((this.lessonData.length === 0) || (this.lessonID !== value) || (force)) {
            this._lessonID = value
            this.loadLessonData(PurchaseID, SubID, this.lessonID)
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

    get lessonData() {
        return toJS(this._lessonData);
    }

    setLessonData = (value) => {
        this._lessonData = value
    }

    loadLessonData = (PurchaseID, SubID, LessonID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.get(`/progress${PurchaseID}/sub${SubID}/lesson${LessonID}`)
            .then(response => {
                this.setLoadError(false)
                this.setLessonData(response.data)
                this.spinner.setSpinnerStatus(false)
            }).catch(reason => {
                this.setLoadError(true)
                this.spinner.setSpinnerStatus(false)
            })
    }

}
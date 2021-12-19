import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class ProgressSubStore {
    _subData = {}

    _spinner = new SpinnerStore()

    _loadError = false

    _subID = undefined

    constructor($client) {
        makeObservable(this, {
            _subData: observable,
            subData: computed,
            setSubData: action,
            loadSubData: action,

            _spinner: observable,
            spinner: computed,

            _loadError: observable,
            loadError: computed,
            setLoadError: action,

            _subID: observable,
            subID: computed,
            setSubID: action,
        })

        this.client = $client;
    }


    get subID() {
        return this._subID;
    }

    setSubID = (PurchaseID, value, force = false) => {
        if ((this.subData.length === 0) || (this.subID !== value) || (force)) {
            this._subID = value
            this.loadSubData(PurchaseID, this.subID)
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

    get subData() {
        return toJS(this._subData);
    }

    setSubData = (value) => {
        this._subData = value
    }

    loadSubData = (PurchaseID, SubID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.get(`/progress${PurchaseID}/sub${SubID}`)
            .then(response => {
                this.setLoadError(false)
                this.setSubData(response.data)
                this.spinner.setSpinnerStatus(false)
            }).catch(reason => {
                this.setLoadError(true)
                this.spinner.setSpinnerStatus(false)
            })
    }

}
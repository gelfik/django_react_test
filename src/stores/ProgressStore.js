import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class ProgressStore {
    _purchaseData = {}

    _spinner = new SpinnerStore()

    _loadError = false

    _purchaseID = undefined

    constructor($client) {
        makeObservable(this, {
            _purchaseData: observable,
            purchaseData: computed,
            setPurchaseData: action,
            loadPurchaseData: action,

            _spinner: observable,
            spinner: computed,

            _loadError: observable,
            loadError: computed,
            setLoadError: action,

            _purchaseID: observable,
            purchaseID: computed,
            setPurchaseID: action,
        })

        this.client = $client;
    }


    get purchaseID() {
        return this._purchaseID;
    }

    setPurchaseID = (value, force = false) => {
        if ((this.purchaseData.length === 0) || (this.purchaseID !== value) || (force)) {
            this._purchaseID = value
            this.loadPurchaseData(this.purchaseID)
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

    get purchaseData() {
        return toJS(this._purchaseData);
    }

    setPurchaseData = (value) => {
        this._purchaseData = value
    }

    loadPurchaseData = (PurchaseID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.get(`/progress${PurchaseID}`)
            .then(response => {
                this.setLoadError(false)
                this.setPurchaseData(response.data)
                this.spinner.setSpinnerStatus(false)
            }).catch(reason => {
                this.setLoadError(true)
                this.spinner.setSpinnerStatus(false)
            })
    }

}
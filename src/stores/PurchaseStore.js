import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";


export default class PurchaseStore {
    _purchaseData = {}

    _spinner = new SpinnerStore()

    _loadError = false

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
        })
        this.client = $client;
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


    get purchaseData() {
        return toJS(this._purchaseData);
    }

    setPurchaseData = (value) => {
        this._purchaseData = value
    }

    loadPurchaseData = () => {
        this.spinner.setSpinnerStatus(true)
        return this.client.get('/purchase/list/')
            .then(response => {
                this.setLoadError(false)
                this.spinner.setSpinnerStatus(false)
                this.setPurchaseData(response.data)
            }).catch(reason => {
                this.setLoadError(true)
                this.spinner.setSpinnerStatus(false)
            })
    }
}
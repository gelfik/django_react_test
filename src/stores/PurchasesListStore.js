import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";


export default class PurchasesListStore {
    _purchasesListData = []

    _spinner = new SpinnerStore()

    _loadError = false

    constructor($client) {
        makeObservable(this, {
            _purchasesListData: observable,
            purchasesListData: computed,
            setPurchasesListData: action,
            loadPurchasesListData: action,

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


    get purchasesListData() {
        return toJS(this._purchasesListData);
    }

    setPurchasesListData = (value) => {
        this._purchasesListData = value
    }

    loadPurchasesListData = () => {
        this.spinner.setSpinnerStatus(true)
        return this.client.get('/purchase/list/')
            .then(response => {
                this.setLoadError(false)
                this.spinner.setSpinnerStatus(false)
                this.setPurchasesListData(response.data)
            }).catch(reason => {
                this.setLoadError(true)
                this.spinner.setSpinnerStatus(false)
            })
    }
}
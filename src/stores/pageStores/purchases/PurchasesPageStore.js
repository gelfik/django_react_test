import {computed, makeObservable, observable} from "mobx";
import SpinnerStore from "../../SpinnerStore";


export default class PurchasesPageStore {
    _spinner = new SpinnerStore()

    constructor($client) {
        makeObservable(this, {
            _spinner: observable,
            spinner: computed,
        })
        this.client = $client;
    }

    get spinner() {
        return this._spinner;
    }


}
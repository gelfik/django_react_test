import {action, computed, makeObservable, observable, toJS} from "mobx";

export default class APurManageStore {
    _activeTab = undefined
    _purchase = undefined

    constructor($client) {
        makeObservable(this, {
            _activeTab: observable,
            activeTab: computed,
            setActiveTab: action,

            _purchase: observable,
            purchase: computed,
            setPurchase: action,
        })
        this.client = $client;
    }

    get activeTab() {
        return toJS(this._activeTab);
    }

    setActiveTab = (value) => {
        this._activeTab = value
    }

    get purchase() {
        return toJS(this._purchase);
    }

    setPurchase = (value) => {
        this._purchase = value
    }


}
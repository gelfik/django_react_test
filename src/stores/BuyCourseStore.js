import {action, computed, makeObservable, observable} from "mobx";

export default class BuyCourseStore {
    _buyText = {
        error: '',
        valid: ''
    }

    constructor($client) {
        makeObservable(this, {
            _buyText: observable,
            buyText: computed,
            setBuyText: action,
            loadBuyData: action,
            loadPurchaseBuyData: action,
        })
        this.client = $client;
    }

    get buyText() {
        return this._buyText;
    }

    setBuyText(error, valid) {
        this._buyText = {error: error, valid: valid}
    }

    loadBuyData = (data) => {
        return this.client.post(`/purchase/buy/`, data)
            .then(response => {
                if (response?.data?.result === 'succes') {
                    this.setBuyText('', response?.data?.message)
                }
                if (response?.data?.result === 'error') {
                    this.setBuyText(response?.data?.message, '')
                }
            })
    }

    loadPurchaseBuyData = (data) => {
        return this.client.post(`/purchase/purchaseBuy/`, data)
            .then(response => {
                if (response?.data?.result === 'succes') {
                    this.setBuyText('', response?.data?.message)
                }
                if (response?.data?.result === 'error') {
                    this.setBuyText(response?.data?.message, '')
                }
            })
    }
}
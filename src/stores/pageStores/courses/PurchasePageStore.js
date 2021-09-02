import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "../../SpinnerStore";

export default class PurchasePageStore {
    _payType = false
    _spinner = new SpinnerStore()
    _promocodeData = {promocode: '', type: '', count: 0}
    _price = {price: 0, totalPrice: 0}
    _promoText = {
        error: '',
        valid: ''
    }

    _buyStatus = {
        status: false,
        id: undefined
    }

    _buySub = {
        text: '',
        id: 0
    }

    constructor($client, $buyCourseSore) {
        makeObservable(this, {
            _payType: observable,
            setPayType: action,
            payType: computed,

            _spinner: observable,
            spinner: computed,

            _promocodeData: observable,
            promocodeData: computed,
            setPromocodeData: action,
            setPromocodeDataRequest: action,
            loadPromocodeData: action,

            _price: observable,
            price: computed,
            setPrice: action,

            _promoText: observable,
            promoText: computed,
            setPromoText: action,

            _buyStatus: observable,
            buyStatus: computed,
            setBuyStatus: action,
            loadCheckBuy: action,

            _buySub: observable,
            buySub: computed,
            setBuySub: action,

        })
        this.buyCourseStore = $buyCourseSore;
        this.client = $client;
    }

    get buySub() {
        return this._buySub;
    }

    setBuySub(text, id) {
        this._buySub = {text: text, id: id}
    }

    buyData = (purchaseID) => {
        const data = {}
        data.purchaseID=purchaseID
        if (this.promocodeData.promocode !== '') {
            data.promocode=this.promocodeData.promocode
        }
        if (this.payType) {
            data.buyAll=this.payType
        }

        if ((this.buySub.name !== '') && !this.payType) {
            data.subID=this.buySub.id
        }

        return this.buyCourseStore.loadPurchaseBuyData(data)
    }

    get buyStatus() {
        return this._buyStatus;
    }

    setBuyStatus(value) {
        this._buyStatus = value
    }

    loadCheckBuy = (courseID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.post(`/purchase/checkbuy/`, {courseID: courseID})
            .then(response => {
                this.setBuyStatus(response?.data)
                this.spinner.setSpinnerStatus(false)
            })
    }

    get promoText() {
        return this._promoText;
    }

    setPromoText(error, valid) {
        this._promoText = {error: error, valid: valid}
    }

    get price() {
        return this._price;
    }

    setPrice(price, totalPrice) {
        this._price = {price: price, totalPrice: totalPrice}
    }

    get promocodeData() {
        return this._promocodeData;
    }

    setPromocodeData(promocode, type, count) {
        this._promocodeData = {promocode: promocode, type: type, count: count}
    }

    setPromocodeDataRequest(value) {
        this._promocodeData = value
    }

    loadPromocodeData = (promocode, courseID, courseType) => {
        return this.client.post(`/promocode/validate/`, {promocode: promocode, courseID: courseID, courseType: courseType})
            .then(response => {
                if (response?.data?.error) {
                    // console.log(response?.data?.error)
                    this.setPromocodeData('', '', 0)
                    this.setPromoText(response?.data?.error, '')

                }
                if (response?.data?.promocode) {
                    this.setPromocodeDataRequest(response?.data)
                    this.setPromoText('', 'промокод принят')
                }
                // console.log(response)
            })
    }

    get spinner() {
        return this._spinner;
    }

    get payType() {
        return toJS(this._payType);
    }

    setPayType = (value) => {
        this._payType = value
    }

}
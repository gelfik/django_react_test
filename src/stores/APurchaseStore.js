import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class APurchaseStore {

    _purchaseData = undefined
    _notPurchaseData = []
    _loadError = false
    _purchaseUserID = undefined
    _purchaseID = undefined
    _purchaseListData = []
    _response = {}

    _spinner = new SpinnerStore()

    _filterRequest = {
        courseSub: 'Все разделы',
        search: '',
        page: 1
    }

    _filterRequestOld = {}

    constructor($client) {
        makeObservable(this, {
            _spinner: observable,
            spinner: computed,
            // _loadError: observable,
            // loadError: computed,
            // setLoadError: action,
            _purchaseUserID: observable,
            purchaseUserID: computed,
            setPurchaseUserID: action,

            _purchaseData: observable,
            purchaseData: computed,
            setPurchaseData: action,
            // loadPurchaseData: action,

            _filterRequest: observable,
            setFilterRequest: action,
            loadFilterRequest: action,
            filterRequest: computed,

            _filterRequestOld: observable,
            setFilterRequestOld: action,
            filterRequestOld: computed,

            _notPurchaseData: observable,
            notPurchaseData: computed,
            setNotPurchaseData: action,
            loadNotPurchaseData: action,

            _purchaseID: observable,
            purchaseID: computed,
            setPurchaseID: action,

            _purchaseListData: observable,
            purchaseListData: computed,
            setPurchaseListData: action,
            loadPurchaseListData: action,

            _response: observable,
            response: computed,
            setResponse: action,

        })

        this.client = $client;
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

    loadPurchaseListData = (CourseID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.get(`/apanel/course${CourseID}/purchaseList`)
            .then(response => {
                this.setPurchaseListData(response.data)
                this.spinner.setSpinnerStatus(false)
            }).catch(reason => {
                this.spinner.setSpinnerStatus(false)
            })
    }

    get purchaseUserID() {
        return this._purchaseUserID;
    }

    setPurchaseUserID = (value) => {
        this._purchaseUserID = value
    }

    get filterRequest() {
        return toJS(this._filterRequest);
    }

    setFilterRequest = (key, value) => {
        this._filterRequest[key] = value;
    }

    loadFilterRequest = (CourseID) => {
        // let query = '?'
        const data = {}
        if (this.filterRequest['courseSub'] !== 'Все разделы') {
            data['courseSub'] = this.filterRequest['courseSub']
            if (this.filterRequestOld['courseSub'] !== data['courseSub']) {
                this.filterRequest['courseSub'] = 1
            }
        }
        if (this.filterRequest['search'] !== '') {
            data['search'] = this.filterRequest['search']
            if (this.filterRequestOld['search'] !== data['search']) {
                this.filterRequest['search'] = 1
            }
        }
        if ((this.filterRequestOld['courseSub'] !== data['courseSub']) || (this.filterRequestOld['search'] !== data['search'])) {
            this.filterRequest['page'] = 1
        }

        if (this.filterRequest['page'] !== 1) {
            // query += `&page=${this.filterRequest['page']}`
            data['page'] = this.filterRequest['page']
        }

        // this.spinner.setSpinnerStatus(true)
        this.setFilterRequestOld(data)
        return this.client.get(`/apanel/course${CourseID}/purchaseList`, {params: data})
            .then(response => {
                this.setPurchaseListData(response.data)
                // this.spinner.setSpinnerStatus(false)
            })
    }

    get filterRequestOld() {
        return toJS(this._filterRequestOld);
    }

    setFilterRequestOld = (value) => {
        this._filterRequestOld = value;
    }

    get notPurchaseData() {
        return toJS(this._notPurchaseData);
    }

    setNotPurchaseData = (value) => {
        this._notPurchaseData = value
    }

    loadNotPurchaseData = (PurchaseID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.get(`/purchase${PurchaseID}/noBuy`)
            .then(response => {
                this.setNotPurchaseData(response.data)
                this.spinner.setSpinnerStatus(false)
            }).catch(reason => {
                this.spinner.setSpinnerStatus(false)
            })
    }

    get purchaseID() {
        return this._purchaseID;
    }


    setPurchaseID = (value, force = false) => {
        if ((this.purchaseID !== value) || (force)) {
            this._purchaseID = value
            this.loadPurchaseData(this.purchaseID)
            this.loadNotPurchaseData(this.purchaseID)
        }
    }

    loadPurchaseData = (PurchaseID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.get(`/purchase${PurchaseID}`)
            .then(response => {
                this.setPurchaseData(response.data)
                this.spinner.setSpinnerStatus(false)
            }).catch(reason => {
                this.spinner.setSpinnerStatus(false)
            })
    }

    get purchaseListData() {
        return toJS(this._purchaseListData);
    }

    setPurchaseListData = (value) => {
        this._purchaseListData = value
    }

    loadPurchaseAdd = (data, CourseID, PurchaseID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.put(`/apanel/course${CourseID}/purchase${PurchaseID}`, data)
            .then(response => {
                this.loadPurchaseData(PurchaseID)
                this.spinner.setSpinnerStatus(false)
            }).catch(errors => {
                this.spinner.setSpinnerStatus(false)
                if (errors.response.data?.errors) {
                    this.setResponse(errors.response.data?.errors)
                }
                if (errors.response.data?.detail) {
                    this.setResponse({error: errors.response.data?.detail})
                }
                if (errors.response.data?.error) {
                    this.setResponse({error: errors.response.data?.error})
                }
            })
    }

    get response() {
        return toJS(this._response);
    }

    setResponse = (value) => {
        this._response = value
    }

}

import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class APurchaseStore {

    _purchaseData = []
    _loadError = false
    _purchaseUserID = undefined

    _spinner = new SpinnerStore()

    _filterRequest = {
        courseSub: 'Все подкурсы',
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
            loadPurchaseData: action,

            _filterRequest: observable,
            setFilterRequest: action,
            loadFilterRequest: action,
            filterRequest: computed,

            _filterRequestOld: observable,
            setFilterRequestOld: action,
            filterRequestOld: computed,
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

    loadPurchaseData = (CourseID) => {
        this.spinner.setSpinnerStatus(true)
        return this.client.get(`/apanel/course${CourseID}/purchaseList`)
            .then(response => {
                this.setLoadError(false)
                this.setPurchaseData(response.data)
                this.spinner.setSpinnerStatus(false)
            }).catch(reason => {
                this.setLoadError(true)
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
        if (this.filterRequest['courseSub'] !== 'Все подкурсы') {
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
                this.setPurchaseData(response.data)
                // this.spinner.setSpinnerStatus(false)
            })
    }

    get filterRequestOld() {
        return toJS(this._filterRequestOld);
    }

    setFilterRequestOld = (value) => {
        this._filterRequestOld = value;
    }

}
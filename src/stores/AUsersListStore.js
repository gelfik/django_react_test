import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";


export default class AUsersListStore {
    _usersData = []
    _filterRequest = {
        type: 'Все роли',
        search: '',
        page: 1
    }

    _filterRequestOld = {}

    _spinner = new SpinnerStore()

    constructor($client, $groupListData) {
        makeObservable(this, {
            _usersData: observable,
            setUsersData: action,
            loadUsersData: action,
            usersData: computed,

            _filterRequest: observable,
            setFilterRequest: action,
            loadFilterRequest: action,
            filterRequest: computed,

            _filterRequestOld: observable,
            setFilterRequestOld: action,
            filterRequestOld: computed,

            _spinner: observable,
            spinner: computed,
        })
        this.client = $client;
        this.groupListData = $groupListData;
        this.groupListData.loadGroupData()
        // this.loadTeacherData()
    }

    get spinner() {
        return this._spinner;
    }

    get usersData() {
        return toJS(this._usersData);
    }

    setUsersData = (value) => {
        this._usersData = value
    }

    loadUsersData = (data = null) => {
        this.spinner.setSpinnerStatus(true)
        if (data) return this.client.get(`/apanel/user/list`, {params: data})
            .then(response => {
                this.setUsersData(response.data)
                this.spinner.setSpinnerStatus(false)
            })
        else return this.client.get('/apanel/user/list')
            .then(response => {
                this.setUsersData(response.data)
                this.spinner.setSpinnerStatus(false)
            })

    }

    get filterRequest() {
        return toJS(this._filterRequest);
    }

    setFilterRequest = (key, value) => {
        this._filterRequest[key] = value;
    }

    loadFilterRequest = () => {
        // let query = '?'
        const data = {}
        if (this.filterRequest['role'] !== 'Все роли') {
            data['role'] = this.filterRequest['role']
            if (this.filterRequestOld['role'] !== data['role']) {
                this.filterRequest['role'] = 1
            }
        }
        if (this.filterRequest['search'] !== '') {
            data['search'] = this.filterRequest['search']
            if (this.filterRequestOld['search'] !== data['search']) {
                this.filterRequest['search'] = 1
            }
        }
        if ((this.filterRequestOld['role'] !== data['role']) || (this.filterRequestOld['search'] !== data['search'])) {
            this.filterRequest['page'] = 1
        }

        if (this.filterRequest['page'] !== 1) {
            // query += `&page=${this.filterRequest['page']}`
            data['page'] = this.filterRequest['page']
        }

        // this.spinner.setSpinnerStatus(true)
        this.setFilterRequestOld(data)
        // return this.client.get(`/apanel/course/list`, {params: data})
        //     .then(response => {
        //         this.setUsersData(response.data)
        //         this.spinner.setSpinnerStatus(false)
        //     })

        this.loadUsersData(data)
    }

    get filterRequestOld() {
        return toJS(this._filterRequestOld);
    }

    setFilterRequestOld = (value) => {
        this._filterRequestOld = value;
    }
}
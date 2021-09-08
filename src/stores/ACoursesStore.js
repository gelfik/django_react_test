import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";


export default class ACoursesStore {
    _filterData = []
    _coursesData = []
    _filterRequest = {
        type: 'Все курсы',
        predmet: 'Все предметы',
        exam: 'Все экзамены',
        draft: undefined,
        page: 1
    }

    _filterRequestOld = {}

    _spinner = new SpinnerStore()

    _errorsAdd = undefined

    _courseAddData = {}

    constructor($client) {
        makeObservable(this, {
            _filterData: observable,
            setFilterData: action,
            loadFilterData: action,
            filterData: computed,

            _coursesData: observable,
            setCoursesData: action,
            loadCoursesData: action,
            coursesData: computed,

            _filterRequest: observable,
            setFilterRequest: action,
            loadFilterRequest: action,
            filterRequest: computed,

            _filterRequestOld: observable,
            setFilterRequestOld: action,
            filterRequestOld: computed,

            _spinner: observable,
            spinner: computed,

            _errorsAdd: observable,
            errorsAdd: computed,
            setErrorAdd: action,

            loadCourseAdd: action,

            _courseAddData: observable,
            courseAddData: computed,
            setCourseAddData: action,
        })
        this.client = $client;
        // this.loadTeacherData()
    }

    get spinner() {
        return this._spinner;
    }

    get filterData() {
        return toJS(this._filterData);
    }


    setFilterData = (value) => {
        this._filterData = value
    }

    loadFilterData = () => {
        return this.client.get('/apanel/courses/metadata/')
            .then(response => {
                this.setFilterData(response.data)
            })
    }

    get coursesData() {
        return toJS(this._coursesData);
    }

    setCoursesData = (value) => {
        this._coursesData = value
    }

    loadCoursesData = () => {
        return this.client.get('/apanel/courses/list/')
            .then(response => {
                this.setCoursesData(response.data)
            })
    }

    loadData = async () => {
        this.spinner.setSpinnerStatus(true)
        await this.loadFilterData()
        // await this.loadCoursesData()
        this.spinner.setSpinnerStatus(false)
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
        if (this.filterRequest['type'] !== 'Все курсы') {
            // query += `&type=${this.filterRequest['type']}`
            data['type'] = this.filterRequest['type']
            if (this.filterRequestOld['type'] !== data['type']) {
                this.filterRequest['page'] = 1
            }
        }
        if (this.filterRequest['predmet'] !== 'Все предметы') {
            // query += `&predmet=${this.filterRequest['predmet']}`
            data['predmet'] = this.filterRequest['predmet']
            if (this.filterRequestOld['predmet'] !== data['predmet']) {
                this.filterRequest['page'] = 1
            }
        }
        if (this.filterRequest['exam'] !== 'Все экзамены') {
            // query += `&exam=${this.filterRequest['exam']}`
            data['exam'] = this.filterRequest['exam']
            if (this.filterRequestOld['exam'] !== data['exam']) {
                this.filterRequest['page'] = 1
            }
        }
        if (this.filterRequest['draft'] !== undefined) {
            // query += `&type=${this.filterRequest['type']}`
            data['draft'] = this.filterRequest['draft']
            if (this.filterRequestOld['draft'] !== data['draft']) {
                this.filterRequest['page'] = 1
            }
        }
        if ((this.filterRequestOld['type'] !== data['type']) || (this.filterRequestOld['predmet'] !== data['predmet']) || (this.filterRequestOld['exam'] !== data['exam']) || (this.filterRequestOld['draft'] !== data['draft'])) {
            this.filterRequest['page'] = 1
        }

        // if (this.filterRequest['page'] !== 1) {
        //     // query += `&page=${this.filterRequest['page']}`
        //     data['page'] = this.filterRequest['page']
        // }
        this.spinner.setSpinnerStatus(true)
        this.setFilterRequestOld(data)
        return this.client.get(`/apanel/courses/list/`, {params: data})
            .then(response => {
                this.setCoursesData(response.data)
                this.spinner.setSpinnerStatus(false)
            })

        // return this.client.get(`/courses/list/${query}`)
        //     .then(response => {
        //         this.setCoursesData(response.data)
        //     })
    }

    get filterRequestOld() {
        return toJS(this._filterRequestOld);
    }

    setFilterRequestOld = (value) => {
        this._filterRequestOld = value;
    }


    get errorsAdd() {
        return toJS(this._errorsAdd);
    }

    setErrorAdd = (value) => {
        this._errorsAdd = value;
    }


    loadCourseAdd = (data) => {
        return this.client.post('/apanel/courses/add/', data).then((response) => {
            // console.log(response.data.status)
            this.setCourseAddData(response.data)
            this.setErrorAdd(undefined)
        }).catch(errors => {
            console.log(errors.response.data?.errors)
            if (errors.response.data?.errors) {
                this.setErrorAdd(errors.response.data?.errors)
            }
            if (errors.response.data?.detail) {
                this.setErrorAdd(errors.response.data?.detail)
            }
            // this.setErroAddrByKey(this.checkErrors(errors.response.data))
        })
    }

    get courseAddData() {
        return toJS(this._courseAddData);
    }

    setCourseAddData = (value) => {
        this._courseAddData = value;
    }
}
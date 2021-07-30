import {action, computed, makeObservable, observable, toJS} from "mobx";

export default class CoursesPageStore {
    _filterData = []
    _coursesData = []
    _filterRequest = {
        type: 'Все курсы',
        predmet: 'Все предметы',
        exam: 'Все экзамены',
        page: 1
    }

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
        })
        this.client = $client;
        // this.loadTeacherData()
    }

    get filterData() {
        return toJS(this._filterData);
    }


    setFilterData = (value) => {
        this._filterData = value
    }

    loadFilterData = () => {
        return this.client.get('/courses/filterdata/')
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
        return this.client.get('/courses/list/')
            .then(response => {
                this.setCoursesData(response.data)
            })
    }

    get filterRequest() {
        return toJS(this._filterRequest);
    }

    setFilterRequest = (key, value) => {
        this._filterRequest[key] = value;
    }

    loadFilterRequest = () => {
        let query = '?'
        if (this.filterRequest['type'] !== 'Все курсы') {
            query += `&type=${this.filterRequest['type']}`
        }
        if (this.filterRequest['predmet'] !== 'Все предметы') {
            query += `&predmet=${this.filterRequest['predmet']}`
        }
        if (this.filterRequest['exam'] !== 'Все экзамены') {
            query += `&exam=${this.filterRequest['exam']}`
        }
        if (this.filterRequest['page'] !== 1) {
            query += `&page=${this.filterRequest['page']}`
        }

        return this.client.get(`/courses/list/${query}`)
            .then(response => {
                this.setCoursesData(response.data)
            })
    }
}
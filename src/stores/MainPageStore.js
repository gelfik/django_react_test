import {action, computed, makeObservable, observable, toJS} from "mobx";

export default class MainPageStore {
    _teacherData = []
    constructor($client) {
        makeObservable(this, {
            _teacherData: observable,
            setTeacherData: action,
            loadTeacherData: action,
            teacherData: computed,
        })
        this.client = $client;
        // this.loadTeacherData()
    }

    get teacherData() {
        return toJS(this._teacherData);
    }

    loadTeacherData = () =>{
        return this.client.get('/main/teacherlist/')
            .then(response => {
                this.setTeacherData(response.data)
                console.log(this.teacherData)
            })
    }

    setTeacherData = (value) =>{
        this._teacherData = value
    }
}
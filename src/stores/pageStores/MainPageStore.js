import {action, computed, makeObservable, observable, toJS} from "mobx";

export default class MainPageStore {
    _teacherData = []
    _educationData = []
    constructor($client) {
        makeObservable(this, {
            _teacherData: observable,
            _educationData: observable,
            setTeacherData: action,
            setEducationData: action,
            loadTeacherData: action,
            loadEducationData: action,
            teacherData: computed,
            educationData: computed,
        })
        this.client = $client;
        // this.loadTeacherData()
    }

    get teacherData() {
        return toJS(this._teacherData);
    }

    get educationData() {
        return toJS(this._educationData);
    }

    setTeacherData = (value) =>{
        this._teacherData = value
    }

    setEducationData = (value) =>{
        this._educationData = value
    }

    loadTeacherData = () =>{
        return this.client.get('/main/teacherlist/')
            .then(response => {
                this.setTeacherData(response.data)
                // console.log(this.teacherData)
            })
    }

    loadEducationData = () =>{
        return this.client.get('/main/educationlist/')
            .then(response => {
                this.setEducationData(response.data)
            })
    }


}
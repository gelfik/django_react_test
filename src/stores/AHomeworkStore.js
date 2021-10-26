import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class AHomeworkStore {
    _spinner = new SpinnerStore()

    _homeworkAddType = undefined

    _addDetailData = undefined

    _abcSum = 0

    constructor($client) {
        makeObservable(this, {
            _homeworkAddType: observable,
            homeworkAddType: computed,
            setHomeworkAddType: action,

            _addDetailData: observable,
            addDetailData: computed,
            setAddDetailData: action,

            _abcSum: observable,
            abcSum: computed,
            setAbcSum: action,
        })

        this.client = $client;
    }

    get homeworkAddType() {
        return this._homeworkAddType
    }

    setHomeworkAddType = (value) =>{
        this._homeworkAddType = value
    }


    get addDetailData() {
        return toJS(this._addDetailData)
    }

    setAddDetailData = (value) =>{
        this._addDetailData = value
    }

    get abcSum() {
        return this._abcSum
    }

    setAbcSum = (value) =>{
        this._abcSum = value
    }

    loadHomeworkAddAdd = (data, courseID, subCourseID, lessonID) => {
        return this.client.post(`apanel/course${courseID}/sub${subCourseID}/lesson${lessonID}/homework/add`, data).then((response) => {
            this.setAddDetailData(response.data)
        }).catch(errors => {
            this.setAddDetailData({})
            if (errors.response.data?.errors) {
                this.setAddDetailData(errors.response.data?.errors)
            }
            if (errors.response.data?.detail) {
                this.setAddDetailData({error:errors.response.data?.detail})
            }
            if (errors.response.data?.error) {
                this.setAddDetailData({error:errors.response.data?.error})
            }
        })
    }

}
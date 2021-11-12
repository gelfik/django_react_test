import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class AHomeworkStore {
    _spinner = new SpinnerStore()

    _homeworkAddType = undefined

    _detailData = undefined

    _abcSum = 0

    _homeworkData = undefined

    constructor($client) {
        makeObservable(this, {
            _homeworkAddType: observable,
            homeworkAddType: computed,
            setHomeworkAddType: action,

            _detailData: observable,
            detailData: computed,
            setDetailData: action,

            _homeworkData: observable,
            homeworkData: computed,
            setHomeworkData: action,

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


    get detailData() {
        return toJS(this._detailData)
    }

    setDetailData = (value) =>{
        this._detailData = value
    }

    get abcSum() {
        return this._abcSum
    }

    setAbcSum = (value) =>{
        this._abcSum = value
    }

    loadHomeworkAddAdd = (data, courseID, subCourseID, lessonID) => {
        return this.client.post(`apanel/course${courseID}/sub${subCourseID}/lesson${lessonID}/homework/add`, data).then((response) => {
            this.setDetailData(response.data)
        }).catch(errors => {
            this.setDetailData({})
            if (errors.response.data?.errors) {
                this.setDetailData(errors.response.data?.errors)
            }
            if (errors.response.data?.detail) {
                this.setDetailData({error:errors.response.data?.detail})
            }
            if (errors.response.data?.error) {
                this.setDetailData({error:errors.response.data?.error})
            }
        })
    }

    get homeworkData(){
        return toJS(this._homeworkData)
    }

    setHomeworkData(list, id){
        this._homeworkData = list[id]
    }

    loadHomeworkEdit = (data, courseID, subCourseID, lessonID, askID) => {
        return this.client.post(`apanel/course${courseID}/sub${subCourseID}/lesson${lessonID}/homework/ask${askID}`, data).then((response) => {
            this.setDetailData(response.data)
        }).catch(errors => {
            this.setDetailData({})
            if (errors.response.data?.errors) {
                this.setDetailData(errors.response.data?.errors)
            }
            if (errors.response.data?.detail) {
                this.setDetailData({error:errors.response.data?.detail})
            }
            if (errors.response.data?.error) {
                this.setDetailData({error:errors.response.data?.error})
            }
        })
    }

    loadHomeworkDelete = (courseID, subCourseID, lessonID, askID) => {
        return this.client.delete(`apanel/course${courseID}/sub${subCourseID}/lesson${lessonID}/homework/ask${askID}`).then((response) => {
            // console.log(response.data.status)
            this.setDetailData(response.data)
        }).catch(errors => {
            this.setDetailData({})
            if (errors.response.data?.errors) {
                this.setDetailData(errors.response.data)
            }
        })
    }
}



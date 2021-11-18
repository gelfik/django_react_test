import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";


export default class ATestStore {
    _spinner = new SpinnerStore()
    _askActive = undefined
    _askType = undefined
    _response = {}
    _ask = undefined

    constructor($client) {
        makeObservable(this, {
            _spinner: observable,
            spinner: computed,

            _askActive: observable,
            askActive: computed,
            setAskActive: action,

            _askType: observable,
            askType: computed,
            setAskType: action,

            _response: observable,
            response: computed,
            setResponse: action,

            _ask: observable,
            ask: computed,
            setAsk: action,
        })
        this.client = $client;
    }


    get askActive() {
        return this._askActive;
    }

    setAskActive = (value) => {
        this._askActive = value
    }

    get spinner() {
        return this._spinner;
    }

    get askType() {
        return this._askType;
    }

    setAskType = (value) => {
        this._askType = value
    }

    get response() {
        return toJS(this._response);
    }

    setResponse = (value) => {
        this._response = value
    }
    
    loadAskAdd = (data, courseID, subCourseID, lessonID) => {
        return this.client.post(`apanel/course${courseID}/sub${subCourseID}/lesson${lessonID}/ask/add`, data).then((response) => {
            this.setResponse(response.data)
        }).catch(errors => {
            this.setResponse({})
            if (errors.response.data?.errors) {
                this.setResponse(errors.response.data?.errors)
            }
            if (errors.response.data?.detail) {
                this.setResponse({error:errors.response.data?.detail})
            }
            if (errors.response.data?.error) {
                this.setResponse({error:errors.response.data?.error})
            }
        })
    }

    get ask() {
        return toJS(this._ask);
    }

    setAsk(list){
        this._ask = list[this.askActive]
    }
    
    loadAskEdit = (data, courseID, subCourseID, lessonID, askID) => {
        return this.client.post(`apanel/course${courseID}/sub${subCourseID}/lesson${lessonID}/ask${askID}`, data).then((response) => {
            this.setResponse(response.data)
        }).catch(errors => {
            this.setResponse({})
            if (errors.response.data?.errors) {
                this.setResponse(errors.response.data?.errors)
            }
            if (errors.response.data?.detail) {
                this.setResponse({error:errors.response.data?.detail})
            }
            if (errors.response.data?.error) {
                this.setResponse({error:errors.response.data?.error})
            }
        })
    }

    loadAskDelete = (courseID, subCourseID, lessonID, askID) => {
        return this.client.delete(`apanel/course${courseID}/sub${subCourseID}/lesson${lessonID}/ask${askID}`).then((response) => {
            // console.log(response.data.status)
            this.setResponse(response.data)
        }).catch(errors => {
            this.setResponse({})
            if (errors.response.data?.errors) {
                this.setResponse(errors.response.data)
            }
        })
    }

}
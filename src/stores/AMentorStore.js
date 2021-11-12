import {action, computed, makeObservable, observable, toJS} from "mobx";


export default class AMentorStore {
    _mentorsList = []

    _mentorID = undefined

    constructor($client) {
        makeObservable(this, {
            _mentorsList: observable,
            mentorsList: computed,
            setMentorsList: action,
            loadMentorsList: action,

            _mentorID: observable,
            mentorID: computed,
            setMentorID:action,
        })
        this.client = $client;
    }

    get loadError() {
        return this._loadError;
    }

    setLoadError(value) {
        this._loadError = value
    }

    get mentorsList() {
        return toJS(this._mentorsList);
    }

    setMentorsList = (value) => {
        this._mentorsList = value;
    }

    loadMentorsList = () => {
        return this.client.get(`/apanel/course/mentorList`)
            .then(response => {
                this.setMentorsList(response.data)
            }).catch(reason => {
                this.setMentorsList([])
            })
    }

    get mentorID() {
        return this._mentorID;
    }

    setMentorID = (value) => {
        this._mentorID = value
    }


}
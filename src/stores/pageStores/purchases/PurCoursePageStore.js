import {action, computed, makeObservable, observable} from "mobx";
import SpinnerStore from "../../SpinnerStore";


export default class PurCoursePageStore {
    _spinner = new SpinnerStore()
    _activeSub = undefined
    _activeLesson = undefined

    constructor($client) {
        makeObservable(this, {
            _spinner: observable,
            spinner: computed,

            _activeSub: observable,
            activeSub: computed,
            setActiveSub: action,

            _activeLesson: observable,
            activeLesson: computed,
            setActiveLesson: action,
        })
        this.client = $client;
    }

    get activeLesson() {
        return this._activeLesson;
    }

    setActiveLesson = (value) => {
        console.log(this._activeLesson)
        this._activeLesson = value
    }

    get activeSub() {
        return this._activeSub;
    }

    setActiveSub = (value) => {
        this._activeSub = value
    }

    get spinner() {
        return this._spinner;
    }

}
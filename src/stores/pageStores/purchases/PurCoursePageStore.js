import {action, computed, makeObservable, observable} from "mobx";
import SpinnerStore from "../../SpinnerStore";


export default class PurCoursePageStore {
    _spinner = new SpinnerStore()
    _activeSub = undefined
    _activeLesson = undefined
    _askActive = undefined
    _askCount = undefined
    _askAnswerCount = undefined


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

            _askActive: observable,
            askActive: computed,
            setAskActive: action,

            _askCount: observable,
            askCount: computed,
            setAskCount: action,

            _askAnswerCount: observable,
            askAnswerCount: computed,
            setAskAnswerCount: action,
        })
        this.client = $client;
    }

    get askAnswerCount() {
        return this._askAnswerCount;
    }

    setAskAnswerCount = (value) => {
        this._askAnswerCount = value
    }

    get askCount() {
        return this._askCount;
    }

    setAskCount = (value) => {
        this._askCount = value
    }

    get askActive() {
        return this._askActive;
    }

    setAskActive = (value) => {
        this._askActive = value
    }

    get activeLesson() {
        return this._activeLesson;
    }

    setActiveLesson = (value) => {
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
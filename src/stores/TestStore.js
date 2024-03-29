import {action, computed, makeObservable, observable, toJS} from "mobx";
import SpinnerStore from "./SpinnerStore";


export default class ATestStore {
    _spinner = new SpinnerStore()
    _askActive = undefined
    _askType = undefined
    _response = {}
    _ask = undefined
    _askCount = undefined
    _askAnswerCount = undefined

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

            _askCount: observable,
            askCount: computed,
            setAskCount: action,

            _askAnswerCount: observable,
            askAnswerCount: computed,
            setAskAnswerCount: action,
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

    get ask() {
        return toJS(this._ask);
    }

    setAsk(list){
        this._ask = list[this.askActive]
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

}
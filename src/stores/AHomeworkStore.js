import {action, computed, makeObservable, observable} from "mobx";
import SpinnerStore from "./SpinnerStore";

export default class AHomeworkStore {
    _spinner = new SpinnerStore()

    _homeworkAddType = undefined

    _errorsAdd = undefined

    _errorsEdit = undefined

    _abcSum = 0



    constructor($client) {
        makeObservable(this, {
            _homeworkAddType: observable,
            homeworkAddType: computed,
            setHomeworkAddType: action,

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

    get abcSum() {
        return this._abcSum
    }

    setAbcSum = (value) =>{
        this._abcSum = value
    }

}
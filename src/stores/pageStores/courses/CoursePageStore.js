import {computed, makeObservable, observable} from "mobx";
import SpinnerStore from "../../SpinnerStore";

export default class CoursePageStore {
    _spinner = new SpinnerStore()

    constructor($client, $buyCourseSore) {
        makeObservable(this, {
            _spinner: observable,
            spinner: computed,
        })
        this.buyCourseStore = $buyCourseSore;
        this.client = $client;
        // this.loadTeacherData()
    }

    buyFreeData = (courseID) => {
        const data = {}
        data.courseID=courseID
        return this.buyCourseStore.loadBuyData(data)
    }

    get spinner() {
        return this._spinner;
    }
}
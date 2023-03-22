import {action, computed, makeObservable, observable, toJS} from "mobx";

export default class AGroupListStore {
    _groupData = []

    constructor($client) {
        makeObservable(this, {
            _groupData: observable,
            groupData: computed,
            setGroupData: action,
            loadGroupData: action,
        })
        this.client = $client;
        // this.loadTeacherData()
    }

    get groupData() {
        return toJS(this._groupData);
    }

    setGroupData = (value) => {
        this._groupData = value
    }

    loadGroupData = () => {
        this.client.get(`/apanel/user/groupList`)
            .then(response => {
                this.setGroupData(response.data)
            })
    }
}
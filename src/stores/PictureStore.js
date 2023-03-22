import {makeAutoObservable} from "mobx";

export default class PictureStore {

    constructor($client) {
        makeAutoObservable(this, {})

        this.client = $client;
    }

    loadImage = (data) => {
        return this.client.put('/users/setAvatar', data).then((response) => {
            return response
        })
    }
}
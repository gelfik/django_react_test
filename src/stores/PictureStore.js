import {makeAutoObservable} from "mobx";

export default class PictureStore {

    constructor($client) {
        makeAutoObservable(this, {})

        this.client = $client;
    }

    loadImage = (data) => {
        return this.client.put('/file/load/', data).then((response) => {
            return response
        })
    }
}
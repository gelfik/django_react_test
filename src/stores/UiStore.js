import {action, computed, makeObservable, observable, runInAction} from "mobx";

export default class UiStore {
    _deviceType = 'desktop'
    _windowDimensions = {
        width: 1920,
        height: 1080
    }

    constructor() {
        makeObservable(this, {
            _deviceType: observable,
            _windowDimensions: observable,
            setDeviceType: action,
            updateWindowDimensions: action,
            setWindowDimensions: action,
            windowDimensions: computed,
            deviceType: computed,
        })
        if (typeof window !== "undefined") {
            this.setWindowDimensions(window)
            window.onresize = (event) => {
                this.setWindowDimensions(event.currentTarget)
            }
        }
    }

    get windowDimensions() {
        return this._windowDimensions;
    }

    get deviceType() {
        if (this.windowDimensions.width >= 769)
            this.setDeviceType('desktop');
        if (this.windowDimensions.width >= 0 && this.windowDimensions.width < 769)
            this.setDeviceType('mobile');

        // if (this.windowDimensions.width >= 1201)
        //     this.setDeviceType('desktop');
        // if (this.windowDimensions.width >= 992 && this.windowDimensions.width < 1200)
        //     this.setDeviceType('laptop');
        // if (this.windowDimensions.width >= 769 && this.windowDimensions.width < 992)
        //     this.setDeviceType('tablet');
        // if (this.windowDimensions.width >= 320 && this.windowDimensions.width < 769)
        //     this.setDeviceType('mobile');
        // if (this.windowDimensions.width >= 0 && this.windowDimensions.width < 320)
        //     this.setDeviceType('beforeMobile');
        return this._deviceType;
    }

    updateWindowDimensions = () => {
        this._windowDimensions = {
            width: window.innerWidth,
            height: window.innerHeight,
        }
    }

    setWindowDimensions = (window) => {
        runInAction(() => {
            this._windowDimensions = {
                width: window.innerWidth,
                height: window.innerHeight
            }
        })
    }

    setDeviceType = (value) => {
        this._deviceType = value
    }
}
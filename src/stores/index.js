import UserStore from "./UserStore";
import SpinnerStore from "./SpinnerStore";

class RootStore {
    constructor(initialState = null) {
        this.userStore = new UserStore();
        this.spinnerStore = new SpinnerStore();
    }
}

export default RootStore;
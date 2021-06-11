import UserStore from "./UserStore";

class RootStore {
    constructor(initialState = null) {
        this.userStore = new UserStore();
    }
}

export default RootStore;
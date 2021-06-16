import UserStore from "./UserStore";
import SpinnerStore from "./SpinnerStore";
import TokenStore from "./TokenStore";
import initAxios from "../utils/AxiosService";
import PictureStore from "./PictureStore";


class RootStore {
    constructor(initialState = null) {
        this.tokenStore = new TokenStore(initialState?.tokenStore);
        this.$axios = initAxios(this.tokenStore);
        this.userStore = new UserStore(this.tokenStore, this.$axios);
        this.spinnerStore = new SpinnerStore();
        this.pictureStore = new PictureStore(this.$axios)
    }
}

export default RootStore;
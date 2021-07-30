import React from 'react'
import {observer, Provider} from "mobx-react";
import RootStore from "../../stores"
import PageService from "../../utils/PageService";
import 'react-multi-carousel/lib/styles.css';

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

const App = observer(() => {
    const rootStore = new RootStore()

    return (
        <Provider {...rootStore}>
            <PageService/>
        </Provider>
    );
})

export default App;
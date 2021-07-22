import React from 'react'
import {observer, Provider} from "mobx-react";
import RootStore from "../../stores"
import PageService from "../../utils/PageService";

const App = observer(() => {
    const rootStore = new RootStore()
    return (
        <Provider {...rootStore}>
            <PageService/>
        </Provider>
    );
})

export default App;
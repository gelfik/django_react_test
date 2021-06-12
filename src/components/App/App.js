import React from 'react'
import {observer, Provider} from "mobx-react";
import RootStore from "../../stores"
import PageService from "../../utils/PageService";

const App = observer(() => {
    const rootStore = new RootStore()
    // const CookieServices = new CookieService();
    // CookieServices.setCookie('Authorization', 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2RhdGEiOnsiaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJjcmVhdGVkX2RhdGUiOiIyMDIxLTA2LTA4IDIwOjE5OjExIn0sImV4cCI6MTYyODM2NzU1MSwiaWF0IjoxNjIzMTgzNTUxfQ.b6yn08vAKmfZqHHNX_sYRXDbCB86wHlE6Ad1ujuqiQk');
    return (
        <Provider {...rootStore}>
            <PageService/>
        </Provider>
    );
})

export default App;
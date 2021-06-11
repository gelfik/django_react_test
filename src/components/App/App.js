import React from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {observer, Provider} from "mobx-react";
import RootStore from "../../stores"
import MainPage from "../../pages/main-page";
import LoginPage from "../../pages/login-page";
import RegisterPage from "../../pages/register-page";
import Page404 from "../../pages/404-page";
import UserPage from "../../pages/user-page";
import Header from "../Header";
import LogoutPage from "../../pages/logout-page";

const App = observer(() => {
    const rootStore = new RootStore();

    // const CookieServices = new CookieService();
    // CookieServices.setCookie('Authorization', 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2RhdGEiOnsiaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJjcmVhdGVkX2RhdGUiOiIyMDIxLTA2LTA4IDIwOjE5OjExIn0sImV4cCI6MTYyODM2NzU1MSwiaWF0IjoxNjIzMTgzNTUxfQ.b6yn08vAKmfZqHHNX_sYRXDbCB86wHlE6Ad1ujuqiQk');
    return (
        <Provider {...rootStore}>
            <Router>
                <Header/>

                <Switch>
                    <Route path='/' component={MainPage} exact/>
                    <Route path='/user' component={UserPage} exact/>
                    <Route path='/login' component={LoginPage} exact/>
                    <Route path='/logout' component={LogoutPage} exact/>
                    <Route path='/register' component={RegisterPage} exact/>
                    <Route component={Page404}/>
                </Switch>

            </Router>
        </Provider>
    );
})

export default App;
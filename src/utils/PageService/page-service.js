import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MainPage from "../../pages/main-page";
import LoginPage from "../../pages/login-page";
import RegisterPage from "../../pages/register-page";
import Page404 from "../../pages/404-page";

const PageService = () => {
    return (
        <>
            <Route path='/' component={MainPage} exact/>
            <Route path='/login' component={LoginPage} exact/>
            <Route path='/register' component={RegisterPage} exact/>
            <Route component={Page404}/>
        </>
    )
}

export default PageService;
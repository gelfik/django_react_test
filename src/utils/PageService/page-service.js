import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import MainPage from "../../pages/main-page";
import LoginPage from "../../pages/login-page";
import RegisterPage from "../../pages/register-page";
import Page404 from "../../pages/404-page";
import UserPage from "../../pages/user-page";
import LogoutPage from "../../pages/logout-page";
import {inject, observer} from "mobx-react";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import LoadImagePage from "../../pages/load-image-page";
import Footer from "../../components/Footer";

const PageService = inject('userStore')(observer((props) => {
    if (props.userStore.firstSpinnerStore.spinerStatus) {
        return <Spinner/>
    }

    return (
        <Router>
            <Header/>
            <Switch>
                <Route path='/' component={MainPage} exact/>
                <Route path='/test' component={LoadImagePage} exact/>
                <Route path='/user' render={() => !props.userStore.userAuthStatus ? <Redirect to='/login'/> : <UserPage/>}/>
                <Route path='/logout' render={() => !props.userStore.userAuthStatus ? <Redirect to='/'/> : <LogoutPage/>} exact/>
                <Route path='/login' render={() => props.userStore.userAuthStatus ? <Redirect to='/'/> : <LoginPage/>} exact/>
                <Route path='/register' render={() => props.userStore.userAuthStatus ? <Redirect to='/'/> : <RegisterPage/>} exact/>
                <Route component={Page404}/>
            </Switch>
            <Footer/>
        </Router>
    )
}))

export default PageService;
import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import {inject, observer} from "mobx-react";
import MainPage from "../../pages/mainPage";
// import LoginPage from "../../pages/login-page";
// import RegisterPage from "../../pages/register-page";
import Page404 from "../../pages/404-page";
import UserPage from "../../pages/user-page";
import LogoutPage from "../../pages/logout-page";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";
import RootModal from "../../components/Modals";
import CoursesPage from "../../pages/coursesPage";

const PageService = inject('userStore')(observer((props) => {
        if (props.userStore.firstSpinnerStore.spinerStatus) {
            return <Spinner/>
        }
        return (
            <Router>
                <Header/>
                <main className={'pt-5'}>
                    <Switch>
                        <Route path='/' component={MainPage} exact/>
                        <Route path='/courses' component={CoursesPage} exact/>
                        <Route path='/user'
                               render={() => !props.userStore.userAuthStatus ? <Redirect to='/'/> : <UserPage/>}/>
                        <Route path='/logout'
                               render={() => !props.userStore.userAuthStatus ? <Redirect to='/'/> : <LogoutPage/>}
                               exact/>
                        {/*<Route path='/login'*/}
                        {/*       render={() => props.userStore.userAuthStatus ? <Redirect to='/'/> : <LoginPage/>} exact/>*/}
                        {/*<Route path='/register'*/}
                        {/*       render={() => props.userStore.userAuthStatus ? <Redirect to='/'/> : <RegisterPage/>}*/}
                        {/*       exact/>*/}
                        <Route component={Page404}/>
                    </Switch>
                </main>
                <Footer/>
                <RootModal/>
            </Router>
        )
    }
))

export default PageService;
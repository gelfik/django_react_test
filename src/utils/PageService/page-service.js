import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import MainPage from "../../pages/mainPage";
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
import NewPageTest from "../../pages/new-page-test";
import RootModal from "../../components/Modals";

const PageService = inject('userStore')(observer((props) => {
        if (props.userStore.firstSpinnerStore.spinerStatus) {
            return <Spinner/>
        }

        return (
            <Router>
                <Header/>
                <main>
                    <div className="container">
                        <Switch>
                            <Route path='/' component={MainPage} exact/>
                            <Route path='/test' component={LoadImagePage} exact/>
                            <Route path='/test1' component={NewPageTest} exact/>
                            <Route path='/user'
                                   render={() => !props.userStore.userAuthStatus ? <Redirect to='/login'/> : <UserPage/>}/>
                            <Route path='/logout'
                                   render={() => !props.userStore.userAuthStatus ? <Redirect to='/'/> : <LogoutPage/>}
                                   exact/>
                            <Route path='/login'
                                   render={() => props.userStore.userAuthStatus ? <Redirect to='/'/> : <LoginPage/>} exact/>
                            <Route path='/register'
                                   render={() => props.userStore.userAuthStatus ? <Redirect to='/'/> : <RegisterPage/>}
                                   exact/>
                            <Route component={Page404}/>
                        </Switch>
                    </div>
                </main>
                <Footer/>
                <RootModal/>
            </Router>
        )
    }
))

export default PageService;
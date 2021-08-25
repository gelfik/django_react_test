import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {inject, observer} from "mobx-react";
import MainPage from "../../pages";
// import LoginPage from "../../pages/login-page";
// import RegisterPage from "../../pages/register-page";
import Page404 from "../../pages/404";
import UserPage from "../../pages/User";
import LogoutPage from "../../pages/Logout";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";
import RootModal from "../../components/Modals";
import CoursesPage from "../../pages/Courses";
import CoursesCoursePage from "../../pages/Courses/Course";
import CoursesCoursePurchasePage from "../../pages/Courses/Course/Purchase";
import SVG from "../../components/SVG";
import PurchasesPage from "../../pages/Purchases";
import PurchasesCoursePage from "../../pages/Purchases/Course";

const PageService = inject('userStore')(observer((store) => {
        const {userStore} = store
        if (userStore.firstSpinnerStore.spinnerStatus) {
            return <Spinner/>
        }
        return (
            <Router>
                <Header/>
                <Switch>
                    <Route path='/' component={MainPage} exact/>

                    <Route path='/purchases' exact render={() => !userStore.userAuthStatus ? <Redirect to='/'/> : <PurchasesPage/>}/>
                    <Route path='/purchases/:purchaseID' render={() => !userStore.userAuthStatus ? <Redirect to='/'/> : <PurchasesCoursePage/>}/>

                    <Route path='/courses' component={CoursesPage} exact/>
                    <Route path='/courses/:courseID/purchase' render={() => !userStore.userAuthStatus ? <Redirect to='/'/> : <CoursesCoursePurchasePage/>}/>
                    <Route path='/courses/:courseID' component={CoursesCoursePage}/>

                    <Route path='/user'
                           render={() => !userStore.userAuthStatus ? <Redirect to='/'/> : <UserPage/>}/>
                    <Route path='/logout'
                           render={() => !userStore.userAuthStatus ? <Redirect to='/'/> : <LogoutPage/>}
                           exact/>
                    {/*<Route path='/login'*/}
                    {/*       render={() => props.userStore.userAuthStatus ? <Redirect to='/'/> : <LoginPage/>} exact/>*/}
                    {/*<Route path='/register'*/}
                    {/*       render={() => props.userStore.userAuthStatus ? <Redirect to='/'/> : <RegisterPage/>}*/}
                    {/*       exact/>*/}
                    <Route component={Page404}/>
                </Switch>
                <Footer/>
                <SVG/>
                <RootModal/>
            </Router>
        )
    }
))

export default PageService;
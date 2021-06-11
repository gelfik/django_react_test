import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";

const Header = inject('userStore')(observer((props) => {
    useEffect(() => {
        if (!props.userStore.userAuthStatus) {
            props.userStore.getUserData().then((req) => {
                if (req.username) {
                    props.userStore.setUserAuthStatus(true)
                    props.userStore.setUserData(req)
                }
            })
        }
    }, [ ])

    console.log(props.userStore.userAuthStatus)
    console.log(props.userStore.userData)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">MainPage</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            </button>
            <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/user">User Info</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}))

export default Header;
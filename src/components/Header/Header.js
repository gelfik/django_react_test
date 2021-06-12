import React from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";

const Header = inject('userStore')(observer((props) => {
    const loginMenu = () => {
        return (<>
            <li className="nav-item active">
                <Link className="nav-link" to="/user">User Info</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/logout">Logout</Link>
            </li>
        </>)
    }

    const guestMenu = () => {
        return (<>
            <li className="nav-item active">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
        </>)
    }

    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">MainPage</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        </button>
        <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNav">
            <ul className="navbar-nav">
                {props.userStore.userAuthStatus ? loginMenu() : guestMenu()}
                {/*{!props.userStore.userAuthStatus && guestMenu()}*/}
            </ul>
        </div>
    </nav>)
}))

export default Header;
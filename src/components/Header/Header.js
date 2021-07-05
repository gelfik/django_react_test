import React from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";

const Header = inject('userStore')(observer((props) => {
    const loginMenu = () => {
        return (<>
            <li className="nav-item active">
                <Link className="nav-link" to="/user">Профиль</Link>
            </li>
            <li className="nav-item active">
                <Link className="nav-link" to="/logout">Выйти</Link>
            </li>
        </>)
    }

    const guestMenu = () => {
        return (<>
            <li className="nav-item active">
                <Link className="nav-link" to="/login">Войти</Link>
            </li>
            {/*<li className="nav-item active">*/}
            {/*    <Link className="nav-link" to="/register">Регистрация</Link>*/}
            {/*</li>*/}
        </>)
    }

    return (<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">IZZIBRAIN</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            </button>
            <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNav">
                <ul className="navbar-nav">
                    {props.userStore.userAuthStatus ? loginMenu() : guestMenu()}
                    {/*{!props.userStore.userAuthStatus && guestMenu()}*/}
                </ul>
            </div>
        </div>
    </nav>)
}))

export default Header;
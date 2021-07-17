import React, {useState} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";

const Header = inject('userStore')(observer((props) => {
    const [isOpen, setIsOpen] = useState(false)
    const loginMenu = () => {
        const toggleOpen = () => {
            setIsOpen(!isOpen)
        }
        if (props.userStore.userData.avatar) {
            return (<li className="nav-item dropdown" onClick={toggleOpen}>
                <button className="btn btn-dark dropdown-toggle" type="button" id="navbarDropdownMenuLink"
                        data-bs-toggle="dropdown" aria-expanded="false">
                    {props.userStore.userData.firstName} <img src={props.userStore.userData.avatar.small}
                                                             alt={props.userStore.userData.lastName} width="32"
                                                             height="32"
                                                             className="rounded-circle"></img>
                </button>
                <ul className={`dropdown-menu dropdown-menu-right dropdown-menu-dark ${isOpen ? " show" : ""}`}
                    aria-labelledby="navbarDropdownMenuLink">
                    <li><Link className="dropdown-item" to="/user">Профиль</Link></li>
                    <li>
                        <hr className="dropdown-divider"/>
                    </li>
                    <li><Link className="dropdown-item" to="/logout">Выйти</Link></li>
                </ul>
            </li>)
        } else {
            return (<Link className="nav-link" to="/user">Профиль</Link>)
        }
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

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">IZZIBRAIN</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNav">
                        <ul className="navbar-nav">
                            {props.userStore.userAuthStatus ? loginMenu() : guestMenu()}
                            {/*{!props.userStore.userAuthStatus && guestMenu()}*/}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}))

export default Header;
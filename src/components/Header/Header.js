import React, {useState} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";

import {Navbar, Nav, Container,  NavDropdown} from "react-bootstrap";

const Header = inject('userStore', 'modalStore')(observer((stores) => {
    const {userStore, modalStore} = stores
    const [isOpen, setIsOpen] = useState(false)
    const loginMenu = () => {
        const toggleOpen = () => {
            setIsOpen(!isOpen)
        }
        if (userStore.userData.avatar) {
            return (<li className="nav-item dropdown" onClick={toggleOpen}>
                <button className="btn btn-dark dropdown-toggle" type="button" id="navbarDropdownMenuLink"
                        data-bs-toggle="dropdown" aria-expanded="false">
                    {userStore.userData.firstName} <img src={userStore.userData.avatar.small}
                                                        alt={userStore.userData.lastName} width="32"
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
                {/*<Link className="nav-link" to="/login">Войти</Link>*/}
                {/*<button type="button" className="btn btn-primary" data-bs-toggle="modal"*/}
                {/*        data-bs-target="#ModalLogin">*/}
                {/*    Launch static backdrop modal*/}
                {/*</button>*/}
                <a className="nav-link" onClick={modalStore.LoginModalShow}>
                    Войти
                </a>
            </li>
            {/*<li className="nav-item active">*/}
            {/*    <Link className="nav-link" to="/register">Регистрация</Link>*/}
            {/*</li>*/}
        </>)
    }

    return (
        <header>


            <Navbar variant="dark" bg="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">IZZIBRAIN</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbar-dark-example"/>
                    <Navbar.Collapse id="navbar-dark-example">
                        <Nav>
                            <NavDropdown
                                id="nav-dropdown-dark-example"
                                title="Dropdown"
                                menuVariant="dark"
                            >
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">IZZIBRAIN</Link>
                    {/*<button className="navbar-toggler" type="button" data-bs-toggle="collapse"*/}
                    {/*        data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown"*/}
                    {/*        aria-expanded="false" aria-label="Toggle navigation">*/}
                    {/*    <span className="navbar-toggler-icon"></span>*/}
                    {/*</button>*/}
                    <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNav">
                        <ul className="navbar-nav">
                            {userStore.userAuthStatus ? loginMenu() : guestMenu()}
                            {/*{!userStore.userAuthStatus && guestMenu()}*/}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}))

export default Header;
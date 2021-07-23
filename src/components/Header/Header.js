import React, {useState} from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";

import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";

const Header = inject('userStore', 'modalStore')(observer((stores) => {
    const {userStore, modalStore} = stores

    const loginMenu = () => {
        if (userStore.userData.avatar) {
            const nameAvata = () => {
                return (<>
                    {userStore.userData.firstName} <img src={userStore.userData.avatar.small}
                                                        alt={userStore.userData.lastName} width="32"
                                                        height="32"
                                                        className="rounded-circle"/>
                </>)
            }
            return (<NavDropdown
                id="nav-dropdown-user"
                title={nameAvata()}
                menuVariant="dark"
                align={'end'}
                autoClose={true}
                navbar={true}
                // drop={'end'}
            >
                <NavDropdown.Item as={Link} to="/user">Профиль</NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item as={Link} to="/logout">Выйти</NavDropdown.Item>
            </NavDropdown>)
        } else {
            return (<Nav.Link as={Link} to={'/user'} onClick={modalStore.LoginModalShow}>Профиль</Nav.Link>)
        }
    }


    const guestMenu = () => {
        return (<Nav.Link  onClick={modalStore.LoginModalShow}>Войти</Nav.Link>)
    }

    return (
        <header>
            {/*<Navbar variant="dark" bg="dark" expand="lg" expanded={false}>*/}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Container>
                    <Navbar.Brand as={Link} to={'/'}>IZZIBRAIN</Navbar.Brand>
                    {/*<Navbar.Toggle aria-controls="navbar"/>*/}
                    <Navbar.Collapse bsPrefix={'d-flex flex-row-reverse'} id="navbar">
                        <Nav className={'navbar-nav'}>
                            {userStore.userAuthStatus ? loginMenu() : guestMenu()}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            {/*</Navbar>*/}
            </nav>

            {/*<nav className="navbar navbar-expand-lg navbar-dark bg-dark">*/}
            {/*    <div className="container">*/}
            {/*        /!*<Link className="navbar-brand" to="/">IZZIBRAIN</Link>*!/*/}
            {/*        <Navbar.Brand as={Link} to={'/'}>IZZIBRAIN</Navbar.Brand>*/}
            {/*        <div className="collapse d-flex flex-row-reverse" id="navbarNav">*/}
            {/*            <div className="navbar-nav">*/}
            {/*                {userStore.userAuthStatus ? loginMenu() : guestMenu()}*/}
            {/*                /!*{!userStore.userAuthStatus && guestMenu()}*!/*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</nav>*/}
        </header>
    )
}))

export default Header;
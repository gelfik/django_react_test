import React from "react";
import {Link, withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";

import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";

const Header = inject('userStore', 'modalStore')(observer((stores) => {
    const {userStore, modalStore} = stores
    const loginMenu = () => {
        if (userStore.userData.avatar) {
            const nameAvatar = () => {
                return (<div className={'align-items-center'}>
                    {userStore.userData.firstName} <img src={userStore.userData.avatar.small}
                                                        alt={userStore.userData.lastName} width="32"
                                                        height="32"
                                                        className="rounded-circle ms-1"/>
                </div>)
            }
            return (<NavDropdown
                // bsPrefix={'align-items-center d-flex'}
                id="nav-dropdown-user"
                // title={nameAvatar()}
                menuVariant="light"
                align={'end'}
                autoClose={true}
                navbar={true}
                // bsPrefix={'text-dark dropdown-toggle nav-link'}
                // drop={'end'}
            >
                <NavDropdown.Toggle variant="success" id="nav-dropdown-user">
                    {nameAvatar()}
                </NavDropdown.Toggle>
                <NavDropdown.Item as={Link} className={'text-dark'} to="/user">Профиль</NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item as={Link} className={'text-dark'} to="/logout">Выйти</NavDropdown.Item>
            </NavDropdown>)
        } else {
            return (<Nav.Link as={Link} to={'/user'} onClick={modalStore.LoginModalShow}>Профиль</Nav.Link>)
        }
    }


    const guestMenu = () => {
        return (<Nav.Link onClick={modalStore.LoginModalShow}>Войти</Nav.Link>)
    }

    const getHeaderType = () => {
        if (stores.location.pathname === '/') return 'dark'
        else return 'light'
    }

    const headerType = getHeaderType()


    return (
        <header>
            {/*<Navbar variant="dark" bg="dark" expand="lg" fixed="top" expanded={false}>*/}
            <nav className={`navbar navbar-expand-lg navbar-${headerType} bg-${headerType} p-0 `}>
                <div className={'container__wrapper'}>
                    <Navbar.Brand as={Link} to={'/'}>IZZIBRAIN</Navbar.Brand>
                    {/*<Navbar.Toggle aria-controls="my_navbar"/>*/}
                    <Navbar.Collapse bsPrefix={'d-flex flex-row-reverse'} id="my_navbar">
                        <Nav className={'navbar-nav align-items-center'}>
                            <Nav.Link as={Link} to={'courses'}>Курсы</Nav.Link>
                            {userStore.userAuthStatus ? loginMenu() : guestMenu()}
                        </Nav>
                    </Navbar.Collapse>
                </div>
                {/*</Navbar>*/}
            </nav>

            {/*<Navbar variant="dark" bg="dark" expand="lg" expanded={true} className={'p-0'}>*/}
            {/*    <Container>*/}
            {/*        <Navbar.Brand as={Link} to={'/'}>IZZIBRAIN</Navbar.Brand>*/}
            {/*        /!*<Navbar.Toggle aria-controls="my_navbar"/>*!/*/}
            {/*        <Navbar.Collapse bsPrefix={'justify-content-end'} id="my_navbar">*/}
            {/*            <Navbar.Text>*/}
            {/*                <div className="row p-0 my-auto">*/}
            {/*                    <div className="col p-0 my-auto">*/}
            {/*                    <Nav.Link as={Link} to={'courses'}>Курсы</Nav.Link>*/}
            {/*                    </div>*/}
            {/*                    <div className="col p-0 my-auto">*/}
            {/*                    {userStore.userAuthStatus ? loginMenu() : guestMenu()}*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </Navbar.Text>*/}
            {/*        </Navbar.Collapse>*/}
            {/*    </Container>*/}
            {/*</Navbar>*/}

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


export default withRouter(Header);
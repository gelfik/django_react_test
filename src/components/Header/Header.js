import React, {useState} from "react";
import {Link, withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";

import {Container, Dropdown, Nav, Navbar} from "react-bootstrap";

const MobileUserIcon = inject("userStore")(
    observer((stores) => {
        const {userStore} = stores;
        return (
            <div className={"MobileUserIcon"}>
                <div className={"MobileUserIcon_Image"}>
                    <img
                        src={userStore.userData.avatar.small}
                        alt={userStore.userData.lastName}
                        width="52"
                        height="52"
                        className="rounded-circle ms-1"
                    />
                </div>
                <div className={"MobileUserIcon_Data"}>
          <span className={"MobileUserIcon_Data_Name"}>
            {userStore.userData.firstName} {userStore.userData.lastName}
          </span>
                    <span className={"MobileUserIcon_Data_Profile"}>Личный профиль</span>
                </div>
            </div>
        );
    })
);

const DesktopUserIcon = inject("userStore")(
    observer((stores) => {
        const {userStore} = stores;
        return (
            <div className={"DesktopUserIcon"}>
                <div className={"DesktopUserIcon_Image"}>
                    <img
                        src={userStore.userData.avatar.small}
                        alt={userStore.userData.lastName}
                        width="34"
                        height="34"
                        className="rounded-circle me-1"
                    />
                </div>
                <div className={"DesktopUserIcon_Data"}>
          <span className={"DesktopUserIcon_Data_Name"}>
            {userStore.userData.firstName} {userStore.userData.lastName}
          </span>
                    <span className={"DesktopUserIcon_Data_Profile"}>Личный профиль</span>
                </div>
            </div>
        );
    })
);

const Header = inject("userStore", "modalStore")(observer((stores) => {
    const {userStore, modalStore} = stores;
    const [expanded, setExpanded] = useState(false);

    const getHeaderType = () => {
        if (stores.location.pathname === "/") return "dark";
        else return "light";
    };

    const headerType = getHeaderType();

    return (
        <Navbar fixed={"top"} variant={headerType} bg={headerType} expand="lg" expanded={expanded}>
            <Container className={"container__wrapper"}>
                <Navbar.Brand as={Link} to="/" className={'LogoFonts'}>
                    IZZIBRAIN
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={() => {
                        setExpanded(!expanded);
                    }}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav
                        className="Custom-nav-bar"
                        onClick={() => {
                            setExpanded(false);
                        }}
                    >
                        {/*<Nav.Link as={Link} to={"/"}>*/}
                        {/*    Главная*/}
                        {/*</Nav.Link>*/}
                        <Nav.Link as={Link} to={"/courses"}>
                            Все курсы
                        </Nav.Link>
                        <div className={"Custom-nav-bar-items"}>
                            {userStore.userAuthStatus &&
                            <div className={"Custom-nav-bar-items-login-mobile"}>
                                <Nav.Link as={Link} to={"/user"}>
                                    <MobileUserIcon/>
                                </Nav.Link>
                            </div>
                            }
                            {!userStore.userAuthStatus &&
                            <div className={"nav-link pointer"} onClick={modalStore.LoginModalShow}>Войти</div>}
                            {userStore.userAuthStatus && (
                                <>
                                    <div className={"Custom-nav-bar-items-login-mobile"}>
                                        <Nav.Link as={Link} to={"/logout"}>
                                            <span className={"text-danger d-lg-none"}>Выйти из аккаунта</span>
                                        </Nav.Link>
                                    </div>
                                    <div className={"Custom-nav-bar-items-login-desktop-logo"}>
                                        <Dropdown autoClose={true} align={"end"}>
                                            <Dropdown.Toggle
                                                variant={headerType}
                                                id="dropdown-basic"
                                            >
                                                {userStore.userData.firstName}
                                                <img
                                                    src={userStore.userData.avatar.small}
                                                    alt={userStore.userData.lastName}
                                                    width="32"
                                                    height="32"
                                                    className="rounded-circle ms-1"
                                                />
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item as={Link} to="/user">
                                                    <DesktopUserIcon/>
                                                </Dropdown.Item>
                                                <Dropdown.Divider/>
                                                <Dropdown.Item href="/logout">Выход</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </>
                            )}
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}));
export default withRouter(Header);

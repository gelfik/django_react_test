import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

import { Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";

const MobileUserIcon = inject("userStore")(
  observer((stores) => {
    const { userStore } = stores;
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
            {userStore.userData.lastName} {userStore.userData.firstName}
          </span>
          <span className={"MobileUserIcon_Data_Profile"}>Личный профиль</span>
        </div>
      </div>
    );
  })
);

const Header = inject(
  "userStore",
  "modalStore"
)(
  observer((stores) => {
    const { userStore, modalStore } = stores;
    const [expanded, setExpanded] = useState(false);

    const getHeaderType = () => {
      if (stores.location.pathname === "/") return "dark";
      else return "light";
    };

    const headerType = getHeaderType();

    return (
      <Navbar
        fixed={"top"}
        variant={headerType}
        bg={headerType}
        expand="lg"
        expanded={expanded}
      >
        <Container className={"container__wrapper"}>
          <Navbar.Brand as={Link} to="/">
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
              <Nav.Link as={Link} to={"/"}>
                Главная
              </Nav.Link>
              <Nav.Link as={Link} to={"/courses"}>
                Курсы
              </Nav.Link>
              <div className={"Custom-nav-bar-items"}>
                {userStore.userAuthStatus && (
                  <div className={"Custom-nav-bar-items-login-mobile"}>
                    <Nav.Link as={Link} to={"/user"}>
                      <MobileUserIcon />
                    </Nav.Link>
                  </div>
                )}
                {!userStore.userAuthStatus && (
                  <div
                    className={"nav-link pointer"}
                    onClick={modalStore.LoginModalShow}
                  >
                    Войти
                  </div>
                )}
                {userStore.userAuthStatus && (
                  <>
                    <div className={"Custom-nav-bar-items-login-mobile"}>
                      <Nav.Link as={Link} to={"/logout"}>
                        <span className={"text-danger d-lg-none"}>
                          Выйти из аккаунта
                        </span>
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
                          <Dropdown.Item href="#/action-1">
                            ПРОФИЛЬ
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item href="#/action-3">Выход</Dropdown.Item>
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
  })
);

const Header4 = inject(
  "userStore",
  "modalStore"
)(
  observer((stores) => {
    const { userStore, modalStore } = stores;
    const loginMenu = () => {
      if (userStore.userData.avatar) {
        const nameAvatar = () => {
          return (
            <div className={"align-items-center"}>
              {userStore.userData.firstName}{" "}
              <img
                src={userStore.userData.avatar.small}
                alt={userStore.userData.lastName}
                width="32"
                height="32"
                className="rounded-circle ms-1"
              />
            </div>
          );
        };
        return (
          <NavDropdown
            // bsPrefix={'align-items-center d-flex'}
            id="nav-dropdown-user"
            // title={nameAvatar()}
            menuVariant="light"
            align={"end"}
            autoClose={true}
            navbar={true}
            // bsPrefix={'text-dark dropdown-toggle nav-link'}
            // drop={'end'}
          >
            <NavDropdown.Toggle variant="success" id="nav-dropdown-user">
              {nameAvatar()}
            </NavDropdown.Toggle>
            <NavDropdown.Item as={Link} className={"text-dark"} to="/user">
              Профиль
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} className={"text-dark"} to="/logout">
              Выйти
            </NavDropdown.Item>
          </NavDropdown>
        );
      } else {
        return (
          <Nav.Link as={Link} to={"/user"} onClick={modalStore.LoginModalShow}>
            Профиль
          </Nav.Link>
        );
      }
    };

    const guestMenu = () => {
      return <Nav.Link onClick={modalStore.LoginModalShow}>Войти</Nav.Link>;
    };

    const getHeaderType = () => {
      if (stores.location.pathname === "/") return "dark";
      else return "light";
    };

    const headerType = getHeaderType();

    return (
      <header>
        {/*<Navbar variant="dark" bg="dark" expand="lg" fixed="top" expanded={false}>*/}
        <nav
          className={`navbar navbar-expand-lg navbar-${headerType} bg-${headerType} p-0 `}
        >
          <div className={"container__wrapper"}>
            <Navbar.Brand as={Link} to={"/"}>
              IZZIBRAIN
            </Navbar.Brand>
            {/*<Navbar.Toggle aria-controls="my_navbar"/>*/}
            <Navbar.Collapse
              bsPrefix={"d-flex flex-row-reverse"}
              id="my_navbar"
            >
              <Nav className={"navbar-nav align-items-center"}>
                <Nav.Link as={Link} to={"courses"}>
                  Курсы
                </Nav.Link>
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
    );
  })
);

export default withRouter(Header);

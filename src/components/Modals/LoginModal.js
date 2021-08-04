import React from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import ErrorAlert from "../ErrorAlert";

const LoginModal = inject('userStore', 'modalStore', 'loginStore')(observer((stores) => {
    const {userStore, modalStore, loginStore} = stores;

    const onSubmitRegister = (e) => {
        e.preventDefault();
        userStore.login(loginStore.regData)
    }

    const openRegisterModal = () => {
        modalStore.LoginModalClose();
        modalStore.RegisterModalShow();
    }

    return (
        <Modal show={modalStore.LoginModalStatus} centered onHide={modalStore.LoginModalClose}>
            <Modal.Header>
                <Modal.Title>Вход в систему</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close" onClick={modalStore.LoginModalClose}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'} onSubmit={onSubmitRegister}>
                    <div className="row mt-3">
                        <LoginInput type={'email'} labelText={'Email'} fieldName={'email'}/>
                    </div>
                    <div className="row ">
                        <LoginInput type={'password'} labelText={'Пароль'} fieldName={'password'}/>
                    </div>
                    {userStore.errors?.error && <ErrorAlert error={userStore.errors?.error}/>}
                    {userStore.errors?.detail && <ErrorAlert error={userStore.errors?.detail}/>}
                    <div className={'w-100 d-flex justify-content-center'}>
                        <p className="text-center">Нет учетной записи?</p>
                        <div onClick={openRegisterModal} className={'link ms-2'}>Регистрация</div>
                    </div>
                    <button type="submit" className="btn btn-dark" disabled={!loginStore.isButtonDisabled}>Войти
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    )
}))


const LoginInput = inject('userStore', 'loginStore')(observer((props) => {
    const {fieldName, labelText, type = 'text', userStore, loginStore} = props
    return (
        <div className="col-lg-12 col-12 mb-3">
            <div className="form-floating ">
                <input type={type} onChange={(e) => {
                    loginStore.setKeyRegData(e.target.name, e.target.value)
                }}
                       className={`form-control ${loginStore.isValid(fieldName)}`}
                       id={fieldName} name={fieldName} value={loginStore.regData[fieldName] || ''}
                       required placeholder={labelText}/>
                <label htmlFor={fieldName}>{labelText}</label>
            </div>
            {userStore?.errors && userStore?.errors[fieldName] &&
            <p className={'custom-alert-danger-text'}>{userStore?.errors[fieldName]}</p>}
        </div>
    )
}))


export default LoginModal;
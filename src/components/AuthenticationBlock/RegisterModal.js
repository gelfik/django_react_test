import React, {useEffect, useRef} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";

const RegisterModal = inject('userStore', 'modalStore', 'registerStore')(observer((stores) => {
    const {userStore, modalStore, registerStore} = stores;

    const onSubmitRegister = (e) => {
        e.preventDefault();
    }

    const openLoginModal = () => {
        modalStore.RegisterModalClose();
        modalStore.LoginModalShow();
    }

    return (
        <Modal show={modalStore.RegisterModalStatus} centered onHide={modalStore.RegisterModalClose}>
            <Modal.Header>
                <Modal.Title>Регистрация</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close" onClick={modalStore.RegisterModalClose}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'} onSubmit={onSubmitRegister} >
                    <div className="row mt-3">
                        <RegisterInput type={'text'} labelText={'Фамилия'} fieldName={'lastName'}/>
                        <RegisterInput type={'text'} labelText={'Имя'} fieldName={'firstName'}/>
                    </div>
                    <div className="row">
                        <RegisterInput type={'email'} labelText={'Email'} fieldName={'email'}/>
                        <RegisterInput type={'text'} labelText={'Ссылка Вк'} fieldName={'vkLink'}/>
                    </div>
                    <div className="row ">
                        <RegisterInput type={'text'} labelText={'Пароль'} fieldName={'password'}/>
                        <RegisterInput type={'text'} labelText={'Повтор пароля'} fieldName={'password2'}/>
                    </div>

                    <div className={'w-100 d-flex justify-content-center'}>
                        <p className="text-center">Есть учетная запись?</p>
                        <a onClick={openLoginModal} className={'link ms-2'}>Войти</a>
                    </div>
                    <button
                        onClick={()=>{
                            console.log(registerStore.regData)}}
                        type="submit" className="btn btn-dark" disabled={!registerStore.isButtonDisabled}>Регистрация</button>
                </form>
            </Modal.Body>
        </Modal>
    )
}))


const RegisterInput = inject('registerStore')(observer((props) => {
    const {fieldName, labelText, type = 'text', registerStore} = props
    return (
        <div className="col-lg-6 col-12 mb-3">
            <div className="form-floating">
                <input type={type} onChange={(e) => {registerStore.setKeyRegData(e.target.name, e.target.value)}}
                       className={`form-control ${registerStore.isValid(fieldName)}`}
                       id={fieldName} name={fieldName} value={registerStore.regData[fieldName] || ''}
                       required/>
                <label htmlFor={fieldName}>{labelText}</label>
            </div>
        </div>
    )
}))


export default RegisterModal;
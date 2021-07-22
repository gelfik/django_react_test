import React, {useRef, useState} from "react";
import {inject, observer} from "mobx-react";
import Modal from 'react-bootstrap/Modal'
// import {Redirect} from "react-router-dom";
import {validateEmail, validatePhone} from "../../utils/ValidatorService";
import ErrorAlert from "../ErrorAlert";
import RegisterModal from "./RegisterModal";

const AuthenticationBlock = inject('userStore', 'modalStore')(observer((stores) => {
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    const {userStore, modalStore} = stores
    const [emailState, setEmail] = useState('')
    const [emailValidState, setEmailValid] = useState('')
    const [passwordState, setPassword] = useState('')
    const [passwordValidState, setPasswordValid] = useState('')

    const [registerStatus, setRegisterStatus] = useState(false)

    const formRef = useRef()

    const [formValue, setFormValue] = useState({
        lastName: userStore.userData?.lastName,
        firstName: userStore.userData?.firstName,
        email: userStore.userData?.email,
        vkLink: userStore.userData?.vkLink,
        password: '',
        password2: ''
    })

    const changeFormValue = (e) => {
        console.log('changeFormValue')
        if (e.target.name.toLowerCase().indexOf('name') !== -1)
            setFormValue({...formValue, [e.target.name]: e.target.value.capitalize()})
        else setFormValue({...formValue, [e.target.name]: e.target.value})

    }

    const isRegActive = () => {
        let validStatus = true
        // console.log(formRef)
        for (const [key, value] of Object.entries(formValue)) {
            if (formRef.current[key].className.indexOf('is-invalid') !== -1) {
                console.log(value)
                validStatus = false
            }
        }
        // console.log(validStatus)
        setRegisterStatus(validStatus)
        return ''
    }

    const isValid = (key) => {
        console.log('isValid')
        switch (key) {
            case "vkLink":
                return formValue[key]?.length >= 8 ? 'is-valid' : 'is-invalid'
            case "email":
                return validateEmail(formValue[key]) ? 'is-valid' : 'is-invalid'
            case "phone":
                return validatePhone(formValue[key]) && (formValue[key]?.length >= 11) ? 'is-valid' : 'is-invalid'
            case "password":
                return formValue[key]?.length >= 8 ? 'is-valid' : 'is-invalid'
            case "password2":
                return (formValue[key] === formValue['password']) && (formValue[key]?.length >= 8) ? 'is-valid' : 'is-invalid'
            default:
                return formValue[key]?.length >= 3 ? 'is-valid' : 'is-invalid'
        }
    }

    // if (userStore.userAuthStatus) {
    //     return <Redirect to="/user"/>
    // }

    const onChangeEmailLabel = (e) => {
        setEmail(e.target.value)
        if (validateEmail(e.target.value)) {
            setEmailValid('is-valid')
        } else {
            setEmailValid('is-invalid')
        }
        if (e.target.value === '') {
            setEmailValid('')
        }
    }

    const onChangePasswordLabel = (e) => {
        setPassword(e.target.value)
        if (e.target.value === '') {
            setPasswordValid('')
        } else if (e.target.value.length < 6) {
            setPasswordValid('is-invalid')
        } else {
            setPasswordValid('is-valid')
        }
    }

    const onSubmitLogin = (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        const content = {
            email: data.get('email'),
            password: data.get('password'),
            // isChecked: data.get('isCheck')
        }
        userStore.login(content)
        // userStore.login(content).then(([res, status]) => {
        //         if (status) {
        //             RedirectService('/user')
        //         } else {
        //             if (res?.errors?.error[0]) {
        //                 setError(res?.errors?.error[0])
        //             }
        //         }
        //     }
        // )
    }

    const openRegisterModal = () => {
        modalStore.LoginModalClose();
        modalStore.RegisterModalShow();
    }

    const openLoginModal = () => {
        modalStore.RegisterModalClose();
        modalStore.LoginModalShow();
    }

    return (<>
        <Modal show={modalStore.LoginModalStatus} centered onHide={modalStore.LoginModalClose}>
            <Modal.Header>
                <Modal.Title>Вход в систему</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close" onClick={modalStore.LoginModalClose}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'} onSubmit={onSubmitLogin} action={'/login'}>
                    <div className="form-floating">
                        <input onChange={onChangeEmailLabel} type="email"
                               className={`form-control ${emailValidState}`}
                               id="floatingInputEmail" name={'email'} value={emailState} required
                               placeholder="name@example.com"/>
                        <label htmlFor="floatingInput">Email</label>
                        {userStore.errors?.email &&
                        <ErrorAlert type={'text-only'} error={userStore.errors.email}/>}
                    </div>
                    <div className="form-floating">
                        <input onChange={onChangePasswordLabel} type="password"
                               className={`form-control ${passwordValidState}`} id="floatingInput"
                               name={'password'} value={passwordState} required
                               placeholder="name@example.com"/>
                        <label htmlFor="floatingInputPassword">Пароль</label>
                        {userStore.errors?.password &&
                        <ErrorAlert type={'text-only'} error={userStore.errors.password}/>}
                    </div>

                    {userStore.errors?.error && <ErrorAlert error={userStore.errors?.error}/>}
                    {userStore.errors?.detail && <ErrorAlert error={userStore.errors?.detail}/>}
                    <p className="text-center">Нет учетной записи? <a onClick={openRegisterModal}
                                                                      className={'link'}>Регистрация</a></p>
                    <button type="submit" className="btn btn-dark">Войти</button>
                </form>
            </Modal.Body>
        </Modal>

        <RegisterModal/>

    </>)
}))

export default AuthenticationBlock;
import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import ErrorAlert from "../components/ErrorAlert";
import {validateEmail} from "../utils/ValidatorService";
import {Link, Redirect} from "react-router-dom";

const LoginPage = inject('userStore')(observer((stores) => {
        const {userStore} = stores
        const [emailState, setEmail] = useState('')
        const [emailValidState, setEmailValid] = useState('')
        const [passwordState, setPassword] = useState('')
        const [passwordValidState, setPasswordValid] = useState('')

        if (userStore.userAuthStatus) {
            return <Redirect to="/user"/>
        }

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

        const onSubmit = (e) => {
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

        return (
            <div className="my-parent-center">
                <div className="container my-block-center">
                    <div className="row justify-content-center">
                        <div className={'col'}/>
                        <div className={'col-lg-5'}>
                            <h2 className={'h2'}>Вход в систему</h2>
                            <form className={'d-flex flex-column'} onSubmit={onSubmit}>
                                {/*<div className="form-group">*/}
                                {/*    <input onChange={onChangeEmailLabel} type="email" className={`form-control ${emailValidState}`}*/}
                                {/*           id="InputEmail"*/}
                                {/*           aria-describedby="emailHelp"*/}
                                {/*           name={'email'}*/}
                                {/*           value={emailState} required*/}
                                {/*           placeholder={'Email'}*/}
                                {/*    />*/}
                                {/*    {userStore.errors?.email &&*/}
                                {/*    <ErrorAlert type={'text-only'} error={userStore.errors.email}/>}*/}
                                {/*</div>*/}

                                <div className="form-floating">
                                    <input onChange={onChangeEmailLabel} type="email"
                                           className={`form-control ${emailValidState}`}
                                           id="floatingInput" name={'email'} value={emailState} required
                                           placeholder="name@example.com"/>
                                    <label htmlFor="floatingInput">Email</label>
                                    {userStore.errors?.email &&
                                    <ErrorAlert type={'text-only'} error={userStore.errors.email}/>}
                                </div>


                                {/*<div className="form-group">*/}
                                {/*    <input onChange={onChangePasswordLabel} type="password"*/}
                                {/*           className={`form-control ${passwordValidState}`}*/}
                                {/*           id="InputPassword" name={'password'}*/}
                                {/*           value={passwordState} required*/}
                                {/*           placeholder={'Пароль'}*/}
                                {/*    />*/}
                                {/*    {userStore.errors?.password &&*/}
                                {/*    <ErrorAlert type={'text-only'} error={userStore.errors.password}/>}*/}
                                {/*</div>*/}

                                <div className="form-floating">
                                    <input onChange={onChangePasswordLabel} type="password"
                                           className={`form-control ${passwordValidState}`} id="floatingInput"
                                           name={'password'} value={passwordState} required
                                           placeholder="name@example.com"/>
                                    <label htmlFor="floatingInput">Пароль</label>
                                    {userStore.errors?.password &&
                                    <ErrorAlert type={'text-only'} error={userStore.errors.password}/>}
                                </div>

                                {userStore.errors?.error && <ErrorAlert error={userStore.errors?.error}/>}
                                {userStore.errors?.detail && <ErrorAlert error={userStore.errors?.detail}/>}
                                <p className="text-center">Нет учетной записи? <Link to="/register">Регистрация</Link></p>
                                <button type="submit" className="btn btn-secondary">Войти</button>
                            </form>
                        </div>
                        <div className={'col'}/>
                    </div>
                </div>
            </div>
        )
    }
))

export default LoginPage;
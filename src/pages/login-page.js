import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import ErrorAlert from "../components/ErrorAlert";
import {validateEmail} from "../utils/ValidatorService";
import {Redirect} from "react-router-dom";

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
            <div className="container">
                <h2 className={'h2'}>Login Page</h2>
                <form className={'d-flex flex-column'} onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input onChange={onChangeEmailLabel} type="email" className={`form-control ${emailValidState}`}
                               id="exampleInputEmail1"
                               aria-describedby="emailHelp"
                               name={'email'}
                               value={emailState} required
                        />
                        {userStore.errors?.email &&
                        <ErrorAlert type={'text-only'} error={userStore.errors.email}/>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input onChange={onChangePasswordLabel} type="password"
                               className={`form-control ${passwordValidState}`}
                               id="exampleInputPassword1" name={'password'}
                               value={passwordState} required
                        />
                        {userStore.errors?.password &&
                        <ErrorAlert type={'text-only'} error={userStore.errors.password}/>}
                    </div>
                    {userStore.errors?.error && <ErrorAlert error={userStore.errors?.error}/>}
                    {userStore.errors?.detail && <ErrorAlert error={userStore.errors?.detail}/>}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
))

export default LoginPage;
import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import ErrorAlert from "../ErrorAlert";
import RedirectService from "../utils/RedirectService";
import {validateEmail} from "../utils/ValidatorService";
import {Link} from "react-router-dom";

const LoginPage = inject('userStore')(observer((props) => {
        const [emailState, setEmail] = useState('')
        const [emailValidState, setEmailValid] = useState('')
        const [passwordState, setPassword] = useState('')
        const [passwordValidState, setPasswordValid] = useState('')
        const [errorState, setError] = useState('')


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
                console.log(e.target.value.length)
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
            props.userStore.login(content).then(([res, status]) => {
                    if (status) {
                        RedirectService('/user')
                    } else {
                        if (res?.errors?.error[0]) {
                            setError(res?.errors?.error[0])
                        }
                    }
                }
            )
        }

        if (props.userStore.userAuthStatus) {
            return (
                <div className={'container'}>
                    <h2 className={'h2'}>Login Page</h2>
                    <p>You already login. Wanna to <Link to={'/deauth'}>exit?</Link></p>
                </div>
            )
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
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input onChange={onChangePasswordLabel} type="password"
                               className={`form-control ${passwordValidState}`}
                               id="exampleInputPassword1" name={'password'}
                               value={passwordState} required
                        />
                    </div>
                    {errorState && <ErrorAlert error={errorState}/>}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
))

export default LoginPage;
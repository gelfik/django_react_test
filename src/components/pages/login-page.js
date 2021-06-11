import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import ErrorAlert from "../ErrorAlert";
import RedirectService from "../utils/RedirectService";

const LoginPage = inject('userStore')(observer((props) => {

        const [emailState, setEmail] = useState('')
        const [passwordState, setPassword] = useState('')
        const [errorState, setError] = useState('')

        const onChangeEmailLabel = (e) => {
            setEmail(e.target.value)
        }

        const onChangePasswordLabel = (e) => {
            setPassword(e.target.value)
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
                        RedirectService('/')
                    } else {
                        if (res?.errors?.error[0]) {
                            setError(res?.errors?.error[0])
                        }
                    }
                }
            )
        }


        return (
            <div className="container">
                <h2 className={'h2'}>Login Page</h2>
                <form className={'d-flex flex-column'} onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input onChange={onChangeEmailLabel} type="email" className="form-control is-valid"
                               id="exampleInputEmail1"
                               aria-describedby="emailHelp"
                               name={'email'}
                               value={emailState} required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input onChange={onChangePasswordLabel} type="password" className="form-control"
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
import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap';
import CookieService from "./cookie-service";
import ApiService from "./api-service";

// const useAuthToken = () => {
//     const CookieServices = new CookieService();
//     const [authTokenState, SetUserAuth] = useState(false);
//     const auth_token = CookieServices.getCookie('Authorization')
//     useEffect(() => {
//         if (auth_token !== undefined) {
//             SetUserAuth(true)
//         }
//         console.log(authTokenState)
//     }, [authTokenState]);
//     return authTokenState
// };
//

const getAuthStatus = () => {
    const CookieServices = new CookieService();
    const authToken = CookieServices.getCookie('Authorization')
    let userAuthStatus = false
    if (authToken !== undefined)
        userAuthStatus = true
    return userAuthStatus
}

const getUserData = () => {
    const ApiServices = new ApiService()
    return ApiServices.getUserData()
}

const loginTest = (email='', password = '') => {
    const ApiServices = new ApiService()
    return ApiServices.postUserLogin(email, password)

}

const UserData = ({value}) => {
    return <p> {value} </p>
}


function App() {
    const [userAuthStatus, SetUserAuthStatus] = useState(getAuthStatus())
    const [userDataState, SetUserData] = useState(null);

    const [labelEmailState, SetLabelEmail] = useState('')
    const [labelPasswordState, SetLabelPassword] = useState('')

    const onChangeLabelEmail = (e) => {
        console.log(e.target.value)
        SetLabelEmail(e.target.value)
    }

    const onChangeLabelPassword = (e) => {
        console.log(e.target.value)
        // SetLabelPassword(e.target.value)
    }

    const onSubmitLogin = (e) => {
        e.preventDefault()
        loginTest(labelEmailState, labelPasswordState).then((res) => {
            const [data, status] = res
            console.log(data)
            if (!status) {
                console.log(status)
            } else {
                const CookieServices = new CookieService();
                CookieServices.setCookie('Authorization', `Token ${data.token}`);
                SetUserAuthStatus(true)
            }
        })
    }

    const UserLoginForm = ({value}) => {
        if (!value) {
            return <form onSubmit={onSubmitLogin}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input onChange={onChangeLabelEmail} type="email" className="form-control" id="exampleInputEmail1"
                           aria-describedby="emailHelp" value={labelEmailState}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input onChange={onChangeLabelPassword} type="password" className="form-control"
                           id="exampleInputPassword1" value={labelPasswordState}/>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        } else {
            return null
        }
    }


    useEffect(() => {
        if (userAuthStatus) {
            getUserData().then((data) => {
                console.log(data)

                if (typeof (data.error) !== 'undefined') {
                    SetUserData(data.error)
                    SetUserAuthStatus(false)
                } else {
                    const msg = `${data.lastName} ${data.firstName} ${data.patronymic}`
                    SetUserData(msg)
                }
            })
        }
    }, [])
    // const CookieServices = new CookieService();
    // CookieServices.setCookie('Authorization', 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2RhdGEiOnsiaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJjcmVhdGVkX2RhdGUiOiIyMDIxLTA2LTA4IDIwOjE5OjExIn0sImV4cCI6MTYyODM2NzU1MSwiaWF0IjoxNjIzMTgzNTUxfQ.b6yn08vAKmfZqHHNX_sYRXDbCB86wHlE6Ad1ujuqiQk');
    return (
        <div className="container">
            <h1>Тест</h1>
            <Button variant='primary'>Button</Button>
            <UserData value={userDataState}/>
            <UserLoginForm value={userAuthStatus}/>
        </div>
    );
}

export default App;
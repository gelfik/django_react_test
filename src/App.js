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

const UserData = ({value}) => {
    // useEffect(() => {
    //     console.log('user data load')
    //     return () => console.log('clear')
    // }, [value])
    return <p> {value} </p>
}

const UserLoginForm = ({value}) => {
    if (!value) {
        return <form>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    } else {
        return null
    }
}


function App() {
    const [userAuthStatus, SetUserAuthStatus] = useState(getAuthStatus())
    const [userDataState, SetUserData] = useState(null);


    useEffect(() => {
        if (userAuthStatus) {
            getUserData().then((data) => {
                console.log(data)

                if (typeof (data.error) !== 'undefined') {
                    SetUserData(data.error)
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

import React, {useEffect, useRef, useState} from "react";
import {inject, observer} from "mobx-react";
import ErrorAlert from "../components/ErrorAlert";
import {validateEmail, validatePhone} from "../utils/ValidatorService";

const UserPage = inject('userStore', 'pictureStore')(observer((stores) => {
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }


    const {userStore, pictureStore} = stores;
    const fileRef = useRef();

    const loadfile = event => {
        const files = event.target.files;
        const oneFile = files[0];
        const formData = new FormData();

        formData.append('file', oneFile);

        pictureStore.loadImage(formData).then(r => {
            userStore.fetchUser()
        })
    }

    const [editState, setEdit] = useState(true)
    const [imgHoverState, setImgHover] = useState(false)

    const [lastNameState, setLastName] = useState(userStore.userData?.lastName ?? '')
    const [lastNameValidState, setLastNameValid] = useState('')
    const [firstNameState, setFirstName] = useState(userStore.userData?.firstName ?? '')
    const [firstNameValidState, setFirstNameValid] = useState('')
    const [emailState, setEmail] = useState(userStore.userData?.email ?? '')
    const [emailValidState, setEmailValid] = useState('')
    const [phoneState, setPhone] = useState(userStore.userData?.phone ?? '')
    const [phoneValidState, setPhoneValid] = useState('')
    const [usernameState, setUsername] = useState(userStore.userData?.username ?? '')
    const [usernameValidState, setUsernameValid] = useState('')
    const [vkLinkState, setVkLink] = useState(userStore.userData?.vkLink ?? '')
    const [vkLinkValidState, setVkLinkValid] = useState('')
    const [passwordState, setPassword] = useState('')
    const [passwordValidState, setPasswordValid] = useState('')

    useEffect(() => {
        setLastName(userStore.userData.lastName)
        setLastNameValid('')
        setFirstName(userStore.userData.firstName)
        setFirstNameValid('')
        setEmail(userStore.userData.email)
        setEmailValid('')
        setPhone(userStore.userData.phone)
        setPhoneValid('')
        setUsername(userStore.userData.username)
        setUsernameValid('')
        setVkLink(userStore.userData.vkLink)
        setVkLinkValid('')
    }, [userStore.userData])

    const editButton = () => {
        if (!editState) {
            setLastName(userStore.userData.lastName)
            setLastNameValid('')
            setFirstName(userStore.userData.firstName)
            setFirstNameValid('')
            setEmail(userStore.userData.email)
            setEmailValid('')
            setPhone(userStore.userData.phone)
            setPhoneValid('')
            setUsername(userStore.userData.username)
            setUsernameValid('')
            setVkLink(userStore.userData.vkLink)
            setVkLinkValid('')
        }
        setEdit(!editState)
    }

    const globalInput = (name, rusName, state, validState, onChange, type = 'text') => {
        return <div className="form-floating">
            <input type={`${type}`} onChange={onChange}
                   className={`form-control ${validState}`}
                   id={`floatingInput${name}`} name={`${name}`} value={state}
                   required disabled={editState}/>
            <label htmlFor={`floatingInput${name}`}>{`${rusName}`}</label>
        </div>
    }


    const onChangeLastNameLabel = (e) => {
        setLastName(e.target.value.capitalize())
        if (e.target.value.length >= 3) {
            setLastNameValid('is-valid')
        } else {
            setLastNameValid('is-invalid')
        }
    }

    const onChangeFirstNameLabel = (e) => {
        setFirstName(e.target.value.capitalize())
        if (e.target.value.length >= 3) {
            setFirstNameValid('is-valid')
        } else {
            setFirstNameValid('is-invalid')
        }
    }

    const onChangeEmailLabel = (e) => {
        setEmail(e.target.value)
        if (validateEmail(e.target.value)) {
            setEmailValid('is-valid')
        } else {
            setEmailValid('is-invalid')
        }
    }

    const onChangePhoneLabel = (e) => {
        setPhone(e.target.value)
        if (validatePhone(e.target.value) && (e.target.value.length >= 11)) {
            setPhoneValid('is-valid')
        } else {
            setPhoneValid('is-invalid')
        }
    }

    const onChangeUsernameLabel = (e) => {
        setUsername(e.target.value)
        if (e.target.value.length >= 3) {
            setUsernameValid('is-valid')
        } else {
            setUsernameValid('is-invalid')
        }
    }

    const onChangeVkLinkLabel = (e) => {
        setVkLink(e.target.value)
        if (e.target.value.length >= 3) {
            setVkLinkValid('is-valid')
        } else {
            setVkLinkValid('is-invalid')
        }
    }

    const avatarBlock = () => {
        return <div className="text-center">
            <label htmlFor="fileLoadInput" className={`${imgHoverState ? 'fileLoadInputWrapper' : ''}`}
                   onMouseEnter={() => setImgHover(true)}
                   onMouseLeave={() => setImgHover(false)}>
                <img src={userStore.userData.avatar.profile}
                     alt={userStore.userData.lastName}
                     className="rounded-circle"/>
                <input type="file" name={'file'} id={'fileLoadInput'} ref={fileRef} onChange={loadfile} multiple={false}
                       className={'fileLoadInput'}/>
                {imgHoverState && <div className={'fileLoadInputOverlay'}>
                    <svg fill="none" height="48" viewBox="0 0 32 32" width="48"
                         xmlns="http://www.w3.org/2000/svg">
                        <rect height="20" rx="5" stroke="white" strokeWidth="2" width="26" x="3" y="7"/>
                        <path
                            d="M11.8114 4.40345C12.0723 3.5685 12.8456 3 13.7204 3H18.2796C19.1544 3 19.9277 3.5685 20.1886 4.40345L21 7H11L11.8114 4.40345Z"
                            fill="white">&gt;</path>
                        <circle cx="16" cy="17" r="5" stroke="white" strokeWidth="2"/>
                    </svg>
                    </div>}
            </label>
        </div>
    }

    const nameBlock = () => {
        if (editState) {
            return <h4
                className={'text-center mb-3'}>{userStore.userData.lastName} {userStore.userData.firstName}</h4>
        } else {
            return <div className="row mt-3">
                <div className="col-lg-6 col-12 mb-3 ">
                    {globalInput('lastName', 'Фамилия', lastNameState, lastNameValidState, onChangeLastNameLabel)}
                </div>
                <div className="col-lg-6 col-12 mb-3">
                    {globalInput('firstName', 'Имя', firstNameState, firstNameValidState, onChangeFirstNameLabel)}
                </div>
            </div>
        }
    }

    const emailPhoneBlock = () => {
        return <div className="row">
            <div className="col-lg-6 col-12 mb-3">
                {globalInput('email', 'Email', emailState, emailValidState, onChangeEmailLabel, 'email')}
            </div>
            <div className="col-lg-6 col-12 mb-3">
                {globalInput('phone', 'Телефон', phoneState, phoneValidState, onChangePhoneLabel)}
            </div>
        </div>
    }

    const usernameVklinkBlock = () => {
        return <div className="row ">
            <div className="col-lg-6 col-12 mb-3">
                {globalInput('username', 'Логин', usernameState, usernameValidState, onChangeUsernameLabel)}
            </div>
            <div className="col-lg-6 col-12 mb-3">
                {globalInput('vkLink', 'Ссылка Вк', vkLinkState, vkLinkValidState, onChangeVkLinkLabel)}
            </div>
        </div>
    }

    const acceptEditBlock = () => {
        if (!editState) {
            return <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={editButton}>Отменить</button>
                <button type="submit" className="btn btn-dark">Сохранить изменения</button>
            </div>
        }
    }


    const OnSubmitupdateUser = (e) => {
        e.preventDefault()
        const data = new FormData(e.target);
        const content = {}

        if (emailValidState === 'is-valid') {
            content['email'] = data.get('email')
        }
        if (phoneValidState === 'is-valid') {
            content['phone'] = data.get('phone')
        }
        if (usernameValidState === 'is-valid') {
            content['username'] = data.get('username')
        }
        if (vkLinkValidState === 'is-valid') {
            content['vkLink'] = data.get('vkLink')
        }
        if (lastNameValidState === 'is-valid') {
            content['lastName'] = data.get('lastName')
        }
        if (firstNameValidState === 'is-valid') {
            content['firstName'] = data.get('firstName')
        }

        userStore.updateUser(content)

        setLastNameValid('')
        setFirstNameValid('')
        setEmailValid('')
        setPhoneValid('')
        setUsernameValid('')
        setVkLinkValid('')
        setEdit(!editState)
    }

    return (
        <>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Профиль</h5>
                        <button type="button" className={'btn'}
                                aria-label="Edit" onClick={editButton}>
                            <svg fill="none" height="24" viewBox="0 0 24 24" width="24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.28363 15.5735L13.4234 6.43374L17.6146 10.625L8.47484 19.7647C8.29454 19.945 8.05219 20.0496 7.79733 20.0571L7.82693 21.0567L7.79733 20.0571L3.87501 20.1733L3.99117 16.251C3.99872 15.9961 4.10333 15.7538 4.28363 15.5735Z"
                                    stroke="#101010" strokeWidth="2"></path>
                                <path
                                    d="M17.3125 10.9294L13.1212 6.7382L15.6876 4.1718C16.0782 3.78127 16.7113 3.78128 17.1019 4.1718L19.8789 6.94879C20.2694 7.33932 20.2694 7.97249 19.8789 8.36301L17.3125 10.9294Z"
                                    stroke="#101010" strokeWidth="2"></path>
                                <path d="M9 20L4 15V20H9Z" fill="#101010"></path>
                            </svg>
                        </button>
                    </div>
                    <form className={'d-flex flex-column'} onSubmit={OnSubmitupdateUser}>
                        <div className="modal-body">
                            {avatarBlock()}
                            {nameBlock()}
                            {emailPhoneBlock()}
                            {usernameVklinkBlock()}
                        </div>
                        {acceptEditBlock()}
                    </form>
                </div>
            </div>
        </>
    )
}))

export default UserPage;
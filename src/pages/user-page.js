import React, {useEffect, useRef, useState} from "react";
import {inject, observer} from "mobx-react";
import {validateEmail, validatePhone} from "../utils/ValidatorService";

const UserPage = inject('userStore', 'pictureStore')(observer((stores) => {
    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    const {userStore, pictureStore} = stores;
    const formRef = useRef()
    const fileRef = useRef();

    const [isFormEditable, setFormEditable] = useState(false)
    const [imgHoverState, setImgHover] = useState(false)

    const [formValue, setFormValue] = useState({
        lastName: userStore.userData?.lastName,
        firstName: userStore.userData?.firstName,
        username: userStore.userData?.username,
        email: userStore.userData?.email,
        phone: userStore.userData?.phone,
        vkLink: userStore.userData?.vkLink,
    })

    const loadfile = event => {
        const files = event.target.files;
        const oneFile = files[0];
        const formData = new FormData();

        formData.append('file', oneFile);

        pictureStore.loadImage(formData).then(r => {
            userStore.fetchUser()
        })
    }


    const submitForm = (e) => {
        e.preventDefault()
        const content = {}
        for (const [key, value] of Object.entries(formValue)) {
            if (formRef.current[key].className.indexOf('is-valid') !== -1) {
                content[key] = value
            }
        }
        userStore.updateUser(content)
        setFormEditable(false)
    }

    useEffect(() => {
        setFormValue({
            lastName: userStore.userData?.lastName,
            firstName: userStore.userData?.firstName,
            username: userStore.userData?.username,
            email: userStore.userData?.email,
            phone: userStore.userData?.phone,
            vkLink: userStore.userData?.vkLink,
        })
    }, [userStore.userData])

    const changeFormValue = (e) => {
        if (e.target.name.toLowerCase().indexOf('name') !== -1)
            setFormValue({...formValue, [e.target.name]: e.target.value.capitalize()})
        else setFormValue({...formValue, [e.target.name]: e.target.value})

    }

    const isValid = (key) => {
        if (!isFormEditable) return ''
        switch (key) {
            case "length":
                return formValue[key]?.length >= 3 ? 'is-valid' : 'is-invalid'
            case "email":
                return validateEmail(formValue[key]) ? 'is-valid' : 'is-invalid'
            case "phone":
                return validatePhone(formValue[key]) && (formValue[key]?.length >= 11) ? 'is-valid' : 'is-invalid'
            default:
                return formValue[key]?.length >= 3 ? 'is-valid' : 'is-invalid'
        }
    }

    const toggleEdit = () => {
        if (isFormEditable) {
            setFormValue({
                lastName: userStore.userData?.lastName,
                firstName: userStore.userData?.firstName,
                username: userStore.userData?.username,
                email: userStore.userData?.email,
                phone: userStore.userData?.phone,
                vkLink: userStore.userData?.vkLink,
            })
        }
        setFormEditable(!isFormEditable)
    }

    const globalInput = (name, rusName, state, type = 'text') => {
        return <div className="form-floating">
            <input type={`${type}`} onChange={changeFormValue}
                   className={`form-control ${isValid(name)}`}
                   id={`floatingInput${name}`} name={`${name}`} value={formValue[name]}
                   required disabled={!isFormEditable}/>
            <label htmlFor={`floatingInput${name}`}>{`${rusName}`}</label>
        </div>
    }

    const avatarBlock = () => {
        return <div className="text-center">
            <label htmlFor="fileLoadInput" className={`${imgHoverState ? 'fileLoadInputWrapper' : ''}`}
                   onMouseEnter={() => setImgHover(true)}
                   onMouseLeave={() => setImgHover(false)}>
                <img src={userStore.userData.avatar.profile}
                     alt={userStore.userData.lastName}
                     className="rounded-circle"/>
                <input type="file" accept=".png,.jpg,.jpeg" name={'file'} id={'fileLoadInput'} ref={fileRef} onChange={loadfile} multiple={false}
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
        if (!isFormEditable) {
            return <h4
                className={'text-center mb-3'}>{userStore.userData.lastName} {userStore.userData.firstName}</h4>
        } else {
            return <div className="row mt-3">
                <div className="col-lg-6 col-12 mb-3 ">
                    {globalInput('lastName', 'Фамилия')}
                </div>
                <div className="col-lg-6 col-12 mb-3">
                    {globalInput('firstName', 'Имя')}
                </div>
            </div>
        }
    }

    const emailPhoneBlock = () => {
        return <div className="row">
            <div className="col-lg-6 col-12 mb-3">
                {globalInput('email', 'Email', 'email')}
            </div>
            <div className="col-lg-6 col-12 mb-3">
                {globalInput('phone', 'Телефон')}
            </div>
        </div>
    }

    const usernameVklinkBlock = () => {
        return <div className="row ">
            <div className="col-lg-6 col-12 mb-3">
                <div className="form-floating">
                    <input type={`text`}
                           className={`form-control`}
                           id={`floatingInputusername`} name={`username`} value={formValue['username']}
                           required disabled={true}/>
                    <label htmlFor={`floatingInputusername`}>{`Логин`}</label>
                </div>
            </div>
            <div className="col-lg-6 col-12 mb-3">
                {globalInput('vkLink', 'Ссылка Вк')}
            </div>
        </div>
    }

    const acceptEditBlock = () => {
        if (isFormEditable) {
            return <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => toggleEdit()}>Отменить</button>
                <button type="submit" className="btn btn-dark">Сохранить изменения</button>
            </div>
        }
    }

    return (
        <>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Профиль - @{formValue['username']}</h5>
                        <button type="button" className={'btn'}
                                aria-label="Edit" onClick={() => toggleEdit()}>
                            <svg fill="none" height="24" viewBox="0 0 24 24" width="24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.28363 15.5735L13.4234 6.43374L17.6146 10.625L8.47484 19.7647C8.29454 19.945 8.05219 20.0496 7.79733 20.0571L7.82693 21.0567L7.79733 20.0571L3.87501 20.1733L3.99117 16.251C3.99872 15.9961 4.10333 15.7538 4.28363 15.5735Z"
                                    stroke="#101010" strokeWidth="2"/>
                                <path
                                    d="M17.3125 10.9294L13.1212 6.7382L15.6876 4.1718C16.0782 3.78127 16.7113 3.78128 17.1019 4.1718L19.8789 6.94879C20.2694 7.33932 20.2694 7.97249 19.8789 8.36301L17.3125 10.9294Z"
                                    stroke="#101010" strokeWidth="2"/>
                                <path d="M9 20L4 15V20H9Z" fill="#101010"/>
                            </svg>
                        </button>
                    </div>
                    <form className={'d-flex flex-column'} onSubmit={submitForm} ref={formRef}>
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
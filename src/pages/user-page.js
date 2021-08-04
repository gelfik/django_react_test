import React, {useEffect, useRef, useState} from "react";
import {inject, observer} from "mobx-react";
import {validateEmail, validatePhone} from "../utils/ValidatorService";

const UserPage = inject('userStore', 'pictureStore')(observer((stores) => {
    // String.prototype.capitalize = function () {
    //     return this.charAt(0).toUpperCase() + this.slice(1);
    // }
    useEffect(() => {
        document.title = "Профиль"
        document.body.className = 'bg-light min-vh-100'
    }, []);

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
                <input type="file" accept=".png,.jpg,.jpeg" name={'file'} id={'fileLoadInput'} ref={fileRef}
                       onChange={loadfile} multiple={false}
                       className={'fileLoadInput'}/>
                {imgHoverState && <div className={'fileLoadInputOverlay'}>
                    <svg fill="none" height="48" width="48">
                        <use xlinkHref={'#icon-photocam'}/>
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
        <main className={'bg-content mt_navbar'}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Профиль - @{formValue['username']}</h5>
                        <button type="button" className={'btn'}
                                aria-label="Edit" onClick={() => toggleEdit()}>
                            <svg fill="none" height="24"  width="24">
                                <use xlinkHref={'#icon-pencil'}/>
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
        </main>
    )
}))

export default UserPage;
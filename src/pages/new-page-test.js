import React, {useEffect, useRef, useState} from "react";
import {inject, observer} from "mobx-react";
import {validateEmail, validatePhone} from "../utils/ValidatorService";

const NewPageTest = inject('userStore')(observer((stores) => {
    const {userStore} = stores;
    const formRef = useRef()

    String.prototype.capitalize = function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
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

    const [formValue, setFormValue] = useState({
        lastName: userStore.userData?.lastName,
        firstName: userStore.userData?.firstName,
        username: userStore.userData?.username,
        email: userStore.userData?.email,
        phone: userStore.userData?.phone,
        vkLink: userStore.userData?.vkLink,
    })

    const [isFormEditable, setFormEditable] = useState(false)

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

    const isValid = (key, type = 'length') => {
        if (!isFormEditable) return ''
        switch (type) {
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

    return (<div className={'d-flex m-auto p-4'}>
        <div className={'modal-content '}>
            <form className={'d-flex flex-column'} onSubmit={submitForm} ref={formRef}>
                <label htmlFor="username">username</label>
                <input id={'username'} name={'username'} value={formValue.username}
                       className={`form-control`} disabled={true}
                       onChange={changeFormValue}
                       type="text"/>
                <label htmlFor="email">email</label>
                <input id={'email'} name={'email'} value={formValue.email}
                       className={`form-control ${isValid('email', 'email')}`} disabled={!isFormEditable}
                       onChange={changeFormValue} type="text"/>
                <label htmlFor="phone">phone</label>
                <input id={'phone'} name={'phone'} value={formValue.phone}
                       className={`form-control ${isValid('phone', 'phone')}`} disabled={!isFormEditable}
                       onChange={changeFormValue} type="text"/>
                <label htmlFor="vkLink">vkLink</label>
                <input id={'vkLink'} name={'vkLink'} value={formValue.vkLink}
                       className={`form-control ${isValid('vkLink')}`} disabled={!isFormEditable}
                       onChange={changeFormValue}
                       type="text"/>
                <button type={'submit'} disabled={!isFormEditable}>submit</button>
            </form>
            <button onClick={() => toggleEdit()}>edit</button>
        </div>
    </div>)
    // return (<div>{userStore.userData.username}</div>)
}))

export default NewPageTest;
import React from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import ErrorAlert from "../ErrorAlert";

const ASubCourseAddModal = inject('userStore', 'modalStore')(observer((stores) => {
    const {userStore, modalStore} = stores;

    return (
        <Modal show={modalStore.ASubCourseModalStatus} centered onHide={modalStore.ASubCourseModalClose}>
            <Modal.Header>
                <Modal.Title>Вход</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close" onClick={modalStore.ASubCourseModalClose}/>
            </Modal.Header>
            <Modal.Body>
                Privetik =)
            </Modal.Body>
        </Modal>
    )
}))


export default ASubCourseAddModal;
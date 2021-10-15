import React from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";

const ASubCourseAddModal = inject('userStore', 'modalStore')(observer((stores) => {
    const {modalStore} = stores;

    return (
        <Modal show={modalStore.ASubCourseModalStatus} centered onHide={modalStore.ASubCourseModalClose}>
            <Modal.Header>
                <Modal.Title>Добавление подкурса</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close" onClick={modalStore.ASubCourseModalClose}/>
            </Modal.Header>
            <Modal.Body>
                Privetik :)
            </Modal.Body>
        </Modal>
    )
}))


export default ASubCourseAddModal;
import React, {useEffect, useMemo} from "react";
import {inject, observer} from "mobx-react";
import Modal from "react-bootstrap/Modal";
import Select from 'react-select'
import {useForm} from "react-hook-form";

const AMentorAddModal = inject('userStore', 'modalStore', 'loginStore', 'amentorStore', 'acourseStore')(observer((stores) => {
    const {modalStore, amentorStore, acourseStore} = stores;
    const {handleSubmit} = useForm();

    useEffect(() => {
        if (modalStore.AMentorAddModalStatus) {
            amentorStore.loadMentorsList()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalStore.AMentorAddModalStatus])

    const optionMentors = useMemo(() => (amentorStore.mentorsList.map(item => ({
        value: item?.id,
        label: `${item?.lastName} ${item?.firstName}`
    }))), [amentorStore.mentorsList])

    const onSubmitAdd = () => {
        acourseStore.loadMentorAdd(acourseStore.courseID, amentorStore.mentorID)
        modalStore.AMentorAddModalClose()
    }


    return (
        <Modal show={modalStore.AMentorAddModalStatus} centered onHide={modalStore.AMentorAddModalClose}>
            <Modal.Header>
                <Modal.Title>Добавление наставника</Modal.Title>
                <button type="button" className="btn-close" aria-label="Close"
                        onClick={modalStore.AMentorAddModalClose}/>
            </Modal.Header>
            <Modal.Body>
                <form className={'d-flex flex-column'} onSubmit={handleSubmit(onSubmitAdd)}>
                    <div className={'mb-3'}>
                        <Select placeholder={'Выберите наставника'} options={optionMentors} onChange={(data) => {amentorStore.setMentorID(data?.value)}}/>
                    </div>
                    <button type="submit" className="btn btn-dark">Добавить</button>
                </form>
            </Modal.Body>
        </Modal>
    )
}))


export default AMentorAddModal;
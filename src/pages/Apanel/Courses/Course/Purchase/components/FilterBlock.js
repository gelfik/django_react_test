import React from "react";
import {inject, observer} from "mobx-react";
import {FloatingLabel, Form} from "react-bootstrap";

const FilterBlock = inject('userStore', 'modalStore', 'acourseStore', 'apurchaseStore')(observer((store) => {
    const {acourseStore, apurchaseStore} = store

    const getItemGroupName = () => {
        return acourseStore?.courseData?.subCourses?.map((item, i) =>
            <option key={i} value={item.id}>{item.name}</option>
        )
    }

    return (
        <div className={'row pb-3'}>
            <div className="col-lg-8 col-12">
                <FloatingLabel controlId="floatingSelectPurchase" label="Поиск">
                    <Form.Control placeholder="name@example.com, username, имя, фамилия" onChange={e => {
                        apurchaseStore.setFilterRequest('search', e.target.value)
                    }}/>
                </FloatingLabel>
            </div>
            <div className="col-lg-4 col-12">
                <FloatingLabel controlId="floatingSelectSubCourseName" label="Подкурс">
                    <Form.Select aria-label="Выберите подкурс" onChange={e => {
                        apurchaseStore.setFilterRequest('courseSub', e.target.value)
                    }}>
                        <option value={'Все подкурсы'}>Все подкурсы</option>
                        {getItemGroupName()}
                    </Form.Select>
                </FloatingLabel>
            </div>
        </div>
    )
}))

export default FilterBlock;
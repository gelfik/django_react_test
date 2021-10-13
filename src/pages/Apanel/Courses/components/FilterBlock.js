import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {FloatingLabel, Form} from "react-bootstrap";

const FilterBlock = inject('userStore', 'acoursesListStore', 'modalStore')(observer((store) => {
    const {acoursesListStore, modalStore} = store
    const [selectorDefault, setSelectorDefault] = useState({})

    function useQuery() {
        return new URLSearchParams(window.location.search);
    }

    let query = useQuery().get('type');

    useEffect(() => {
        if (query) {
            acoursesListStore.setFilterRequest('type', query)
            setSelectorDefault({value: query})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (acoursesListStore.filterData.length === 0) {
            acoursesListStore.loadFilterData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [acoursesListStore.filterData])


    const getItemCourseName = () => {
        return acoursesListStore?.filterData?.courseType?.map((item, i) =>
            <option key={i} value={item.name}>{item.name}</option>
        )
    }

    const getItemPredmet = () => {
        return acoursesListStore?.filterData?.predmet?.map((item, i) =>
            <option key={i} value={item.name}>{item.name}</option>
        )
    }

    const getItemExameType = () => {
        return acoursesListStore?.filterData?.examType?.map((item, i) =>
            <option key={i} value={item.name}>{item.name}</option>
        )
    }

    return (
        <div className={'row pb-3'}>
            <div className="col-lg-3 col-12">
                <FloatingLabel controlId="floatingSelectCourseName" label="Курс">
                    <Form.Select {...selectorDefault} aria-label="Выберите курс" onChange={e => {
                        acoursesListStore.setFilterRequest('type', e.target.value)
                    }}>
                        <option value={'Все курсы'}>Все курсы</option>
                        {getItemCourseName()}
                    </Form.Select>
                </FloatingLabel>
            </div>
            <div className="col-lg-3 col-12">
                <FloatingLabel controlId="floatingSelectPredmet" label="Предмет">
                    <Form.Select aria-label="Выберите предмет" onChange={e => {
                        acoursesListStore.setFilterRequest('predmet', e.target.value)
                    }}>
                        <option value={'Все предметы'}>Все предметы</option>
                        {getItemPredmet()}
                    </Form.Select>
                </FloatingLabel>
            </div>
            <div className="col-lg-2 col-12">
                <FloatingLabel controlId="floatingSelectExameType" label="Экзамен">
                    <Form.Select aria-label="Выберите экзамен" onChange={e => {
                        acoursesListStore.setFilterRequest('exam', e.target.value)
                    }}>
                        <option value={'Все экзамены'}>Все экзамены</option>
                        {getItemExameType()}
                    </Form.Select>
                </FloatingLabel>
            </div>
            <div className="col-lg-2 col-12">
                <FloatingLabel controlId="floatingSelectDraft" label="Статус">
                    <Form.Select aria-label="Выберите статус" onChange={e => {
                        acoursesListStore.setFilterRequest('draft', e.target.value)
                    }}>
                        <option value={undefined}>Все статусы</option>
                        <option value={true}>Черновик</option>
                        <option value={false}>Опубликован</option>
                    </Form.Select>
                </FloatingLabel>
            </div>
            <div className="col-lg-2 col-12">
                <button className={'btn btn-dark ButtonCentered'} onClick={modalStore.CourseAddModalShow}>Добавить курс</button>
            </div>
        </div>
    )
}))

export default FilterBlock;
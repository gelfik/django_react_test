import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {FloatingLabel, Form} from "react-bootstrap";

const FilterBlock = inject('userStore', 'aprogressesListStore')(observer((store) => {
    const {aprogressesListStore} = store
    const [selectorDefault, setSelectorDefault] = useState({})

    function useQuery() {
        return new URLSearchParams(window.location.search);
    }

    let query = useQuery().get('type');

    useEffect(() => {
        if (query) {
            aprogressesListStore.setFilterRequest('type', query)
            setSelectorDefault({value: query})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (aprogressesListStore.filterData.length === 0) {
            aprogressesListStore.loadFilterData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aprogressesListStore.filterData])


    const getItemCourseName = () => {
        return aprogressesListStore?.filterData?.courseType?.map((item, i) =>
            <option key={i} value={item.name}>{item.name}</option>
        )
    }

    const getItemPredmet = () => {
        return aprogressesListStore?.filterData?.predmet?.map((item, i) =>
            <option key={i} value={item.name}>{item.name}</option>
        )
    }

    const getItemExameType = () => {
        return aprogressesListStore?.filterData?.examType?.map((item, i) =>
            <option key={i} value={item.name}>{item.name}</option>
        )
    }

    return (
        <div className={'row pb-3'}>
            <div className="col-lg-3 col-12">
                <FloatingLabel controlId="floatingSelectCourseName" label="Курс">
                    <Form.Select {...selectorDefault} aria-label="Выберите курс" onChange={e => {
                        aprogressesListStore.setFilterRequest('type', e.target.value)
                    }}>
                        <option value={'Все курсы'}>Все курсы</option>
                        {getItemCourseName()}
                    </Form.Select>
                </FloatingLabel>
            </div>
            <div className="col-lg-3 col-12">
                <FloatingLabel controlId="floatingSelectPredmet" label="Предмет">
                    <Form.Select aria-label="Выберите предмет" onChange={e => {
                        aprogressesListStore.setFilterRequest('predmet', e.target.value)
                    }}>
                        <option value={'Все предметы'}>Все предметы</option>
                        {getItemPredmet()}
                    </Form.Select>
                </FloatingLabel>
            </div>
            <div className="col-lg-3 col-12">
                <FloatingLabel controlId="floatingSelectExameType" label="Экзамен">
                    <Form.Select aria-label="Выберите экзамен" onChange={e => {
                        aprogressesListStore.setFilterRequest('exam', e.target.value)
                    }}>
                        <option value={'Все экзамены'}>Все экзамены</option>
                        {getItemExameType()}
                    </Form.Select>
                </FloatingLabel>
            </div>
            <div className="col-lg-3 col-12">
                <FloatingLabel controlId="floatingSelectDraft" label="Статус">
                    <Form.Select aria-label="Выберите статус" onChange={e => {
                        aprogressesListStore.setFilterRequest('draft', e.target.value)
                    }}>
                        <option value={undefined}>Все статусы</option>
                        <option value={true}>Черновик</option>
                        <option value={false}>Опубликован</option>
                    </Form.Select>
                </FloatingLabel>
            </div>
        </div>
    )
}))

export default FilterBlock;
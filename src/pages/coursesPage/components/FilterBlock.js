import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import {FloatingLabel, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import { Redirect } from 'react-router';

const FilterBlock = inject('userStore', 'coursesPageStore')(observer((store) => {
    const {coursesPageStore} = store

    function useQuery() {
        return new URLSearchParams(window.location.search);
    }

    let query = useQuery().get('type');

    useEffect(() => {
        if (query) {
            coursesPageStore.setFilterRequest('type', query)
        }
    }, []);

    useEffect(() => {
        if (coursesPageStore.filterData.length === 0) {
            coursesPageStore.loadFilterData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coursesPageStore.filterData])


    const getItemCourseName = () => {
        return coursesPageStore?.filterData?.courseType?.map((item, i) =>
            <option key={i} value={item}>{item}</option>
        )
    }

    const getItemPredmet = () => {
        return coursesPageStore?.filterData?.predmet?.map((item, i) =>
            <option key={i} value={item}>{item}</option>
        )
    }

    const getItemExameType = () => {
        return coursesPageStore?.filterData?.examType?.map((item, i) =>
            <option key={i} value={item}>{item}</option>
        )
    }

    return (
        <div className={'row pb-3'}>
            <div className="col-lg-4 col-12">
                <FloatingLabel controlId="floatingSelectCourseName" label="Курс">
                    <Form.Select value={query && query} aria-label="Выберите курс" onChange={e => {
                        coursesPageStore.setFilterRequest('type', e.target.value)
                    }}>
                        <option value={'Все курсы'}>Все курсы</option>
                        {getItemCourseName()}
                    </Form.Select>
                </FloatingLabel>
            </div>
            <div className="col-lg-4 col-12">
                <FloatingLabel controlId="floatingSelectPredmet" label="Предмет">
                    <Form.Select aria-label="Выберите предмет" onChange={e => {
                        coursesPageStore.setFilterRequest('predmet', e.target.value)
                    }}>
                        <option value={'Все предметы'}>Все предметы</option>
                        {getItemPredmet()}
                    </Form.Select>
                </FloatingLabel>
            </div>
            <div className="col-lg-4 col-12">
                <FloatingLabel controlId="floatingSelectExameType" label="Экзамен">
                    <Form.Select aria-label="Выберите экзамен" onChange={e => {
                        coursesPageStore.setFilterRequest('exam', e.target.value)
                    }}>
                        <option value={'Все экзамены'}>Все экзамены</option>
                        {getItemExameType()}
                    </Form.Select>
                </FloatingLabel>
            </div>
        </div>
    )
}))

export default FilterBlock;
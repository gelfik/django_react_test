import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {FloatingLabel, Form} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const FilterBlock = inject('userStore', 'coursesPageStore')(observer((store) => {
    const {coursesPageStore} = store

    const [selectorDefault, setSelectorDefault] = useState({})

    function useQuery() {
        return new URLSearchParams(window.location.search);
    }

    let query = useQuery().get('type');
    let history = useHistory();

    useEffect(() => {
        if (query) {
            coursesPageStore.setFilterRequest('type', query)
            setSelectorDefault({value: query})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <Form.Select {...selectorDefault} aria-label="Выберите курс" onChange={e => {
                        coursesPageStore.setFilterRequest('type', e.target.value)
                        if (query) {
                            query = undefined
                            history.push('/courses')
                            // history.replace('/courses')
                        }
                        if (coursesPageStore?.filterRequest?.type) {
                            setSelectorDefault({value: coursesPageStore?.filterRequest?.type})
                        }
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
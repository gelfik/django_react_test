import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {FloatingLabel, Form} from "react-bootstrap";

const FilterBlock = inject('userStore', 'coursesPageStore')(observer((store) => {
    const {coursesPageStore} = store
    const [activeCourseName, setCourseName] = useState('Все курсы')
    const [activePredmet, setPredmet] = useState('Все экзамены')
    const [activeExameType, setExameType] = useState('Все предметы')


    useEffect(() => {
        if (coursesPageStore.filterData.length === 0) {
            coursesPageStore.loadFilterData()
        }
    }, [coursesPageStore.filterData])

    // useEffect(() => {
    //     console.log(activeCourseName, activePredmet, activeExameType)
    // }, [activeCourseName, activePredmet, activeExameType])

    const getItemCourseName = () => {
        return coursesPageStore?.filterData?.courseName?.map((item, i) =>
            <option key={i} value={item.name}>{item.name}</option>
        )
    }

    const getItemPredmet = () => {
        return coursesPageStore?.filterData?.predmet?.map((item, i) =>
            <option key={i} value={item.name}>{item.name}</option>
        )
    }

    const getItemExameType = () => {
        return coursesPageStore?.filterData?.examType?.map((item, i) =>
            <option key={i} value={item.name}>{item.name}</option>
        )
    }

    return (

        <div className={'row pb-3'}>
            <div className="col-lg-4 col-12">
                <FloatingLabel controlId="floatingSelectCourseName" label="Курс">
                    <Form.Select aria-label="Выберите курс" onChange={e => {
                        coursesPageStore.setFilterRequest('type', e.target.value)
                    }} defaultValue={'Все курсы'}>
                        <option value={'Все курсы'} selected={true}>Все курсы</option>
                        {getItemCourseName()}
                    </Form.Select>
                </FloatingLabel>
            </div>
            <div className="col-lg-4 col-12">
                <FloatingLabel controlId="floatingSelectPredmet" label="Предмет">
                    <Form.Select aria-label="Выберите предмет" onChange={e => {
                       coursesPageStore.setFilterRequest('predmet', e.target.value)
                    }} defaultValue={'Все предметы'}>
                        <option value={'Все предметы'} selected={true}>Все предметы</option>
                        {getItemPredmet()}
                    </Form.Select>
                </FloatingLabel>
            </div>
            <div className="col-lg-4 col-12">
                <FloatingLabel controlId="floatingSelectExameType" label="Экзамен">
                    <Form.Select aria-label="Выберите экзамен" onChange={e => {
                        coursesPageStore.setFilterRequest('exam', e.target.value)
                    }} defaultValue={'Все экзамены'}>
                        <option value={'Все экзамены'} selected={true}>Все экзамены</option>
                        {getItemExameType()}
                    </Form.Select>
                </FloatingLabel>
            </div>
        </div>
    )
}))

export default FilterBlock;
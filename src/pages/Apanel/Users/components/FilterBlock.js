import React from "react";
import {inject, observer} from "mobx-react";
import {FloatingLabel, Form} from "react-bootstrap";

const FilterBlock = inject('userStore', 'ausersListStore', 'modalStore')(observer((store) => {
    const {ausersListStore} = store

    // useEffect(() => {
    //     if (ausersListStore.filterData.length === 0) {
    //         ausersListStore.loadFilterData()
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [ausersListStore.filterData])


    const getItemGroupName = () => {
        return ausersListStore?.groupListData?.groupData?.map((item, i) =>
            <option key={i} value={item.name}>{item.name}</option>
        )
    }

    return (
        <div className={'row pb-3'}>
            <div className="col-lg-8 col-12">
                <FloatingLabel controlId="floatingSelectCourseName" label="Поиск">
                    <Form.Control type="email" placeholder="name@example.com, username, имя, фамилия" onChange={e => {
                        ausersListStore.setFilterRequest('search', e.target.value)
                    }}/>
                </FloatingLabel>
            </div>
            <div className="col-lg-4 col-12">
                <FloatingLabel controlId="floatingSelectCourseName" label="Роль">
                    <Form.Select aria-label="Выберите роль" onChange={e => {
                        ausersListStore.setFilterRequest('role', e.target.value)
                    }}>
                        <option value={'Все роли'}>Все роли</option>
                        {getItemGroupName()}
                    </Form.Select>
                </FloatingLabel>
            </div>
        </div>
    )
}))

export default FilterBlock;
import React from "react";
import {Pagination} from 'react-bootstrap'
import {inject, observer} from "mobx-react";

const PaginationBlock_Old = inject('userStore', 'ausersListStore')(observer((store) => {
    const {ausersListStore} = store

    const getPrevious = () => {
        if (ausersListStore?.usersData?.previous) return <Pagination.Prev
            onClick={() => ausersListStore.setFilterRequest('page', ausersListStore.filterRequest['page'] - 1)}/>
        else return <Pagination.Prev disabled/>
    }

    const getNext = () => {
        if (ausersListStore?.usersData?.next) return <Pagination.Next
            onClick={() => ausersListStore.setFilterRequest('page', ausersListStore.filterRequest['page'] + 1)}/>
        else return <Pagination.Next disabled/>
    }


    const getFirst = () => {
        if ((ausersListStore?.usersData?.count > 1) && (1 !== ausersListStore.filterRequest['page'])) return <Pagination.First
            onClick={() => ausersListStore.setFilterRequest('page', 1)}/>
        else return <Pagination.First disabled/>
    }

    const getLast = () => {
        if ((ausersListStore?.usersData?.count > 1) && (ausersListStore?.usersData?.count !== ausersListStore.filterRequest['page'])) return <Pagination.Last
            onClick={() => ausersListStore.setFilterRequest('page', ausersListStore?.usersData?.count)}/>
        else return <Pagination.Last disabled/>
    }

    const getItemExameType = () => {
        let page_count = 5
        let data = []

        if (ausersListStore?.usersData?.count <= page_count) {
            page_count = ausersListStore?.usersData?.count
        }
        let step
        for (step = 1; step <= page_count; step++) {
            data.push(step);
        }
        return data?.map((item, i) =>
                <Pagination.Item className={`${item === ausersListStore?.usersData?.curent && 'active'}`}
                                 onClick={() => ausersListStore.setFilterRequest('page', item)}>{item}</Pagination.Item>
            // <li key={i} className={`page-item ${item === ausersListStore?.usersData?.curent && 'active'}`}
            //     onClick={() => ausersListStore.setFilterRequest('page', item)}>
            //     <div className="page-link">{item}</div>
            // </li>
        )
    }

    const getPaginationBlock = () => {
        if (ausersListStore?.usersData?.count > 1) {

            return <Pagination className={'justify-content-center'}>
                {getFirst()}
                {getPrevious()}
                {getItemExameType()}
                {getNext()}
                {getLast()}
            </Pagination>
            // return <nav aria-label="Page navigation example">
            //     <ul className="pagination justify-content-center">
            //         {getFirst()}
            //         {getPrevious()}
            //         {getItemExameType()}
            //         {getNext()}
            //         {getLast()}
            //     </ul>
            // </nav>
        }
    }
    return (
        <>{getPaginationBlock()}</>
    )
}))

export default PaginationBlock_Old;
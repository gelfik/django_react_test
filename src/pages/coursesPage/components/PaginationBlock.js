import React from "react";
import {inject, observer} from "mobx-react";

const PaginationBlock = inject('userStore', 'coursesPageStore')(observer((store) => {
    const {coursesPageStore} = store

    const getPrevious = () => {
        if (coursesPageStore?.coursesData?.previous) {
            return <li className="page-item"
                       onClick={() => coursesPageStore.setFilterRequest('page', coursesPageStore.filterRequest['page'] - 1)}>
                <div className="page-link" aria-label="Previous">
                    <span aria-hidden="true">‹</span>
                </div>
            </li>
        }
    }

    const getNext = () => {
        if (coursesPageStore?.coursesData?.next) {
            return <li className="page-item"
                       onClick={() => coursesPageStore.setFilterRequest('page', coursesPageStore.filterRequest['page'] + 1)}>
                <div className="page-link" aria-label="Next">
                    <span aria-hidden="true">›</span>
                </div>
            </li>
        }
    }


    const getFirst = () => {
        if ((coursesPageStore?.coursesData?.count > 1) && (1 !== coursesPageStore.filterRequest['page'])) {
            return <li className="page-item" onClick={() => coursesPageStore.setFilterRequest('page', 1)}>
                <div className="page-link" aria-label="First">
                    <span aria-hidden="true">«</span>
                </div>
            </li>
        }
    }

    const getLast = () => {
        if ((coursesPageStore?.coursesData?.count > 1) && (coursesPageStore?.coursesData?.count !== coursesPageStore.filterRequest['page'])) {
            return <li className="page-item"
                       onClick={() => coursesPageStore.setFilterRequest('page', coursesPageStore?.coursesData?.count)}>
                <div className="page-link" aria-label="Last">
                    <span aria-hidden="true">»</span>
                </div>
            </li>
        }
    }

    const getItemExameType = () => {
        let page_count = 5
        let data = []

        if (coursesPageStore?.coursesData?.count <= page_count) {
            page_count = coursesPageStore?.coursesData?.count
        }
        let step
        for (step = 1; step <= page_count; step++) {
            data.push(step);
        }
        return data?.map((item, i) =>
            <li key={i} className={`page-item ${item===coursesPageStore?.coursesData?.curent && 'active'}`} onClick={() => coursesPageStore.setFilterRequest('page', item)}>
                <div className="page-link">{item}</div>
            </li>
        )
    }

    const getPaginationBlock = () => {
        if (coursesPageStore?.coursesData?.count > 1) {
            return <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                    {getFirst()}
                    {getPrevious()}
                    {getItemExameType()}
                    {getNext()}
                    {getLast()}
                </ul>
            </nav>
        }
    }
    return (
        <>{getPaginationBlock()}</>
    )
}))

export default PaginationBlock;
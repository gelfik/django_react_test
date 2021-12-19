import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Spinner from "../../../../../../components/Spinner";
import {Col, Row} from "react-bootstrap";
import {Link, useParams} from "react-router-dom";

const PurchaseBlock = inject('userStore', 'apurchaseStore', 'acourseStore', 'apurManageStore')(observer((store) => {
    const {apurchaseStore, acourseStore, apurManageStore} = store

    const queryParams = useParams()

    useEffect(() => {
        if (!apurchaseStore.spinner.spinnerStatus) {
            apurchaseStore.loadFilterRequest(acourseStore.courseID)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apurchaseStore.filterRequest])

    const getPurchaseList = () => {
        if (apurchaseStore?.purchaseListData?.length === 0) {
            return <div className="display-6">
                Покупатели не найдены!
            </div>
        }
        return <>{getItemPurchase()}</>
    }

    const getItemPurchase = () => {
        return apurchaseStore?.purchaseListData?.map((item, i) =>
            <Col md={4} key={i}>
                {/*<div className="UsersList__Item"  onClick={modalStore.APurchaseManagementModalShow}>*/}
                <Link to={`/apanel/course${queryParams?.courseID}/purchase${item?.id}/management`} className="UsersList__Item">
                    <div className="UsersList__Item__Content">
                        <div className="UsersList__Item__Wrapper">
                            <div className="UsersList__Item__Data" onClick={() => apurManageStore.setPurchase(item)}>
                                <div className="UsersList__Item__Avatar">
                                    <img src={item?.user?.avatar?.file?.small}
                                         alt={`${item?.user?.lastName} ${item?.user?.firstName}`}/>
                                </div>
                                <div className="UsersList__Item__Title">
                                    <div className="UsersList__Item__Title__Name">{item?.user?.lastName} {item?.user?.firstName}</div>
                                    <div className="UsersList__Item__Title__Links">
                                        <a href={item?.user?.vkLink}
                                           rel="noreferrer"
                                           className={"UsersList__Item__Title__Links__Button"}
                                           target="_blank">
                                            <svg aria-hidden="true" height="20" width="20">
                                                <use xlinkHref={'#icon-vk-2'}/>
                                            </svg>
                                            <p> перейти</p>
                                        </a>
                                    </div>
                                    {/*<div className="Chips">*/}
                                    {/*    {item?.user?.username && <div className="Chips__Item">*/}
                                    {/*        {item?.user?.username}*/}
                                    {/*    </div>}*/}
                                    {/*    {item?.user?.email && <div className="Chips__Item">*/}
                                    {/*        {item?.user?.email}*/}
                                    {/*    </div>}*/}
                                    {/*    {item?.user?.phone && <div className="Chips__Item">*/}
                                    {/*        {item?.user?.phone}*/}
                                    {/*    </div>}*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                {/*</div>*/}
            </Col>
        )
    }
    // {coursesPageStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : <CourseBlock/>}

    return (
        <div className="UsersList">
            <Row>
                {apurchaseStore.spinner.spinnerStatus ? <Spinner type={'local'}/> : getPurchaseList()}
            </Row>
        </div>
    )
}))

export default PurchaseBlock;
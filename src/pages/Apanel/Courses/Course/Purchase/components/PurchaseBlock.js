import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import Spinner from "../../../../../../components/Spinner";
import {Col, Row} from "react-bootstrap";

const PurchaseBlock = inject('userStore', 'apurchaseStore', 'acourseStore')(observer((store) => {
    const {apurchaseStore, acourseStore} = store


    useEffect(() => {
        if (!apurchaseStore.spinner.spinnerStatus) {
            apurchaseStore.loadFilterRequest(acourseStore.courseID)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apurchaseStore.filterRequest])

    const getPurchaseList = () => {
        if (apurchaseStore?.purchaseData?.length === 0) {
            return <div className="display-6">
                Покупатели не найдены!
            </div>
        }
        return <>{getItemPurchase()}</>
    }

    const getItemPurchase = () => {
        return apurchaseStore?.purchaseData?.map((item, i) =>
            <Col md={6}>
                <div className="UsersList__Item" key={i}>
                    <div className="UsersList__Item__Content">
                        <div className="UsersList__Item__Wrapper">
                            <Link className="UsersList__Item__Data" to={`/apanel/users/user${item?.user?.id}`}>
                                <div className="UsersList__Item__Avatar">
                                    <img src={item?.user?.avatar?.file?.small}
                                         alt={`${item?.user?.lastName} ${item?.user?.firstName}`}/>
                                </div>
                                <div className="UsersList__Item__Title">
                                    <p>{item?.user?.lastName} {item?.user?.firstName}</p>
                                    <div className="Chips">
                                        {item?.user?.username && <div className="Chips__Item">
                                            {item?.user?.username}
                                        </div>}
                                        {item?.user?.email && <div className="Chips__Item">
                                            {item?.user?.email}
                                        </div>}
                                        {item?.user?.phone && <div className="Chips__Item">
                                            {item?.user?.phone}
                                        </div>}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
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
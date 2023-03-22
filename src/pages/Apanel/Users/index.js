import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import ComandBlock from "../components/ComandBlock";
import FilterBlock from "./components/FilterBlock";
import UsersBlock from "./components/UsersBlock";
import PaginationBlock from "./components/PaginationBlock";

const ApanelUsersPage = inject('userStore', 'ausersListStore')(observer((store) => {
    const {ausersListStore} = store

    useEffect(() => {
        document.body.className = 'bg-light min-vh-100'
        window.scrollTo(0, 0)
    }, []);


    useEffect(() => {
        if (!ausersListStore.spinner.spinnerStatus) {
            ausersListStore.loadFilterRequest()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ausersListStore.filterRequest])


    return (
        <main className={'mt_navbar bg-content'}>
            <section className="ContainerContent">
                <div className="APanel">
                    <div className="Navigation-Wrapper">
                        <ComandBlock/>
                    </div>
                    <div className="Content-Wrapper">
                        <FilterBlock/>
                        <UsersBlock/>
                        <PaginationBlock/>
                    </div>
                </div>
            </section>
        </main>
    )
}))

export default ApanelUsersPage;
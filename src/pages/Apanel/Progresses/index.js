import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import ComandBlock from "../components/ComandBlock";
import FilterBlock from "./components/FilterBlock";
import CoursesBlock from "./components/CoursesBlock";

const ApanelProgressesPage = inject('userStore', 'aprogressesListStore')(observer((store) => {
    const {aprogressesListStore} = store

    useEffect(() => {
        document.body.className = 'bg-light min-vh-100'
        window.scrollTo(0, 0)
    }, []);


    useEffect(() => {
        if (!aprogressesListStore.spinner.spinnerStatus) {
            aprogressesListStore.loadFilterRequest()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [aprogressesListStore.filterRequest])


    return (
        <main className={'mt_navbar bg-content'}>
            <section className="ContainerContent">
                <div className="APanel">
                    <div className="Navigation-Wrapper">
                        <ComandBlock/>
                    </div>
                    <div className="Content-Wrapper">
                        <FilterBlock/>
                        <CoursesBlock/>
                    </div>

                </div>
            </section>
        </main>
    )
}))

export default ApanelProgressesPage;
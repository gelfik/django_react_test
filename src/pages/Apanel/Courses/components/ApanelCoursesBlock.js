import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import FilterBlock from "./FilterBlock";
import CoursesBlock from "./CoursesBlock";

const ApanelCoursesBlock = inject('userStore', 'acoursesStore')(observer((store) => {
    const {acoursesStore} = store


    useEffect(() => {
        if (!acoursesStore.spinner.spinnerStatus) {
            acoursesStore.loadFilterRequest()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [acoursesStore.filterRequest])

    return (
        <div className="Navigation-Wrapper">
            <FilterBlock/>
            <CoursesBlock/>
        </div>
    )
}))

export default ApanelCoursesBlock;
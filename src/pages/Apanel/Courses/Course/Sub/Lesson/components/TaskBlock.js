import React from "react";
import {inject, observer} from "mobx-react";
import {Accordion} from "react-bootstrap";
// import Moment from "moment";

const TaskBlock = inject('userStore', 'alessonStore')(observer((store) => {
    const {alessonStore} = store

    // const getTime = (date) => {
    //     return  Moment(date, "YYYY-MM-DDTH:m").format("DD-MM-YYYY HH:mm")
    // }

    return (<>
        <div className="LessonList__Right__Data__Title">
            {alessonStore.lessonData?.taskABC?.name}
        </div>
        {alessonStore.lessonData?.taskABC?.description &&
        <div style={{marginBottom:24}} className="LessonList__Right__Data__Description">
            {alessonStore.lessonData?.taskABC?.description}
        </div>}
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>Проверить задания</Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </>)
}))

export default TaskBlock;
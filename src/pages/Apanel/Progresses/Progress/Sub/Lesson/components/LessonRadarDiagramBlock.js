import React from "react";
import {inject, observer} from "mobx-react";
import RadarDiagramBlock from "../../../components/RadarDiagramBlock";

const LessonRadarDiagramBlock = inject('userStore', 'aprogressLessonStore')(observer((store) => {
    const {aprogressLessonStore} = store

    return (
        <>
            {aprogressLessonStore?.lessonData?.userProgress?.length > 0 ? <RadarDiagramBlock list={aprogressLessonStore?.lessonData?.userProgress}/> :
                <div className="display-6">
                    Еще никто не прошел тестирование по данному занятию
                </div>}
        </>
    )
}))


export default LessonRadarDiagramBlock;
import React from "react";
import {inject, observer} from "mobx-react";
import RadarDiagramBlock from "../../../components/RadarDiagramBlock";

const LessonRadarDiagramBlock = inject('userStore', 'progressLessonStore')(observer((store) => {
    const {progressLessonStore} = store

    return (
        <>
            {progressLessonStore?.lessonData?.userProgress ? <RadarDiagramBlock item={progressLessonStore?.lessonData?.userProgress}/> :
                <div className="display-6">
                    Вы ещё не прошли тестирование по данному занятию
                </div>}
        </>
    )
}))


export default LessonRadarDiagramBlock;
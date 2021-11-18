import React, {useRef} from "react";
import {inject, observer} from "mobx-react";
import YouTube from 'react-youtube';

const LectureBlock = inject('userStore', 'alessonStore', 'acourseStore', 'asubCourseStore')(observer((store) => {
    const {alessonStore, acourseStore, asubCourseStore} = store
    const fileRef = useRef();

    const loadfile = event => {
        const files = event.target.files;
        const oneFile = files[0];
        const formData = new FormData();

        formData.append('file', oneFile);

        alessonStore.loadLectureFileAdd(formData, acourseStore.courseID, asubCourseStore.subCourseID).then(r => {
            if (alessonStore.response?.status) {
                alessonStore.loadLessonData(acourseStore.courseID, asubCourseStore.subCourseID, alessonStore.lessonID)
                alert.success(alessonStore.response?.detail)
            } else alert.error(alessonStore.response?.detail)
        })
    }

    const getItemFiles = (fileList) => {
        return fileList?.map((item, i) =>
            <p key={i}>
                <a href={`${item.file}`} rel="noreferrer" target="_blank">{item.name}</a>
            </p>
        )
    }

    const InputFileLoad = () => {
        return <label htmlFor={'fileLoadInput'}>
            <p>
                <span>добавить файл</span>
            </p>
            <input type="file" accept=".png,.jpg,.jpeg, .pdf, .doc, .docx, .xlsx, .xls"
                   name={'file'} id={'fileLoadInput'}
                   multiple={false}
                   className={'fileLoadInput'} ref={fileRef} onChange={loadfile}/>
        </label>
    }

    return (<>
        <div className="LessonList__Right__Data__Title">
            {alessonStore.lessonData?.lecture?.name}
        </div>
        {alessonStore.lessonData?.lecture?.video &&
        <div className="LessonList__Right__Data__Video">
            <div className="LessonList__Right__Data__Video__Box">
                <YouTube videoId={`${alessonStore.lessonData?.lecture?.video}`}/>
            </div>
        </div>}
        <div className="LessonList__Right__Data__File">
            {alessonStore.lessonData?.lecture?.files?.length === 0 &&
            InputFileLoad()
            }
            {alessonStore.lessonData?.lecture?.files?.length !== 0 && <>
                {getItemFiles(alessonStore.lessonData?.lecture?.files)}
                {InputFileLoad()}
            </>}
        </div>
        {alessonStore.lessonData?.lecture?.description &&
        <div className="LessonList__Right__Data__Description">
            {alessonStore.lessonData?.lecture?.description}
        </div>}
    </>)
}))

export default LectureBlock;
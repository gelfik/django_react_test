import React, {useRef} from "react";
import {inject, observer} from "mobx-react";
import {useAlert} from "react-alert";
import {Form} from "react-bootstrap";

const TaskBlock = inject('userStore', 'lessonStore', 'courseStore', 'subCourseStore')(observer((store) => {
    const {lessonStore, courseStore, subCourseStore} = store
    const fileRef = useRef();
    const alert = useAlert();

    const loadfile = event => {
        const files = event.target.files;
        const oneFile = files[0];
        const formData = new FormData();

        formData.append('file', oneFile);

        lessonStore.loadLectureFileAdd(formData, courseStore.courseID, subCourseStore.subCourseID).then(r => {
            if (lessonStore.response?.status) {
                lessonStore.loadLessonData(courseStore.courseID, subCourseStore.subCourseID, lessonStore.lessonID)
                alert.success(lessonStore.response?.detail)
            } else alert.error(lessonStore.response?.detail)
        })
    }

    // const getItemFiles = (fileList) => {
    //     return fileList?.map((item, i) =>
    //         <p key={i}>
    //             <a href={`${item.file}`} rel="noreferrer" target="_blank">{item.name}</a>
    //         </p>
    //     )
    // }

    const InputFileLoad = () => {
        return <label htmlFor={'fileLoadInput'}>
            {/*<p style={{display: 'inline-block'}}>*/}
            {/*    <span>добавить файл</span>*/}
            {/*</p>*/}
            {/*<input type="file" accept=".png,.jpg,.jpeg, .pdf, .doc, .docx, .xlsx, .xls"*/}
            {/*       name={'file'} id={'fileLoadInput'}*/}
            {/*       multiple={false}*/}
            {/*       className={'fileLoadInput'} ref={fileRef} onChange={loadfile}/>*/}

            <Form.Group controlId="fileLoadInput" className="mb-3">
                <Form.Label>Загрузите файл с ответом на задание:</Form.Label>
                <Form.Control type="file" name={'file'} id={'fileLoadInput'} ref={fileRef} onChange={loadfile}/>
            </Form.Group>
        </label>
    }

    return (<>
        <div className="LessonList__Right__Data__Title">
            {lessonStore.lessonData?.taskABC?.name}
        </div>
        {lessonStore.lessonData?.taskABC?.description &&
        <div className="LessonList__Right__Data__Description">
            {lessonStore.lessonData?.taskABC?.description}
        </div>}
        <div className="LessonList__Right__Data__File">

            {/*InputFileLoad()*/}
            {/*{getItemFiles(lessonStore.lessonData?.lecture?.files)}*/}
            {InputFileLoad()}
        </div>
    </>)
}))

export default TaskBlock;
import React, {useRef} from "react";
import {inject, observer} from "mobx-react";
import {useAlert} from "react-alert";
import {Form} from "react-bootstrap";
import {useParams} from "react-router-dom";
import ErrorAlert from "../../../../../../components/ErrorAlert";

const TaskBlock = inject('userStore', 'lessonStore')(observer((store) => {
    const {lessonStore} = store
    const fileRef = useRef();
    const queryParams = useParams()
    const alert = useAlert()

    const loadfile = event => {
        const files = event.target.files;
        const oneFile = files[0];
        const formData = new FormData();

        // formData.append('file', oneFile);
        formData.append('file', oneFile);
        formData.append('testType', lessonStore.lessonType);
        lessonStore.loadTaskFile(formData, queryParams?.purchaseID, queryParams?.subID).then(r => {
            if (lessonStore.response?.status) {
                alert.success(lessonStore.response?.error)
            } else alert.error(lessonStore.response?.error)
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
                <Form.Label>Загрузите файл с решением лабораторной работы:</Form.Label>
                <Form.Control type="file" name={'file'} ref={fileRef} onChange={loadfile}/>
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
            {lessonStore?.response && lessonStore?.response['error'] &&
            <ErrorAlert error={lessonStore?.response['error']}/>}
            {lessonStore?.response && lessonStore?.response['detail'] &&
            <ErrorAlert error={lessonStore?.response['detail']}/>}
            {lessonStore?.response && lessonStore?.response['file'] &&
            <p className={'custom-alert-danger-text'}>{lessonStore?.response['file']}</p>}
            {InputFileLoad()}
        </div>
    </>)
}))

export default TaskBlock;

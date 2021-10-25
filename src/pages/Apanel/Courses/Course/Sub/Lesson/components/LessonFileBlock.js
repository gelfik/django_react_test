import React, {useRef} from "react";
import {inject, observer} from "mobx-react";
import {useAlert} from "react-alert";

const LessonFileBlock = inject('alessonStore','acourseStore', 'asubCourseStore')(observer((store) => {
    const {alessonStore, acourseStore, asubCourseStore} = store
    const fileRef = useRef();
    const alert = useAlert();

    const loadfile = event => {
        const files = event.target.files;
        const oneFile = files[0];
        const formData = new FormData();

        formData.append('file', oneFile);

        alessonStore.loadLessonFileAdd(formData, acourseStore.courseID, asubCourseStore.subCourseID).then(r => {
            if (alessonStore.lessonFileAdd?.status) {
                alessonStore.loadLessonData(acourseStore.courseID, asubCourseStore.subCourseID, alessonStore.lessonID)
                alert.success(alessonStore.lessonFileAdd?.detail)
            } else alert.error(alessonStore.lessonFileAdd?.detail)
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

    return (<div className="LessonList__Right__Data__File">
        {alessonStore.lessonData?.files?.fileList.length === 0 &&
        InputFileLoad()
        }
        {alessonStore.lessonData?.files?.fileList.length !== 0 && <>
        {getItemFiles(alessonStore.lessonData?.files?.fileList)}
            {InputFileLoad()}
        </>}
    </div>)
}))

export default LessonFileBlock;
import React, {useRef, useState} from "react";
import {inject, observer} from "mobx-react";
import Spinner from "../components/Spinner";

// #TODO IRL
const LoadImagePage = inject('pictureStore')(observer((stores) => {
    const [loading, setLoading] = useState(false);
    const [loadedFile, setLoadedFile] = useState(null);
    const {pictureStore} = stores;
    const fileRef = useRef();

    const onFileUpload = () => {
        console.log(fileRef.current.files[0])
        const files = fileRef.current.files;
        const oneFile = files[0]
        const formData = new FormData();
        formData.append('file', oneFile);

        pictureStore.loadImage(formData).then((r) => {
            console.log(r)
        })
    };

    const loadfile = event => {
        setLoading(true);
        setLoadedFile(null);
        const files = event.target.files;
        const oneFile = files[0];
        const formData = new FormData();

        formData.append('file', oneFile);

        pictureStore.loadImage(formData).then(r => {
            console.log(r)
            setLoadedFile(r.data)
            setLoading(false);
        })
    }

    return <div>
        <input type="file" name={'file'} ref={fileRef} onChange={loadfile} multiple={false}/>
        <button onClick={onFileUpload} disabled={loading}>
            Upload!
        </button>
        {loading && <Spinner/>}
        {loadedFile && <div className={'d-flex flex-column'}>
            <span>name: {loadedFile.name}</span>
            <span>owner: {loadedFile.owner}</span>
            <span>size: {loadedFile.size}</span>
            <span>upload_date: {new Date(loadedFile.upload_date).getDay()}</span>
        </div>}
    </div>
}))

export default LoadImagePage;

// #TODO REF
// import React, {useRef, useState} from "react";
// import {inject, observer} from "mobx-react";
//
//
// const LoadImagePage = inject('pictureStore')(observer((stores) => {
//     const {pictureStore} = stores;
//     const fileRef = useRef();
//
//     const onFileUpload = () => {
//         console.log(fileRef.current.files[0])
//         const files = fileRef.current.files;
//         const oneFile = files[0]
//         const formData = new FormData();
//         formData.append('file', oneFile);
//
//         pictureStore.loadImage(formData).then((r) => {
//             console.log(r)
//         })
//     };
//
//     return <div>
//         <input type="file" name={'file'} ref={fileRef}/>
//         <button onClick={onFileUpload}>
//             Upload!
//         </button>
//     </div>
// }))
//
// export default LoadImagePage;

// #TODO NO-REF
// import React, {useRef, useState} from "react";
// import {inject, observer} from "mobx-react";
//
//
// const LoadImagePage = inject('pictureStore')(observer((stores) => {
//     const {pictureStore} = stores;
//     const [selectedFile, setSelectedFile] = useState();
//     const [isFilePicked, setIsFilePicked] = useState(false);
//
//     const changeHandler = (event) => {
//         console.log(event.target.files[0])
//         setSelectedFile(event.target.files[0]);
//         setIsFilePicked(true);
//     };
//
//     const onFileUpload = () => {
//         console.log(selectedFile)
//         const formData = new FormData();
//
//         formData.append('file', selectedFile);
//
//         pictureStore.loadImage(formData).then((r) => {
//             console.log(r)
//         })
//
//         console.log(formData)
//     };
//
//     return <div>
//         <input type="file" name={'file'} onChange={changeHandler}/>
//         <button onClick={onFileUpload}>
//             Upload!
//         </button>
//     </div>
// }))
//
// export default LoadImagePage;
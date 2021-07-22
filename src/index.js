import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import 'bootstrap/dist/css/bootstrap.min.css';
import Comment from "./components/Comment";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

ReactDOM.render(
    <>
        <Comment text={'Content'}/>
        <App/>
    </>,
    document.getElementById('root')
);
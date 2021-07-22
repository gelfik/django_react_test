import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import './custom.scss';
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
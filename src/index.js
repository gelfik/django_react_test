import React from 'react';
import ReactDOM from 'react-dom';
import App from "./components/App";
import './custom.scss';
import Comment from "./components/Comment";
ReactDOM.render(
    <>
        <Comment text={'Content'}/>
        <App/>
    </>,
    document.getElementById('root')
);

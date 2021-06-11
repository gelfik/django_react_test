import React from "react";
import './spinner.css';

const Spinner = () => {
    return <div
        style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: 'center',
            backgroundColor: 'white'
        }}>
        <div className={'Spinner'}>
            <img src={"http://cdn.onlinewebfonts.com/svg/img_444888.png"} alt="spinner" width={64} height={64}/>
        </div>
    </div>
}

export default Spinner;
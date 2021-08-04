import React from "react";
import './spinner.css';

const Spinner = ({type = null}) => {
    let styles = {}
    switch (type) {
        case 'local':
            styles = {
                display: 'flex',
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: 'center',
                backgroundColor: 'transparent',
            }
            break;
        default:
            styles = {
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                display: "flex",
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: 'center',
                backgroundColor: 'white',
                zIndex: 10000
            }
    }

    return <div
        style={styles}>
        <div className="loadingio-spinner-spin-6tftrxot815">
            <div className="ldio-o5bejnrq56">
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
}

export default Spinner;
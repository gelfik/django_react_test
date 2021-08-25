import React from "react";

const ErrorAlert = ({error, styles = null, classes = null, type = null}) => {
    switch (type) {
        case 'text-only':
            return <div className={`text-danger ${classes}`} style={styles}>
                {error}
            </div>
        case null:
            return <div className={`alert alert-danger ${classes}`} style={styles} role="alert">
                {error}
            </div>
        default:
            return <div className={`alert alert-danger ${classes}`} style={styles} role="alert">
                {error}
            </div>
    }
}

export default ErrorAlert;
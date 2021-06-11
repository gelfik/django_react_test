import React from "react";

const ErrorAlert = ({error}) => {
    return <div className="alert alert-danger" role="alert">
        {error}
    </div>

}

export default ErrorAlert;
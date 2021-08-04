import React from "react";
import {inject, observer} from "mobx-react";
import {useLocation, useParams} from "react-router-dom";

const HuiPage = inject("userStore")(observer((stores) => {
    const {userStore} = stores;
    const params = useParams()
    console.log(params)
    const location = useLocation()
    console.log(location)
    console.log(location.state)
    const str = new URLSearchParams(location.search);
    const tags = str.get('use');
    console.log(tags)

    return <div style={{paddingTop: "100px"}}>123</div>;
}));

export default HuiPage;
import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";

const Page404 = inject('userStore')(observer((props) => {
    useEffect(() => {
        document.body.className = 'bg-light min-vh-100'
        window.scrollTo(0, 0)
    }, []);

    return (
        <main className={'mt_navbar bg-content'}>
            <div className="trainings__wrapper">
                <div className="display-3 fw-bold pb-3">404: Страница не найдена!</div>
            </div>
        </main>
    )
}))

export default Page404;
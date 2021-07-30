import React from "react";
import {inject, observer} from "mobx-react";

const Footer = inject('userStore')(observer((props) => {
    return (<footer className="bg-light row footer-margin">
        <div className="col">
            <div className="container">
                <div className={'row'}>
                    <div className={'col-lg-4 align-self-center'}>
                        <p className="text-center my-footer-p">ООО "ИЗИБРЭЙН"<br/>ОГРНИП: 1201600056173<br/>ИНН:
                            1615015772
                        </p>
                    </div>
                    <div className={'col-lg-4 align-self-center'}>
                        <p className="text-center my-footer-p">Все права защищены!</p>
                    </div>
                    <div className={'col-lg-4 align-self-center'}>
                        <p className="text-center my-footer-p">Адрес: РТ, с. Верхний Услон<br/>ул. проезд Волжский, 14
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>)
}))

export default Footer;
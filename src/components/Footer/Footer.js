import React from "react";
import {inject, observer} from "mobx-react";

const Footer = inject('userStore')(observer((props) => {
    return (<footer className="text-dark footer">
        <div className="footer__Wrapper">
            <div className={'footer__Row'}>
                <div className={'footer__Col footer__Col__Left'}>
                    <h2 className="footer__Title">
                        Контакты
                    </h2>
                </div>
                <div className={'footer__Col footer__Col__Right'}>
                    <ul className="footer__SocialLink">
                        <li>
                            <div className="footer__SocialLink__Item">
                                Вконтакте
                            </div>
                        </li>
                        <li>
                            <div className="footer__SocialLink__Item">
                                Телеграм
                            </div>
                        </li>
                        <li>
                            <div className="footer__SocialLink__Item">
                                Facebook
                            </div>
                        </li>
                    </ul>

                    <div className="footer__OrgData">
                        <p className='footer__OrgData__Name'>Адресс: </p>
                        <p className='footer__OrgData__Data'>РТ, с.Верхний Услон, ул. проезд Волжский, 14</p>
                        <p className='footer__OrgData__Name'>ООО </p><p
                        className='footer__OrgData__Data'>"ИЗИБРЭЙН",</p>
                        <p className='footer__OrgData__Name'>ОГРНИП: </p><p
                        className='footer__OrgData__Data'>1201600056173,</p>
                        <p className='footer__OrgData__Name'>ИНН: </p><p
                        className='footer__OrgData__Data'>1615015772</p>
                    </div>

                    <ul className="footer__Document">
                        <li>
                            <div className="footer__Document__Item">
                                договор оферты
                            </div>
                        </li>
                        <li>
                            <div className="footer__Document__Item">
                                политика конфиденциальности
                            </div>
                        </li>
                        <li>
                            <div className="footer__Document__Item">
                                согласие на обработку персональных данных
                            </div>
                        </li>
                    </ul>

                    {/*<p className="text-center my-footer-p">Адрес: РТ, с. Верхний Услон<br/>ул. проезд Волжский, 14*/}
                    {/*</p>*/}
                    {/*<p className="text-center my-footer-p">ООО "ИЗИБРЭЙН"<br/>ОГРНИП: 1201600056173<br/>ИНН:*/}
                    {/*    1615015772*/}
                    {/*</p>*/}
                    {/*<p className="text-center my-footer-p">Все права защищены!</p>*/}
                </div>
            </div>
        </div>
    </footer>)
}))

export default Footer;
import React from "react";
import { inject, observer } from "mobx-react";
import macbookBack from "../../img/macbook-back.png";
import macbookFace from "../../img/macbook-face.png";
import sitePage from "../../img/site-page.png";

const MainBlock = inject(
  "userStore",
  "mainPageStore",
  "uiStore"
)(
  observer((store) => {
    return (
      <div className="new-section bg-gray">
        <div className="container banner">
          <div className="new-line">
            <div className="banner-width">
              <div className="new-line">
                <div className="banner-title">учись ускоренно и легко</div>
                <div className="banner-logo d-flex align-items-center justify-content-center">
                  <div className="banner-logo__title">izzibrain</div>
                </div>
                <div className="banner-button d-flex align-items-center">
                  <div className="banner-button__title">вперед к знаниям</div>
                  <svg width="117" height="23">
                    <use xlinkHref={"#icon-arrow"} />
                  </svg>
                </div>
              </div>
            </div>
            <div className="banner-width mobile-none">
              <div className="new-line banner-right">
                <div className="banner-right-ellipse" />
                <img
                  className="banner-right-macbook_back"
                  src={macbookBack}
                  alt="MacBook Pro 16"
                />
                <img
                  className="banner-right-macbook_face"
                  src={macbookFace}
                  alt="MacBook Pro 16"
                />
                <img
                  className="banner-right-site_page"
                  src={sitePage}
                  alt="Курс"
                />
                <div className="banner-right-logo">
                  <div className="banner-right-logo__title">
                    быстрая подготовка
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="new-line justify-content-center pt-3 banner-badge">
            <div className="banner-badge__item"></div>
            <div className="banner-badge__item"></div>
            <div className="banner-badge__item"></div>
            <div className="banner-badge__item"></div>
          </div>
        </div>
      </div>
    );
  })
);

export default MainBlock;

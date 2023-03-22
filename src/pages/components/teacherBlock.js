import React, { useEffect } from "react";
import Style from "./teacherBlock.module.scss";
import { inject, observer } from "mobx-react";

const TeacherBlock = inject(
  "userStore",
  "mainPageStore"
)(
  observer((store) => {
    const { mainPageStore } = store;

    useEffect(() => {
      if (mainPageStore.teacherData.length === 0) {
        mainPageStore.loadTeacherData();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mainPageStore.teacherData]);

    const getItemSubject = () => {
      return mainPageStore.teacherData.map((item, i) => (
        <div className={Style.card} key={i}>
          <div className={Style.card__subject}>
            <div className={Style.card__subject__title}>{item?.subject}</div>
          </div>
          <img
            className={Style.card__photo}
            src={`${item.user?.avatar?.file?.original}`}
            alt={`${item.user?.lastName} ${item.user?.firstName} ${item.subject}`}
          />
          {getIcon(item)}
          <div className={Style.card__name}>
            {item?.user?.lastName} {item?.user?.firstName}
          </div>
          <div className={Style.card__shortDescription}>
            {item?.shortDescription}
          </div>
          {/*<div className={Style.card__description}>{item?.description}</div>*/}
        </div>
      ));
    };

    const getIcon = (teacher) => {
      if (
        teacher?.teacherLink?.vk ||
        teacher?.teacherLink?.instagram ||
        teacher?.teacherLink?.telegram ||
        teacher?.teacherLink?.youtube
      )
        return (
          <ul className={Style.card__socialLink}>
            {teacher?.teacherLink?.vk && (
              <TeacherSocial type={"vk"} teacher={teacher} />
            )}
            {/*{teacher?.teacherLink?.instagram && (*/}
            {/*  <TeacherSocial type={"instagram"} teacher={teacher} />*/}
            {/*)}*/}
            {teacher?.teacherLink?.telegram && (
              <TeacherSocial type={"telegram"} teacher={teacher} />
            )}
            {teacher?.teacherLink?.youtube && (
              <TeacherSocial type={"youtube"} teacher={teacher} />
            )}
          </ul>
        );
    };

    return (
      <div className="new-section ">
        <div className={Style.teacher}>
          <div className={Style.teacher__title}>наши преподаватели</div>
          <div className={Style.teacher__block}>{getItemSubject()}</div>
        </div>
      </div>
    );
  })
);

const TeacherSocial = ({ type, teacher }) => {
  return (
    <li className="list-inline-item m-0">
      <a
        href={teacher.teacherLink[type]}
        rel="noreferrer"
        className="icon-social icon-social--black icon-social--md icon-social--bg-blue"
        target="_blank"
      >
        <svg aria-hidden="true" height="25" width="25">
          <use xlinkHref={`#icon-${type}`} />
        </svg>
      </a>
    </li>
  );
};

export default TeacherBlock;

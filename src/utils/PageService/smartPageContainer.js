import React from "react";
import { useStores } from "../../hooks/mobx";
import { Redirect } from "react-router-dom";

const SmartPageContainer = ({
  isTeacher,
  isAuthorized,
  isMentor,
  isMentorOrTeacher,
  to = "/",
  children,
}) => {
  const { userStore } = useStores();
  if (isAuthorized) {
    if (!userStore.userAuthStatus) {
      return <Redirect to={to} />;
    }
  }
  if (isMentorOrTeacher) {
    if (!userStore.userData?.isTeacher && !userStore.userData?.isMentor) {
      return <Redirect to={to} />;
    }
  }
  if (isTeacher && !isMentorOrTeacher) {
    if (!userStore.userData?.isTeacher) {
      return <Redirect to={to} />;
    }
  }
  if (isMentor && !isMentorOrTeacher) {
    if (!userStore.userData?.isMentor) {
      return <Redirect to={to} />;
    }
  }

  return children;
};

export default SmartPageContainer;

import classNames from "classnames";
import React from "react";
import { VIRFICE_APP_PREFIX } from "@conf";

const NotificationBell = ({
  open,
  title,
  leftIcon,
  type = "success",
  notificationRef,
  className = false,
}) => {
  const cn = classNames(
    {
      [VIRFICE_APP_PREFIX + "-notification-bell"]: true,
      [VIRFICE_APP_PREFIX + "-success"]: type === "success",
      ["body__medium"]: type === "success",
      [VIRFICE_APP_PREFIX + "-danger"]: type === "danger",
    },
    className
  );

  if (!open) return null;
  return (
    <div className={cn} ref={notificationRef}>
      {leftIcon}
      {title}
    </div>
  );
};

export default NotificationBell;

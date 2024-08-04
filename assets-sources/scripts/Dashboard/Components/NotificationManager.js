import React, { useEffect, useRef } from "react";
import NotificationBell from "../Molecules/NotificationBell";
import { useSelector } from "react-redux";

const NotificationManager = () => {
  const notificationRef = useRef(null);
  const nb = useSelector((state) => state.components.notificationBell);
  useEffect(() => {
    setNotificationPosition();
    // Get the body element
    const body = document.body;

    // Function to call when class changes
    const handleClassChange = (mutationsList) => {
      for (const mutation of mutationsList) {
        setNotificationPosition();
      }
    };

    // Create a MutationObserver to listen for class changes
    const observer = new MutationObserver(handleClassChange);

    // Observe the 'class' attribute of the body
    observer.observe(body, { attributes: true });

    return () => {
      // Disconnect the observer when component is unmounted
      observer.disconnect();
    };
  }, [nb.open]);

  const setNotificationPosition = () => {
    if (nb.open && notificationRef.current) {
      let is_wp_menu_collapsed = document.querySelector("body.folded");
      notificationRef.current.style.position = "fixed";
      notificationRef.current.style.top = "88px";
      if (is_wp_menu_collapsed) {
        notificationRef.current.style.left = "36px";
        notificationRef.current.style.width = "calc(100% - 36px)";
      } else {
        notificationRef.current.style.left = "160px";
        notificationRef.current.style.width = "calc(100% - 160px)";
      }
    }
  };

  if (!nb.open) return null;
  return (
    <NotificationBell
      title={nb.title}
      type={nb.type}
      open={nb.open}
      notificationRef={notificationRef}
    />
  );
};

export default NotificationManager;

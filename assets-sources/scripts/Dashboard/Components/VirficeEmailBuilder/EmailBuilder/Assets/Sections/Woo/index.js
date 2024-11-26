import React from "react";
import { HandTapIcon } from "@svg-icons";
import { getBasicEleWrapper } from "../core-ele";
import { getOrderDetailsString } from "./woo-core-ele";

const OrderTable = {
  title: "Order Table",
  icon: <HandTapIcon />,
  template: getBasicEleWrapper(
    getOrderDetailsString({
      title: "Order Table",
    }),
    {
      paddingTop: "16px",
      paddingBottom: "16px",
    }
  ),
};

export default [OrderTable];

import React from "react";
import { HandTapIcon } from "../../../../../../icons";
import { getSingleColTable } from "../core-ele";
import { getOrderDetailsString } from "./woo-core-ele";

const OrderTable = {
  title: "Order Table",
  icon: <HandTapIcon />,
  template: getSingleColTable(
    getOrderDetailsString({
      title: "Order Table",
    }),
    {
      title: "Order Details",
      paddingTop: "16px",
      paddingBottom: "16px",
    }
  ),
};

export default [OrderTable];

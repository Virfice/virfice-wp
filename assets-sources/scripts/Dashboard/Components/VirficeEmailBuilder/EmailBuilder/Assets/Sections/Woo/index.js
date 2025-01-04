import React from "react";
import { HandTapIcon } from "@svg-icons";
import { getBasicEleWrapper } from "../core-ele";
import { getOrderAddressString, getOrderDetailsString } from "./woo-core-ele";

const OrderTable = {
  title: "Order Table",
  icon: <HandTapIcon />,
  template: getBasicEleWrapper(
    getOrderDetailsString({
      title: "Order Table",
    }),
    {
      paddingTop: "36px",
      paddingBottom: "36px",
      paddingLeft: "48px",
      paddingRight: "48px",
      textAlign: "left",
    }
  ),
};
const OrderAddress = {
  title: "Order Address",
  icon: <HandTapIcon />,
  template: getBasicEleWrapper(
    getOrderAddressString({
      title: "Order Address",
    }),
    {
      paddingTop: "0",
      paddingBottom: "36px",
      paddingLeft: "40px",
      paddingRight: "40px",
      textAlign: "left",
    }
  ),
};

export default [OrderTable, OrderAddress];

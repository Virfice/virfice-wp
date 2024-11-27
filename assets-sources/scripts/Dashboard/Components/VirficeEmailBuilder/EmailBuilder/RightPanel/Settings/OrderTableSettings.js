import React from "react";
import Tab from "../../../../Tab";
import TabHeader from "../../../../Tab/TabHeader";
import TabContent from "../../../../Tab/TabContent";
import TabHead from "../../../../Tab/TabHead";
import Divider from "@molecules/Divider";
import { VIRFICE_APP_PREFIX } from "@conf";
import PaintField from "@molecules/Paintfield";
import SelectField from "@molecules/SelectField";
import { getElementComputedStyle } from "./utils";
import Reusable from "./Reusable";
import DisabledParentSettings from "./DisabledParentSettings";
import { getAllElementsUsingSelector } from "../../utils";
import { getSelectOptionsValueFromOptions } from "@functions";

const OrderTableSettings = ({ element }) => {
  const order_table_headers = getAllElementsUsingSelector(
    element,
    "order_table_header"
  );
  const order_details_title = getAllElementsUsingSelector(
    element,
    "order_details_title"
  );

  const order_table_thead = getAllElementsUsingSelector(
    element,
    "order_table_thead"
  );
  console.log({ order_table_headers });
  return (
    <>
      <Tab>
        <TabHead>
          <TabHeader index={0}>Content</TabHeader>
          <TabHeader index={1}>Design</TabHeader>
        </TabHead>
        <Divider style={{ marginLeft: -20 }} extraWidth={"40px"} />
        <TabContent index={0}>
          <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
            {order_details_title.length > 0 && (
              <>
                <div className="title__medium">Title</div>
                <Reusable
                  element={order_details_title[0]}
                  type="font-and-size"
                  eleArr={order_details_title}
                />
              </>
            )}

            {order_table_headers.length > 0 && (
              <>
                <div className="title__medium">Table headers</div>
                <Reusable
                  element={order_table_headers[0]}
                  type="font-and-size"
                  eleArr={order_table_headers}
                />
              </>
            )}

            <div className="title__medium">Table data</div>
            <Reusable element={element} type="font-and-size" />
          </div>
        </TabContent>
        <TabContent index={1}>
          <div className={`${VIRFICE_APP_PREFIX}-form-group`}>
            <PaintField
              label={"Background color"}
              value={getElementComputedStyle(element, "background-color")}
              onChange={(v) => {
                element.style.backgroundColor = v;
              }}
            />

            {order_details_title.length > 0 && (
              <PaintField
                label={"Order table title"}
                value={getElementComputedStyle(order_details_title[0], "color")}
                onChange={(v) => {
                  order_details_title.forEach((ele) => {
                    ele.style.color = v;
                  });
                }}
              />
            )}

            <PaintField
              label={"Order table item color"}
              value={getElementComputedStyle(element, "color")}
              onChange={(v) => {
                element.style.color = v;
              }}
            />

            {order_table_thead.length > 0 && (
              <PaintField
                label={"Table headers background color"}
                value={getElementComputedStyle(
                  order_table_thead[0],
                  "background-color"
                )}
                onChange={(v) => {
                  order_table_thead.forEach((ele) => {
                    ele.style.backgroundColor = v;
                  });
                }}
              />
            )}

            {order_table_headers.length > 0 && (
              <PaintField
                label={"Table headers font color"}
                value={getElementComputedStyle(order_table_headers[0], "color")}
                onChange={(v) => {
                  order_table_headers.forEach((ele) => {
                    ele.style.color = v;
                  });
                }}
              />
            )}

            <Reusable element={element} type="border-radius" />
            <Reusable element={element} type="padding" />

            <DisabledParentSettings element={element} />
          </div>
        </TabContent>
      </Tab>
    </>
  );
};

export default OrderTableSettings;

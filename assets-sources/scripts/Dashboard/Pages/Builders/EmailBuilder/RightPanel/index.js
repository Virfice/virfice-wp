import React from "react";
import Settings from "../Settings";
import { VIRFICE_APP_PREFIX } from "../../../../../conf";
import { pageInitData } from "../utils";
import Card from "../../../../Molecules/Card";
import Heading from "./Heading";
import Divider from "../../../../Molecules/Divider";
import { useSelector } from "react-redux";
import Loading from "../../../../Molecules/Loading";

const RightPanel = () => {
  const selectedElementId = useSelector(
    (state) => state.builder?.selectedElementId
  );
  const selectedEle = useSelector(
    (state) => state.builder.data?.pageData?.[selectedElementId]
  );

  return (
    <div style={{ width: 380 }}>
      {!selectedEle ? (
        <Loading />
      ) : (
        <div
          className={`${VIRFICE_APP_PREFIX}-flex-col ${VIRFICE_APP_PREFIX}-gap-20 ${VIRFICE_APP_PREFIX}-sticky-top-110`}
        >
          <Card className={`${VIRFICE_APP_PREFIX}-flex-col`} style={{ gap: 0 }}>
            <Heading
              title={selectedEle.title}
              subTitle={selectedEle.subTitle}
            />
            <Divider style={{ marginLeft: -20 }} extraWidth={"40px"} />
            <Settings data={selectedEle.settings} />
          </Card>
        </div>
      )}
    </div>
  );
};

export default RightPanel;

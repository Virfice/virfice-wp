import React, { useEffect, useState } from "react";
import { VIRFICE_APP_PREFIX } from "../../../../../conf";
import Card from "../../../../Molecules/Card";
import { useSelector } from "react-redux";
import Loading from "../../../../Molecules/Loading";
import { getVirficeElementFromId } from "../utils";
import Heading from "./Heading";
import Divider from "../../../../Molecules/Divider";
import Settings from "./Settings";

const RightPanel = () => {
  const selectedElementId = useSelector(
    (state) => state.builder?.selectedElementId
  );
  const [element, setElement] = useState(false);

  useEffect(() => {
    if (selectedElementId) {
      setElement(getVirficeElementFromId(selectedElementId));
    } else {
      setElement(false);
    }
  }, [selectedElementId]);

  return (
    <div style={{ width: 380 }}>
      {/* {!selectedElementId && <Loading />} */}

      <div
        className={`${VIRFICE_APP_PREFIX}-flex-col ${VIRFICE_APP_PREFIX}-gap-20 ${VIRFICE_APP_PREFIX}-sticky-top-110`}
      >
        <Card className={`${VIRFICE_APP_PREFIX}-flex-col`} style={{ gap: 0 }}>
          {!selectedElementId && "Select an element"}
          {element && (
            <>
              <Heading element={element} />
              <Divider style={{ marginLeft: -20 }} extraWidth={"40px"} />
              <Settings element={element} />
            </>
          )}{" "}
        </Card>
      </div>
    </div>
  );
};

export default RightPanel;

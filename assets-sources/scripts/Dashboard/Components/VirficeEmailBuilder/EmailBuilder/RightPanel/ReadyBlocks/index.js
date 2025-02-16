import React from "react";
import { allBlocks } from "./data";
import Accordion from "@molecules/Accordion";
import SingleBlock from "./SingleBlock";
import { VIRFICE_APP_PREFIX } from "@conf";
import Divider from "@molecules/Divider";

const ReadyBlocks = ({ category = "*" }) => {
  const filterData =
    category === "*"
      ? allBlocks
      : allBlocks.filter((v) => category.includes(v.id));
  return (
    <div className={VIRFICE_APP_PREFIX + "-ready-blocks-wrapper"}>
      {filterData.map((v, i) => (
        <Accordion title={v.title} key={v.id} open={i === 0}>
          {v.blocks.map(({ title, html, preview, isComingSoon }, i) => (
            <SingleBlock
              key={i}
              title={title}
              html={html}
              preview={preview}
              isComingSoon={isComingSoon}
            />
          ))}
          <Divider
            style={{ marginLeft: -20, marginBottom: 0 }}
            extraWidth={"40px"}
          />
        </Accordion>
      ))}
    </div>
  );
};

export default ReadyBlocks;

import React from "react";
import { allBlocks } from "./data";
import Accordion from "@molecules/Accordion";
import SingleBlock from "./SingleBlock";

const ReadyBlocks = ({ category = "*" }) => {
  const filterData =
    category === "*"
      ? allBlocks
      : allBlocks.filter((v) => category.includes(v.id));

  console.log(filterData);
  return (
    <div>
      {filterData.map((v) => (
        <Accordion title={v.title} key={v.id} open>
          {v.blocks.map(({ title, html }, i) => (
            <SingleBlock key={i} title={title} html={html} />
          ))}
        </Accordion>
      ))}
    </div>
  );
};

export default ReadyBlocks;

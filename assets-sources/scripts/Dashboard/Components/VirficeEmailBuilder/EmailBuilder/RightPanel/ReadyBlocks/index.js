import React, { useEffect, useState } from "react";
import Accordion from "@molecules/Accordion";
import SingleBlock from "./SingleBlock";
import { VIRFICE_APP_PREFIX } from "@conf";
import Divider from "@molecules/Divider";
import { useDispatch, useSelector } from "react-redux";
import { readyBlocksAsync } from "./readyBlockSlice";

const ReadyBlocks = () => {
  const dispatch = useDispatch();
  const blockLoaded = useSelector((state) => state.readyBlocks.loaded);
  const allBlocks = useSelector((state) => state.readyBlocks.data);
  const [openedAccordion, setOpenedAccordion] = useState(0);

  useEffect(() => {
    if (!blockLoaded) {
      dispatch(readyBlocksAsync());
    }
  }, []);

  if (!blockLoaded) return "Loading...";

  const filterData = allBlocks.map((v) => {
    return {
      title: v.tag,
      id: v.tag,
      blocks: v.templates.map((t) => {
        return {
          title: t.title,
          html: t.content,
          preview: t.image,
          isComingSoon: t.isComingSoon,
        };
      }),
    };
  });
  return (
    <div className={VIRFICE_APP_PREFIX + "-ready-blocks-wrapper"}>
      {filterData.map((v, i) => (
        <Accordion
          title={v.title}
          key={v.id}
          open={i === openedAccordion}
          onOpen={() => {
            setOpenedAccordion(i);
          }}
        >
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

import React, { useEffect } from "react";
import StickyTopNav from "../../../Components/StickyTopNav";
import PageHeadingAndSubheading from "../../../Components/PageHeadingAndSubheading";
import Container from "../../../Molecules/Container";
import { VIRFICE_APP_PREFIX } from "../../../../conf";
// import { pageInitData } from "./utils";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useDispatch } from "react-redux";
import { setBuilderData } from "../builderSlice";
import { commonCSS } from "./Assets/utils";
import { initEmailBuilder } from "./utils";
import { addParams, generateRandomId } from "../../../../functions";
// import { setBuilderData } from "../builderSlice";

const pageInitData = `
<style>
    ${commonCSS}
</style>
<table ${VIRFICE_APP_PREFIX}-title="Heading" ${VIRFICE_APP_PREFIX}-ele_type="section" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}">
    <tbody>
        <tr ${VIRFICE_APP_PREFIX}-title="Row 1" ${VIRFICE_APP_PREFIX}-ele_type="row" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}">
            <td ${VIRFICE_APP_PREFIX}-title="Column 1" ${VIRFICE_APP_PREFIX}-ele_type="column" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}">
                <img ${VIRFICE_APP_PREFIX}-title="Header Image" ${VIRFICE_APP_PREFIX}-ele_type="image" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}" src="https://woo.test/wp-content/uploads/2024/04/MainAfter.webp" />
            </td>
        </tr>
        <tr ${VIRFICE_APP_PREFIX}-title="Row 2" ${VIRFICE_APP_PREFIX}-ele_type="row" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}">
            <td ${VIRFICE_APP_PREFIX}-title="Column 1" ${VIRFICE_APP_PREFIX}-ele_type="column" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}">
                <h2 ${VIRFICE_APP_PREFIX}-title="Title" ${VIRFICE_APP_PREFIX}-ele_type="text" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}">Lorem Ipsum</h2>
                <p ${VIRFICE_APP_PREFIX}-title="Content" ${VIRFICE_APP_PREFIX}-ele_type="text" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </td>
        </tr>
    </tbody>
</table>
<table ${VIRFICE_APP_PREFIX}-title="Content" ${VIRFICE_APP_PREFIX}-ele_type="section" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}">
    <tbody>
        <tr ${VIRFICE_APP_PREFIX}-title="Row 1" ${VIRFICE_APP_PREFIX}-ele_type="row" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}">
            <td ${VIRFICE_APP_PREFIX}-title="Column 1" ${VIRFICE_APP_PREFIX}-ele_type="column" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}">
                <h2 ${VIRFICE_APP_PREFIX}-title="Title" ${VIRFICE_APP_PREFIX}-ele_type="text" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}">Lorem Ipsum</h2>
                <p ${VIRFICE_APP_PREFIX}-title="Subtitle" ${VIRFICE_APP_PREFIX}-ele_type="text" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}">It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                <a ${VIRFICE_APP_PREFIX}-title="Link" ${VIRFICE_APP_PREFIX}-ele_type="link" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}" style="background-color: rgb(248, 231, 28); padding: 4px 8px; border-radius: 4px;">Visit Now</a>
            </td>
            <td ${VIRFICE_APP_PREFIX}-title="Column 2" ${VIRFICE_APP_PREFIX}-ele_type="column" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}">
                <h2 ${VIRFICE_APP_PREFIX}-title="Title" ${VIRFICE_APP_PREFIX}-ele_type="text" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}">Lorem Ipsum</h2>
                <p ${VIRFICE_APP_PREFIX}-title="Subtitle" ${VIRFICE_APP_PREFIX}-ele_type="text" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}">It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.</p>
                <a ${VIRFICE_APP_PREFIX}-title="Link" ${VIRFICE_APP_PREFIX}-ele_type="link" ${VIRFICE_APP_PREFIX}-id="${generateRandomId()}" style="background-color: rgb(248, 231, 28); padding: 4px 8px; border-radius: 4px;">Visit Now</a>
            </td>
        </tr>
    </tbody>
</table>
`;

const EmailBuilder = () => {
  const dispatch = useDispatch();
  const handleBackActionClick = () => {
    window.location.href = addParams({ menu: "" });
  };

  useEffect(() => {
    //TODO: need to collect page data from server => pageInitData
    dispatch(setBuilderData({ key: "html", value: pageInitData }));
    // dispatch(
    //   setBuilderData({ key: "selectedElementId", value: pageInitData?.root })
    // );
  }, [pageInitData]);

  return (
    <>
      <StickyTopNav backAction={handleBackActionClick} />
      <section>
        <PageHeadingAndSubheading
          heading={"Email builder"}
          subHeading={
            "Customize the look and feel of all WooCommerce emails. Let your emails represent your store."
          }
        />

        <Container>
          <div
            className={`${VIRFICE_APP_PREFIX}-flex ${VIRFICE_APP_PREFIX}-gap-20`}
          >
            <LeftPanel />
            <RightPanel />
          </div>
        </Container>
      </section>
    </>
  );
};

export default EmailBuilder;

import React, { useState } from "react";
import TableItem from "@molecules/DataTable/TableItem";
import Badge from "@molecules/Badge";
import { BadgeActiveIcon, EnvelopIcon, PencilIcon, WooIcon } from "@svg-icons";
import { VIRFICE_APP_PREFIX } from "@conf";
import Button from "@molecules/Button";
import { addParams } from "@functions";
import CheckboxField from "@molecules/CheckboxField";
import SingleItemVirficeTemplateStatus from "./SingleItemVirficeTemplateStatus";

const SingleItem = ({ email }) => {
  const [virfice_template_status, setVirfice_template_status] = useState(
    email.virfice_template_status || false
  );

  const menuUrl =
    virfice_template_status === true
      ? "woo-email-edit-virfice"
      : "woo-email-edit";
  return (
    <TableItem
      link={addParams({
        menu: menuUrl,
        email_id: email.id,
      })}
    >
      <td>
        <div
          className={`${VIRFICE_APP_PREFIX}-flex-align-center ${VIRFICE_APP_PREFIX}-gap-8`}
        >
          <EnvelopIcon type={"flat"} /> {email.title}
          <WooIcon />
        </div>
      </td>
      <td>
        {email.enabled === "yes" && (
          <Badge type="active" title="Active" leftIcon={<BadgeActiveIcon />} />
        )}
        {email.enabled === "no" && (
          <Badge
            type="in-active"
            title="Disabled"
            leftIcon={<BadgeActiveIcon />}
          />
        )}
        {!email.enabled && (
          <Badge type="active" title="Manual" leftIcon={<BadgeActiveIcon />} />
        )}
      </td>
      <td>
        <SingleItemVirficeTemplateStatus
          email={email}
          setVirfice_template_status={setVirfice_template_status}
        />
      </td>
      <td>{email.email_type === "html" ? "text/html" : "palin text"}</td>
      <td>{email.recipient || "Customer"}</td>
      <td>
        <div className={`${VIRFICE_APP_PREFIX}-action-buttons`}>
          <Button
            leftIcon={<PencilIcon />}
            title="Edit"
            type="secondary"
            small
            // onClick={handleEditClick}
            link={addParams({
              menu: menuUrl,
              email_id: email.id,
            })}
          />
        </div>
      </td>
    </TableItem>
  );
};

export default SingleItem;

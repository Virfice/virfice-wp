import React from "react";
import TableItem from "../../Molecules/DataTable/TableItem";
import Badge from "../../Molecules/Badge";
import { BadgeActiveIcon, EnvelopIcon, PencilIcon, WooIcon } from "../../icons";
import { VIRFICE_APP_PREFIX } from "../../../conf";
import Button from "../../Molecules/Button";
import { addParams } from "../../../functions";

const SingleItem = ({ email }) => {
  const handleEditClick = () => {
    window.location.href = addParams({
      menu: "woo-email-edit",
      email_id: email.id,
    });
  };
  return (
    <TableItem>
      <td>
        <div
          className={`${VIRFICE_APP_PREFIX}-flex-align-center ${VIRFICE_APP_PREFIX}-gap-8`}
        >
          <EnvelopIcon type={"flat"} /> {email.title}
          <WooIcon />
        </div>
      </td>
      <td>
        <Badge type="active" title="Active" leftIcon={<BadgeActiveIcon />} />
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
            onClick={handleEditClick}
          />
        </div>
      </td>
    </TableItem>
  );
};

export default SingleItem;

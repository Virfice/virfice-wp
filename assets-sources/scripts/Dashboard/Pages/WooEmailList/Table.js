import React, { useEffect } from "react";
import DataTable from "@molecules/DataTable";
import TableHeader from "@molecules/DataTable/TableHeader";
import TableBody from "@molecules/DataTable/TableBody";
import SingleItem from "./SingleItem";
import { useDispatch, useSelector } from "react-redux";
import { emailListAsync } from "./wooEmailListSlice";
import Loading from "@molecules/Loading";

const Table = () => {
  const emailList = useSelector((state) => state.wooEmailList.emailList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(emailListAsync());
  }, []);

  if (!emailList.loaded) return <Loading />;

  return (
    <DataTable>
      <TableHeader
        data={[
          { title: "Emails", width: 420 },
          { title: "Status" },
          { title: "Content type" },
          { title: "Recipient(s)" },
          { title: "Virfice template" },
          { title: "" },
        ]}
      />
      <TableBody>
        {emailList.data.map((email) => (
          <SingleItem key={email.id} email={email} />
        ))}
      </TableBody>
    </DataTable>
  );
};
export default Table;

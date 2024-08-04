import React from "react";

const TableHeader = ({ data = [] }) => {
  return (
    <thead>
      <tr>
        {data.map((d, i) => (
          <th key={i} style={{width: d.width}}>{d.title}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

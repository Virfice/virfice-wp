import React from "react";

const TableItem = ({ children, link }) => {

  const handleClick = () =>{
    if(link){
      window.location.href = link;
    }
  }
  return (
    <tr onClick={handleClick}>
      {children}
    </tr>
  );
};

export default TableItem;

import React, { useEffect, useState } from "react";
import SelectField from "../Molecules/SelectField";
import axios from "axios";

let initialValue = [{ value: "", title: "Value not selected" }];
const OrderSearch = ({ onOrderSelect }) => {
  const [orders, setOrders] = useState(initialValue);

  useEffect(() => {
    searchOrder();
  }, []);

  const searchOrder = (query) => {
    let d = null;
    let apiSlug = "virfice/v1/woo-order/all";

    axios
      .get(`${virfice.restBase}${apiSlug}`, {
        headers: {
          "X-WP-Nonce": virfice.nonce,
        },
        params: {},
      })
      .then((res) => {
        d = res.data;
        setOrders(d);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnChange = (value) => {
    if(onOrderSelect){
        onOrderSelect(value);
    }
  };

  return (
    <SelectField
      label={"Order"}
      value={{ value: "", title: "" }}
      options={orders}
      onChange={handleOnChange}
      onSearchInputChange={(v) => {
        searchOrder(v);
      }}
    />
  );
};

export default OrderSearch;

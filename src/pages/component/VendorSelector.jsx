import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import service from "../../utils/requestAxios";

export default function VendorSelector({ vendor, setVendor }) {
  const [vendorList, setVendorList] = useState([]);
  useEffect(() => {
    service
      .get(`/api/vendor/list`, {
        params: { reqIndex: 1, reqCount: 10, keyword: "" },
      })
      .then((res) => {
        setVendorList(res.data.result);
        setVendor(res.data.result[0].id);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <FormControl fullWidth>
      <InputLabel>거래선</InputLabel>
      <Select
        fullWidth
        label={"거래선"}
        labelId=""
        value={vendor}
        onChange={(e) => {
          setVendor(e.target.value);
        }}
      >
        {vendorList.map((item, idx) => {
          return <MenuItem value={item.id}>{item.vendorName}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
}

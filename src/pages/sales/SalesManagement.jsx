import {
  Button,
  Input,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import dateUtil from "../../utils/dateUtil";
import VendorSelector from "../component/VendorSelector";

export default function SalesManagement({ changeTitle }) {
  changeTitle();
  const [startDt, setStartDt] = useState(dateUtil.getToday());
  const [endDt, setEndDt] = useState(dateUtil.getToday());
  const [totalSupplyPrice, setTotalSupplyPrice] = useState(0);
  const [totalSupplyPriceVat, setTotalSupplyPriceVat] = useState(0);
  const [vendor, setVendor] = useState(0);
//   const [vendorList, setVendorList] = useState([]);

  useEffect(() => {}, []);
  return (
    <>
      <VendorSelector
        setVendor={setVendor}
        vendor={vendor}
        // vendorList={vendorList}
      />
      <TextField type="date" />
      <TextField type="date" />
      <Button>검색</Button>
      <Input />
      <Input />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>매출번호</TableCell>
            <TableCell>전표번호</TableCell>
            <TableCell>주문번호</TableCell>
            <TableCell>납품번호</TableCell>
            <TableCell>상품코드</TableCell>
            <TableCell>모델명</TableCell>
            <TableCell>수량</TableCell>
            <TableCell>공급가</TableCell>
            <TableCell>부가세</TableCell>
            <TableCell>배송완료일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody></TableBody>
      </Table>
    </>
  );
}

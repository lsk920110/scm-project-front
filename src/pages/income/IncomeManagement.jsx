import {
  Box,
  Button,
  Divider,
  Grid,
  Input,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import dateUtil from "../../utils/dateUtil";
import VendorSelector from "../component/VendorSelector";
import service from "../../utils/requestAxios";
const style = {
  marginY: "15px",
};
export default function IncomeManagement({ changeTitle }) {
  changeTitle();
  const [startDt, setStartDt] = useState(dateUtil.getToday());
  const [endDt, setEndDt] = useState(dateUtil.getToday());
  const [totalSupplyPrice, setTotalSupplyPrice] = useState(0);
  const [totalSupplyPriceVat, setTotalSupplyPriceVat] = useState(0);
  const [vendor, setVendor] = useState(0);
  const [list, setList] = useState([]);
  const handleStartDt = (e) => setStartDt(e.target.value);
  const handleEndDt = (e) => setEndDt(e.target.value);

  const search = () => {
    const data = {
      startDt: new Date(startDt).toISOString(),
      endDt: new Date(endDt).toISOString(),
      vendorId: vendor,
    };
    service
      .get(`/api/income`, { params: data })
      .then((res) => {
        setList(res.data.result.list);
        setTotalSupplyPrice(res.data.result.totalSupplyPrice);
        setTotalSupplyPriceVat(res.data.result.totalSupplyPriceVat);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {}, []);
  return (
    <>
      {/* <Box sx={style}>
      </Box> */}
      <Grid sx={style} container spacing={2}>
        <Grid item xs={2}>
        <VendorSelector
          setVendor={setVendor}
          vendor={vendor}
        />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="시작일"
            type="date"
            value={startDt}
            onChange={handleStartDt}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            type="date"
            label="종료일"
            value={endDt}
            onChange={handleEndDt}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            sx={{ height: "100%" }}
            fullWidth
            onClick={search}
            variant="contained"
          >
            검색
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{marginY : '30px'}}/>
      <Grid spacing={2} container>
        <Grid item xs={4}>
          <TextField
            fullWidth
            value={totalSupplyPrice.toLocaleString()}
            label="공급가"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            value={totalSupplyPriceVat.toLocaleString()}
            label="부가세"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            value={(totalSupplyPriceVat+totalSupplyPrice).toLocaleString()}
            label="합계"
          />
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            {/* <TableCell>매출번호</TableCell> */}
            <TableCell>거래선번호</TableCell>
            <TableCell>거래선</TableCell>
            <TableCell>전표번호</TableCell>
            <TableCell>주문번호</TableCell>
            <TableCell>납품번호</TableCell>
            <TableCell>고객명</TableCell>
            <TableCell>상품코드</TableCell>
            <TableCell>모델명</TableCell>
            <TableCell>수량</TableCell>
            <TableCell>공급가</TableCell>
            <TableCell>부가세</TableCell>
            <TableCell>주문일</TableCell>
            <TableCell>배송완료일</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item, idx) => {
            return (
              <TableRow>
                <TableCell>{item.vendorId}</TableCell>
                <TableCell>{item.vendorName}</TableCell>
                <TableCell>{item.statementId}</TableCell>
                <TableCell>{item.orderId}</TableCell>
                <TableCell>{item.deliveryId}</TableCell>
                <TableCell>{item.customerName}</TableCell>
                <TableCell>{item.productCord}</TableCell>
                <TableCell>{item.modelCord}</TableCell>
                <TableCell>
                  {item.statementProductCordQuantity *
                    item.productCordDetailQuantity}
                </TableCell>
                <TableCell>
                  {(
                    item.statementProductCordQuantity *
                    item.productCordDetailQuantity *
                    item.supplyPrice
                  ).toLocaleString()}
                </TableCell>
                <TableCell>
                  {(
                    item.statementProductCordQuantity *
                    item.productCordDetailQuantity *
                    item.supplyPriceVat
                  ).toLocaleString()}
                </TableCell>
                <TableCell>
                  {dateUtil.yyyy_mm_dd(item.orderRegDt, "-")}
                </TableCell>
                <TableCell>
                  {dateUtil.yyyy_mm_dd(item.deliveryCompletionDt, "-")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

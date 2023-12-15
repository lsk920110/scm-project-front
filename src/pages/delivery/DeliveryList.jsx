import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import service from "../../utils/requestAxios";
import dateUtil from "../../utils/dateUtil";

export default function DeliveryList() {
  const [vendor, setVendor] = useState(0);
  const [vendorList, setVendorList] = useState([]);
  const [deliveryList, setDeliveryList] = useState([]);
  const [startDt, setStartDt] = useState(dateUtil.getToday());
  const [endDt, setEndDt] = useState(dateUtil.getToday());
  const allocateDelivery = () => {
    service
      .get(`/api/delivery/allocation`)
      .then((res) => {
        alert(res.data.errorMessage)
        
      })
      .catch((err) => console.error(err));
  };
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



  const deliveryListCall = () => {
    const data = {
      vendorId: vendor,
      startDt: new Date(startDt),
      endDt: new Date(endDt),
    };
    service
      .post(`/api/delivery/list`, data)
      .then((res) => {
        setDeliveryList(res.data.result);
      }
      )
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Box width={"100%"} textAlign={"right"} padding={"20px"}>
        <Button variant="contained" onClick={allocateDelivery}>
          배송할당
        </Button>
      </Box>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Select
              onChange={(e) => setVendor(e.target.value)}
              value={vendor}
              fullWidth
            >
              {vendorList.map((item, idx) => {
                return <MenuItem value={item.id}>{item.vendorName}</MenuItem>;
              })}
            </Select>
          </Grid>
          <Grid item xs={3}>
            <TextField
              type="date"
              fullWidth
              value={startDt}
              onChange={(e) => setStartDt(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              type="date"
              fullWidth
              value={endDt}
              onChange={(e) => setEndDt(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              sx={{ height: "100%" }}
              variant="contained"
              onClick={deliveryListCall}
            >
              검색
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box height={25}></Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>납품번호</TableCell>
            <TableCell>모델명</TableCell>
            <TableCell>배송예정일</TableCell>
            <TableCell>배송완료일</TableCell>
            <TableCell>배송상태</TableCell>
            <TableCell>TC</TableCell>
            <TableCell>기사명</TableCell>
            <TableCell>연락처</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deliveryList.map((item, idx) => {
            return (
              <TableRow>
                <TableCell>{item.deliveryId}</TableCell>
                <TableCell>{item.modelCord}</TableCell>
                <TableCell>{dateUtil.yyyy_mm_dd(item.expectedDeliveryDt,'-')}</TableCell>
                <TableCell>{dateUtil.yyyy_mm_dd(item.deliveryCompletionDt,'-')}</TableCell>
                <TableCell>{item.deliveryState}</TableCell>
                <TableCell>{item.tcName}</TableCell>
                <TableCell>{item.staffName}</TableCell>
                <TableCell>{item.staffPhone}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

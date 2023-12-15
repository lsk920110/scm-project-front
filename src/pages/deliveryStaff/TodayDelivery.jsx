import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import service from "../../utils/requestAxios";
import dateUtil from "../../utils/dateUtil";

export default function TodayDelivery({ changeTitle }) {
  const [deliveryList, setDeliveryList] = useState([]);
  const location = useLocation();
  const [startDt, setStartDt] = useState(dateUtil.getToday());
  const [endDt, setEndDt] = useState(dateUtil.getToday());
  useEffect(() => {
    changeTitle();
    deliveryListCall()
  }, []);
  const deliveryListCall =()=>{
    service
    .get(`/api/delivery/staff/delivery/list`, {
      params: {
        startDt: new Date(startDt),
        endDt: new Date(endDt),
        deliveryStaffId: location.state.staffId,
      },
    })
    .then((res) => {
      setDeliveryList(res.data.result);
    })
    .catch((err) => console.error(err));
  }

  const deliveryState =(state)=>{
    if(state === '1') return '배송전';
    if(state === '2') return '배송완료';
    if(state === '3') return '반품';
  }

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <TextField type="date" fullWidth value={startDt} onChange={e=>setStartDt(e.target.value)}/>
          </Grid>
          <Grid item xs={3}>
            <TextField type="date" fullWidth value={endDt} onChange={e=>setEndDt(e.target.value)}/>
          </Grid>
          <Grid item xs={2}>
            <Button fullWidth sx={{ height: "100%" }} variant="contained"
            onClick={deliveryListCall}
            >
              검색
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>납품번호</TableCell>
            <TableCell>고객명</TableCell>
            <TableCell>주문번호</TableCell>
            <TableCell>배송예정일</TableCell>
            <TableCell>배송완료일</TableCell>
            <TableCell>배송상태</TableCell>
            <TableCell>주소</TableCell>
            {/* <TableCell>배송완료</TableCell>
            <TableCell>반품</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {deliveryList.map((item, idx) => {
            return (
              <TableRow>
                <TableCell>
                  <Link
                    to="/delivery/staff/delivery/detail"
                    state={{
                      deliveryId: item.deliveryId,
                      statementId: item.statementId,
                      orderId: item.orderId,
                    }}
                  >
                    {item.deliveryId}
                  </Link>
                </TableCell>
                <TableCell>{item.customerName}</TableCell>
                <TableCell>{item.orderId}</TableCell>
                <TableCell>{item.expectedDeliveryDt}</TableCell>
                <TableCell>{item.deliveryCompletionDt}</TableCell>
                <TableCell>{deliveryState(item.deliveryState)}</TableCell>
                <TableCell>{`${item.customerAddressFirst} ${item.customerAddressSecond}`}</TableCell>
            
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

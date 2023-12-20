import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import service from "../../utils/requestAxios";
import dateUtil from "../../utils/dateUtil";

const style = {
  marginY: "10px",
};
export default function TodayDeliveryDetail({ changeTitle }) {
  changeTitle();
  const location = useLocation();
  const { statementId, orderId, deliveryId } = location.state;
  //   const [deliveryId , setDeliveryId] = useState(0)
  //   const [orderId,setOrderId] = useState(0)
  const [deliveryReqDt, setDeliveryReqDt] = useState("");
  const [expectedDeliveryDt, setExpectedDeliveryDt] = useState("");
  const [address, setAddress] = useState("");
  const [remarks, setRemarks] = useState("");
  const [modelList, setModelList] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [deliveryCompletionDt, setDeliveryCompletionDt] = useState("");
  const [deliveryState, setDeliveryState] = useState("");
  const deliveryCompletion = (state) => {
    const data = {
      deliveryId: deliveryId,
      state: state,
    };
    service
      .post(`/api/delivery/staff/delivery/completion`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.errorCode === "0000") deliveryDetailCall();
      })
      .catch((err) => console.error(err));
  };

  const deliveryDetailCall = () => {
    service
      .get(`/api/delivery/staff/delivery/detail`, {
        params: {
          statementId: statementId,
          orderId: orderId,
          deliveryId: deliveryId,
        },
      })
      .then((res) => {
        const { errorCode, errorMessage, result } = res.data;
        setCustomerName(result.customerName);
        setAddress(
          `${result.customerAddressFirst} ${result.customerAddressSecond} ${result.customerAddressThird} ${result.customerAddressDetail}`
        );
        setModelList(result.list);
        setExpectedDeliveryDt(result.expectedDeliveryDt);
        setDeliveryCompletionDt(
          !result.deliveryCompletionDt ? "" : result.deliveryCompletionDt
        );
        setDeliveryReqDt(result.deliveryReqDt);
        setRemarks(result.remarks);
        setDeliveryState(result.deliveryState);
      })
      .catch((err) => {
        console.error(err);
        setModelList([]);
      });
  };

  useEffect(() => {
    deliveryDetailCall();
  }, []);
  return (
    <>
      <Paper sx={{ width: "40%", padding: "25px" }}>
        <Typography>
          배송번호,주문번호, 고객정보(이름,연락처,주소들,메모)
        </Typography>
        <TextField
          sx={style}
          fullWidth
          label="배송번호"
          disabled
          value={deliveryId}
        />
        <TextField
          sx={style}
          fullWidth
          label="주문번호"
          disabled
          value={orderId}
        />
        <TextField
          sx={style}
          fullWidth
          label="고객명"
          disabled
          value={customerName}
        />
        <TextField sx={style} fullWidth label="주소" disabled value={address} />
        <TextField sx={style} fullWidth label="메모" disabled value={remarks} />
        <TextField
          sx={style}
          fullWidth
          label="배송요청일"
          disabled
          value={dateUtil.yyyy_mm_dd(deliveryReqDt, "-")}
        />
        <TextField
          sx={style}
          fullWidth
          label="배송예정일"
          disabled
          value={dateUtil.yyyy_mm_dd(expectedDeliveryDt, "-")}
        />
        <TextField
          sx={style}
          fullWidth
          label="배송완료일"
          disabled
          value={deliveryCompletionDt ? dateUtil.yyyy_mm_dd(deliveryCompletionDt, "-") : ''}
        />
        <Table sx={style}>
          <TableHead>
            <TableRow>
              <TableCell>모델코드</TableCell>
              <TableCell>수량</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {modelList.map((item, idx) => {
              return (
                <TableRow>
                  <TableCell>{item.modelCord}</TableCell>
                  <TableCell>{item.totalQuantity}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {deliveryState === "1" ? (
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                fullWidth
                sx={style}
                variant="contained"
                onClick={() => {
                  deliveryCompletion("2");
                }}
              >
                배송완료
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                sx={style}
                variant="contained"
                onClick={() => {
                  deliveryCompletion("3");
                }}
              >
                반품
              </Button>
            </Grid>
          </Grid>
        ) : null}
        {deliveryState === "2" ? (
          <Typography textAlign={"center"} color={"blue"}>
            배송완료
          </Typography>
        ) : null}
        {deliveryState === "3" ? (
          <Typography textAlign={"center"} color={"red"}>
            반품완료
          </Typography>
        ) : null}
      </Paper>
    </>
  );
}

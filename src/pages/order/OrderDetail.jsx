import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import service from "../../utils/requestAxios";
import RegistrationButton from "../component/RegistrationButton";
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import dateUtil from "../../utils/dateUtil";
import StatementProductCordInput from "../component/StatementProductCordInput";
import StatementDetailProductCordInput from "../component/StatementDetailProductCordInput";
const style = {
  marginY: "10px",
};

export default function OrderDetail({ changeTitle }) {
  const location = useLocation();
  // alert('asd : '+ location.state.statementId)
  // const [statementId , setStatementId] =
  const navigate = useNavigate();
  const [vendorList, setVendorList] = useState([]);
  const [vendorId, setVendorId] = useState(0);
  const [productCord, setProductCord] = useState([]);
  const [salesNo, setSalesNo] = useState("");
  const [deliveryReqDt, setDeliveryReqDt] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const [customerAddressFirst, setCustomerAddressFirst] = useState("");
  const [customerAddressSecond, setCustomerAddressSecond] = useState("");
  const [customerAddressThird, setCustomerAddressThird] = useState("");
  const [customerAddressDetail, setCustomerAddressDetail] = useState("");
  const [remarks, setRemarks] = useState("");
  const [cordList, setCordList] = useState([]);
  const [cord, setCord] = useState("");
  const [statementId, setStatemenrId] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const [totalSupplyPrice, setTotalSupplyPrice] = useState(0);
  useEffect(() => {
    changeTitle();
    service
      .get(`/api/vendor/list`, {
        params: { reqIndex: 1, reqCount: 10, keyword: "" },
      })
      .then((res) => {
        setVendorList(res.data.result);
      })
      .catch((err) => console.error(err));
    service
      .get(`/api/order/statement/detail/${location.state.statementId}`, {})
      .then((res) => {
        const { result, errorCode, errorMessage } = res.data;
        setVendorId(result.vendorId);
        setSalesNo(result.salesNo);
        setDeliveryReqDt(dateUtil.yyyy_mm_dd(result.deliveryReqDt, "-"));
        setCustomerName(result.customerName);
        setCustomerPhoneNumber(result.customerPhoneNumber);
        setCustomerAddressFirst(result.customerAddressFirst);
        setCustomerAddressSecond(result.customerAddressSecond);
        setCustomerAddressThird(result.customerAddressThird);
        setCustomerAddressDetail(result.customerAddressDetail);
        setRemarks(result.remarks);
        setStatemenrId(result.id);
        setOrderId(result.orderId === null ? "" : result.orderId);
        let totalPrice = 0;
        result.cordList.forEach((item, idx) => {
          item['keyId'] = new Date().getTime()
          // totalPrice +=
          //   item.supplyPrice *
          //   item.statementProductCordQuantity *
          //   item.productCordDetailQuantity;
        });
        // setTotalSupplyPrice(totalPrice);
        setCordList(result.cordList);
        
      })
      .catch((err) => console.error(err));
  }, []);

  const handleVendorId = (e) => setVendorId(e.target.value);
  const handleSalesNo = (e) => setSalesNo(e.target.value);
  const handleDeliveryReqDt = (e) => setDeliveryReqDt(e.target.value);
  const handleCustomerName = (e) => setCustomerName(e.target.value);
  const handleCustomerPhoneNumber = (e) =>
    setCustomerPhoneNumber(e.target.value);
  const handleCustomerAddressFirst = (e) =>
    setCustomerAddressFirst(e.target.value);
  const handleCustomerAddressSecond = (e) =>
    setCustomerAddressSecond(e.target.value);
  const handleCustomerAddressThird = (e) =>
    setCustomerAddressThird(e.target.value);
  const handleCustomerAddressDetail = (e) =>
    setCustomerAddressDetail(e.target.value);
  const handleRemarks = (e) => setRemarks(e.target.value);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                sx={style}
                fullWidth
                label={"전표번호"}
                value={statementId}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={style}
                fullWidth
                label={"주문번호"}
                value={orderId}
                disabled
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <FormControl fullWidth sx={style}>
                <InputLabel id="demo-simple-select-label">거래선</InputLabel>
                <Select
                  disabled
                  readOnly
                  fullWidth
                  label={"제품 카테고리"}
                  labelId="demo-simple-select-label"
                  value={vendorId}
                  onChange={handleVendorId}
                >
                  {vendorList.map((item, idx) => {
                    return (
                      <MenuItem value={item.id}>{item.vendorName}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={style}
                fullWidth
                label={"판매번호"}
                value={salesNo}
                onChange={handleSalesNo}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={style}
                fullWidth
                label={"배송요청일"}
                InputLabelProps={{ shrink: true }}
                type="date"
                value={deliveryReqDt}
                onChange={handleDeliveryReqDt}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                sx={style}
                fullWidth
                label={"고객명"}
                value={customerName}
                onChange={handleCustomerName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={style}
                fullWidth
                label={"연락처"}
                value={customerPhoneNumber}
                onChange={handleCustomerPhoneNumber}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                sx={{ ...style }}
                fullWidth
                label={"시/도"}
                value={customerAddressFirst}
                onChange={handleCustomerAddressFirst}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ ...style }}
                fullWidth
                label={"군/구"}
                value={customerAddressSecond}
                onChange={handleCustomerAddressSecond}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ ...style }}
                fullWidth
                label={"읍/면/동"}
                value={customerAddressThird}
                onChange={handleCustomerAddressThird}
              />
            </Grid>
          </Grid>
          <TextField
            sx={{ ...style }}
            fullWidth
            label={"상세주소"}
            value={customerAddressDetail}
            onChange={handleCustomerAddressDetail}
          />
          <TextField
            sx={{ ...style }}
            fullWidth
            label={"비고사항"}
            value={remarks}
            onChange={handleRemarks}
          />

          {/* cord part */}
          <StatementDetailProductCordInput
          cord={cord}
          setCord={setCord}
          cordList={cordList}
          setCordList={setCordList}
          vendorId={vendorId}
          />



        </Grid>
        <Grid item xs={4}>
          <RegistrationButton
            onCancel={() => {
              navigate("/order/management");
            }}
            onSave={() => {
              service
                .put(`/api/order/statement`, {
                  // vendorId: vendorId,
                  id: statementId,
                  salesNo: salesNo,
                  deliveryReqDt: new Date(deliveryReqDt),
                  customerName: customerName,
                  customerPhoneNumber: customerPhoneNumber,
                  customerAddressFirst: customerAddressFirst,
                  customerAddressSecond: customerAddressSecond,
                  customerAddressThird: customerAddressThird,
                  customerAddressDetail: customerAddressDetail,
                  remarks: remarks,
                })
                .then((res) => {
                  if (res.data.errorCode === "0000") alert("수정성공");
                })
                .catch((err) => {
                  alert('에러발생')
                  console.error(err)});
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}



function CordPart({cordList,totalSupplyPrice}){
  return (
<Table>
            <TableHead>
              <TableRow>
                {/* <TableCell>check</TableCell> */}
                <TableCell>모델코드</TableCell>
                <TableCell>상품코드</TableCell>

                <TableCell>수량</TableCell>
                <TableCell>단가</TableCell>
                <TableCell>공급가</TableCell>
                {/* <TableCell>부가세</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {cordList.map((cord) => {
                return (
                  <>
                    <TableRow>
                      <TableCell>{cord.productCord}</TableCell>
                      <TableCell>{cord.modelCord}</TableCell>
                      <TableCell>
                        {cord.statementProductCordQuantity *
                          cord.productCordDetailQuantity}
                      </TableCell>
                      <TableCell>
                        {cord.supplyPrice
                          .toString()
                          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                      </TableCell>
                      <TableCell>
                        {(
                          cord.statementProductCordQuantity *
                          cord.productCordDetailQuantity *
                          cord.supplyPrice
                        )
                          .toString()
                          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                      </TableCell>
                      {/* <TableCell>{cord.statementProductCordQuantity * cord.productCordDetailQuantity * cord.supplyPriceVat}</TableCell> */}
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  {totalSupplyPrice
                    .toString()
                    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
  );
}



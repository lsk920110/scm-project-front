import {
  Box,
  FormControl,
  Grid,
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
import React, { useEffect, useState } from "react";
import RegistrationButton from "../component/RegistrationButton";
import service from "../../utils/requestAxios";
import { useNavigate } from "react-router-dom";
import dateUtil from "../../utils/dateUtil";



const style = {
  marginY: "10px",
};
export default function OrderRegistration({ changeTitle }) {
  const navigate = useNavigate()
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
            <Grid item xs={4}>
              <FormControl fullWidth sx={style}>
                <InputLabel id="demo-simple-select-label">거래선</InputLabel>
                <Select
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

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>check</TableCell>
                <TableCell>상품코드</TableCell>
                <TableCell>모델코드</TableCell>
                <TableCell>수량</TableCell>
                <TableCell>공급가</TableCell>
                <TableCell>부가세</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                cordList.map((item,idx)=>{
                  return (
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell>{item.productCord}</TableCell>
                      <TableCell>{item.modelCord}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.supplyPrice}</TableCell>
                      <TableCell>{item.supplyPriceVat}</TableCell>
                    </TableRow>
                  );
                })

              }
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <TextField
                    value={cord}
                    onChange={(e) => {
                      setCord(e.target.value);
                    }}
                    onKeyUp={(e) => {
                      // console.log(e.code)
                      if (e.code === "Enter") {
                        if(vendorId === null || vendorId === undefined || vendorId === 0 || vendorId === "0"){
                          alert('거래선을 선택하세요')
                          return;
                        }
                        service.get("/api/product/cord/detail", {
                          params: {
                            productCord: cord,
                            vendorId: vendorId,
                          },
                        })
                        .then(res=>{
                          const temp = cordList;
                          setCordList([...temp,...res.data.result])
                        })
                        .catch(err=>{})
                        ;
                      }
                    }}
                  />
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Grid>
        <Grid item xs={4}>
          <RegistrationButton
            onCancel={() => {
              navigate('/order/management')
            }}
            onSave={() => {
              service.post(`/api/order/statement`,{
                vendorId : vendorId,
                salesNo : salesNo,
                deliveryReqDt : new Date(deliveryReqDt),
                customerName : customerName,
                customerPhoneNumber : customerPhoneNumber,
                customerAddressFirst : customerAddressFirst,
                customerAddressSecond : customerAddressSecond,
                customerAddressThird : customerAddressThird,
                customerAddressDetail : customerAddressDetail,
                remarks : remarks,
                cordList : cordList
              })
              .then(res=>{
                if(res.data.errorCode === '0000 ') alert('등록성공')
              })
              .catch(err=>console.error(err))
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

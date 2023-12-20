import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../../utils/requestAxios";
import RegistrationButton from "../component/RegistrationButton";
import StatementProductCordInput from "../component/StatementProductCordInput";

const style = {
  marginY: "10px",
};
export default function OrderRegistration({ changeTitle }) {
  const navigate = useNavigate();
  const [vendorList, setVendorList] = useState([]);
  const [vendorId, setVendorId] = useState(0);
  const [productCord, setProductCord] = useState([]);
  const [salesNo, setSalesNo] = useState("");
  const [deliveryReqDt, setDeliveryReqDt] = useState("");
  const [customerName, setCustomerName] = useState("이승규");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("01079076010");
  const [customerAddressFirst, setCustomerAddressFirst] = useState("서울");
  const [customerAddressSecond, setCustomerAddressSecond] = useState("영등포구");
  const [customerAddressThird, setCustomerAddressThird] = useState("대방역");
  const [customerAddressDetail, setCustomerAddressDetail] = useState("아파트");
  const [remarks, setRemarks] = useState("비고사항입니다");
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

  const handleVendorId = (e) => {
    setVendorId(e.target.value);
    setCordList([])
  }
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
          <StatementProductCordInput
          cord={cord}
          cordList={cordList}
          setCord={setCord}
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
                .post(`/api/order/statement`, {list:[{
                  vendorId: vendorId,
                  salesNo: salesNo,
                  deliveryReqDt: new Date(deliveryReqDt),
                  customerName: customerName,
                  customerPhoneNumber: customerPhoneNumber,
                  customerAddressFirst: customerAddressFirst,
                  customerAddressSecond: customerAddressSecond,
                  customerAddressThird: customerAddressThird,
                  customerAddressDetail: customerAddressDetail,
                  remarks: remarks,
                  cordList: cordList,
                }]})
                .then((res) => {
                  if (res.data.errorCode === "0000") {
                    alert("등록성공")
                    navigate(`/order/management`)
                  };
                })
                .catch((err) => console.error(err));
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

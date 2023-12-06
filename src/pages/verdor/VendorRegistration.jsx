import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import RegistrationButton from "../component/RegistrationButton";
import { vendorState } from "../../const/vendorState";
import { useNavigate } from "react-router-dom";
import service from "../../utils/requestAxios";
const style = {
  marginY: "10px",
};
export default function VendorRegistration({changeTitle}) {
  const navigate = useNavigate();
  const [vendorName, setVendorName] = useState("");
  const [contractStartDt, setContractStartDt] = useState("");
  const [contractEndDt, setContractEndDt] = useState("");
  const [state, setState] = useState(1);
  const [businessRegNum, setBusinessRegNum] = useState("");

  const handleVendorName = (e) => setVendorName(e.target.value);
  const handleContractStartDt = (e) => setContractStartDt(e.target.value);
  const handleContractEndDt = (e) => setContractEndDt(e.target.value);
  const handleBusinessRegNum = (e) => {
    if(-1 < parseInt(e.nativeEvent.data) 
    && parseInt(e.nativeEvent.data) < 10){
      setBusinessRegNum(e.target.value)
    }
  };


  const handleState = (e) => setState(e.target.value);
  useEffect(()=>{
    changeTitle()
    const start = new Date(contractStartDt).getTime();
    const end = new Date(contractEndDt).getTime();
    if(start > end){
      alert('시작일은 종료일보다 이전이어야 합니다.');
      setContractEndDt(contractStartDt)
    }
  },[contractStartDt,contractEndDt])
  function onSave() {
    const data = {
      vendorName: vendorName,
      contractStartDt: new Date(contractStartDt),
      contractEndDt: new Date(contractEndDt),
      businessRegNum : businessRegNum,
      state: state,
    };

    service
      .post("/api/vendor/registration", data)
      .then((response) => {
        console.log(response);
        const errorCode = response.data.errorCode;
        const errorMessage = response.data.errorMessage;
        if(response.data.errorCode === '0000') {
          alert('등록이 완료됬습니다.');
          navigate('/vendor/detail',{state : {id : response.data.result.id}})
        } else if (errorCode === '0301' || errorCode === '0302'){
          alert(errorMessage)
          navigate('/login')
        } else if(errorCode === '0400'){
          alert(errorMessage)
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            value={vendorName}
            onChange={handleVendorName}
            sx={style}
            fullWidth
            label={"거래선명"}
          />
          <TextField
            value={contractStartDt}
            onChange={handleContractStartDt}
            sx={style}
            fullWidth
            type={"date"}
            label={"계약시작일"}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            value={contractEndDt}
            onChange={handleContractEndDt}
            sx={style}
            fullWidth
            label={"계약종료일"}
            InputLabelProps={{ shrink: true }}
            type="date"
          />
          <TextField
            value={businessRegNum}
            onChange={handleBusinessRegNum}
            sx={style}
            fullWidth
            label={"사업자등록번호"}
          />
          <FormControl fullWidth sx={style}>
            <InputLabel id="demo-simple-select-label">상태</InputLabel>
            <Select
              fullWidth
              label={"재직상태"}
              labelId="demo-simple-select-label"
              value={state}
              onChange={handleState}
            >
              {vendorState.map((item, idx) => {
                return <MenuItem value={item.id}>{item.state}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <RegistrationButton
            onSave={onSave}
            onCancel={() => {
              navigate("/vendor/management");
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

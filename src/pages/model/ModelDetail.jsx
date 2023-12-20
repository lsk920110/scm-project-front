import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
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
import RegistrationButton from "../component/RegistrationButton";
import { useLocation, useNavigate } from "react-router-dom";
import service from "../../utils/requestAxios";
import { modelState } from "../../const/modelState";
import { responsiveProperty } from "@mui/material/styles/cssUtils";

const style = {
  marginY: "10px",
};
export default function ModelDetail({ changeTitle }) {
  const navigate = useNavigate();

  const location = useLocation();
  const [modelCord, setModelCord] = useState("");

  const [state, setState] = useState(1);
  const handleState = (e) => setState(e.target.value);
  const [categoryId, setCategoryId] = useState(0);
  const handleCategoryId = (e) => setCategoryId(e.target.value);
  const [categoryList, setCategoryList] = useState([]);
  const [nowStock , setNowstock] = useState(0);
  const handleNowStock =e=>setNowstock(e.target.value)
  const [addStock,setAddStock] = useState(0)
  const handleAddStock =e=>setAddStock(e.target.value)
  useEffect(() => {
    changeTitle();
    service
      .get("/api/product/category/list", {
        params: { reqIndex: 1, reqCount: 100 },
      })
      .then((response) => {
        const { errorCode, errorMessage, result } = response.data;
        if (
          errorCode === "0302" ||
          errorCode === "0301" ||
          errorCode === "0303"
        ) {
          alert(errorMessage);
          navigate("/login");
        } else if (errorCode === "0000") {
          setCategoryList(result.list);
          // setCategoryId(result.list[0].id)
        } else {
          alert(errorMessage);
        }
      })
      .catch((err) => console.error(err));
  }, []);
  const modelDetailCall =()=>{
    service
    .get(`/api/model/${location.state.id}`)
    .then((res) => {
      const { errorCode, errorMessage, result } = res.data;

      if (
        errorCode === "0302" ||
        errorCode === "0301" ||
        errorCode === "0303"
      ) {
        alert(errorMessage);
        navigate("/login");
      } else if (errorCode === "0000") {
        setModelCord(result.modelCord);
        setState(result.state);
        setCategoryId(result.categoryId);
        setNowstock(result.stock)
        setAddStock(0)
      } else {
        alert(errorMessage);
      }
    })
    .catch((err) => console.error(err));
  }
  useEffect(() => {
    modelDetailCall()


  }, []);

  const handleModelCord = (e) => {
    setModelCord(e.target.value);
  };
  // const handleStock =e=>setStock(e.target.value)
  const update = () => {
    const data = {
      id : location.state.id,
      categoryId : categoryId,
      state : state,
      modelCord : modelCord,
      stock : addStock
    }
    service.put(`/api/model/${location.state.id}`,data)
    .then((res)=>{
      alert(res.data.errorMessage);
      if(res.data.errorCode === '0000') modelDetailCall();
    })



  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <FormControl fullWidth sx={style}>
            <InputLabel id="demo-simple-select-label">제품 카테고리</InputLabel>
            <Select
              fullWidth
              label={"제품 카테고리"}
              labelId="demo-simple-select-label"
              value={categoryId}
              onChange={handleCategoryId}
            >
              {categoryList.map((item, idx) => {
                return (
                  <MenuItem value={item.id}>{item.productCategory}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={style}>
            <InputLabel id="demo-simple-select-label">상태</InputLabel>
            <Select
              fullWidth
              label={"상태"}
              labelId="demo-simple-select-label"
              value={state}
              onChange={handleState}
            >
              {modelState.map((item, idx) => {
                return <MenuItem value={item.id}>{item.state}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <TextField
            value={modelCord}
            onChange={handleModelCord}
            sx={style}
            fullWidth
            label={"모델코드"}
          />
          <TextField
            value={nowStock}
            onChange={handleNowStock}
            sx={style}
            fullWidth
            disabled
            type="number"
            label={"현재제고"}
          />
          <TextField
            value={addStock}
            onChange={handleAddStock}
            sx={style}
            
            type="number"
            fullWidth
            label={"제고추가"}
          />
        </Grid>
        <Grid item xs={4}>
          <RegistrationButton
            onCancel={() => {
              navigate("/model/management");
            }}
            onSave={update}
          />
        </Grid>
      </Grid>
      {/* <Divider sx={{marginY : '50px'}}/> */}
      {/* <Typography marginY={"50px"}>재고상황</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>날짜</TableCell>
            <TableCell>수량</TableCell>
            <TableCell>증감</TableCell>
            <TableCell>txId</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[].map((item, idx) => {
            return (
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table> */}
    </>
  );
}

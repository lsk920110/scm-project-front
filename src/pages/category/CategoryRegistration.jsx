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
import { useNavigate } from "react-router-dom";
import service from "../../utils/requestAxios";
import State from "../../const/State";





const style = {
  marginY: "10px",
};
export default function CategoryRegistration({ changeTitle }) {
  const [productCategory, setProductCategory] = useState("");
  const handleProductCategory = (e) => {
    setProductCategory(e.target.value);
  };
  const [state,setState] = useState(1)
  const handleState =(e)=>{setState(e.target.value)}
  const navigate = useNavigate();
  useEffect(() => {
    changeTitle();
  }, []);
  const save = () => {
    const data = {
      productCategory: productCategory,
      state : state
    };

    service.post("/api/product/category", data)
    .then((response) => {
      const {errorCode,errorMessage} = response.data
      
      const {id} = response.data.result
      if(errorCode === '0000'){
        alert('등록 성공했습니다.');
        navigate('/category/detail',{state : {id : id}})
      } else if (errorCode === '0301' || errorCode === '0302'){
        alert(errorMessage)
        navigate('/login')
      }
    })
    .catch(err=>console.log(err));
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            value={productCategory}
            onChange={handleProductCategory}
            sx={style}
            fullWidth
            label={"제품 카테고리"}
          />
          <FormControl fullWidth sx={style}>
            <InputLabel id="demo-simple-select-label">부서</InputLabel>
            <Select
              fullWidth
              label={"상태"}
              labelId="demo-simple-select-label"
              value={state}
              onChange={handleState}
            >
              {State.productCategoryState.map((item, idx) => {
                return <MenuItem value={item.id}>{item.state}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <RegistrationButton
            onCancel={() => {
              navigate("/category/management");
            }}
            onSave={save}
          />
        </Grid>
      </Grid>
    </>
  );
}

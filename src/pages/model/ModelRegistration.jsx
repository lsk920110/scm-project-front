import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import RegistrationButton from '../component/RegistrationButton';
import { useNavigate } from 'react-router-dom';
import service from '../../utils/requestAxios';
import { modelState } from '../../const/modelState';
const style = {
    marginY : '10px'
}
export default function ModelRegistration({changeTitle}) {
    const navigate = useNavigate();
    const [modelCord ,setModelCord]=useState('')
    
    const [state,setState] = useState(1)
    const handleState = e=>setState(e.target.value)
    const [categoryId , setCategoryId] = useState(0)
    const handleCategoryId =e=>setCategoryId(e.target.value)
    const [categoryList,setCategoryList] = useState([]);
    useEffect(()=>{

        service.get('/api/product/category/list',{params : {reqIndex : 1, reqCount : 100}})
        .then(response=>{
            console.log(response)
            setCategoryList(response.data.result.list)
            setCategoryId(response.data.result.list[0].id)
        })
        .catch(err=>console.error(err));
    },[])

    const handleModelCord =(e)=>{
        setModelCord(e.target.value);
    }
    // const handleStock =e=>setStock(e.target.value)
    const save=()=>{
        const data = {
            categoryId : categoryId,
            modelCord : modelCord,
            state : state,
            // stock : stock,
        }
        service.post('/api/model',data)
        .then(response=>{
            const {errorCode,errorMessage,result} = response.data;
            if(errorCode ==='0000'){
                alert('등록이 완료됬습니다.')
                navigate('/model/detail',{state : {id : result.id}})
            } else if (errorCode === '0301' || errorCode === '0302'){
                alert(errorMessage);
                navigate('/login')
            } else if(errorCode === '0500'){
                alert(errorMessage)
            }
        })
        .catch(err=>console.error(err));
    }
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
                return <MenuItem value={item.id}>{item.productCategory}</MenuItem>;
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
          
          {/* <TextField
            value={stock}
            onChange={handleStock}
            sx={style}
            
            fullWidth
            label={"재고"}
            type="number"
          /> */}

        </Grid>
        <Grid item xs={4}>
          <RegistrationButton onCancel={()=>{
            navigate('/model/management')
          }} onSave={save} />
        </Grid>
      </Grid></>
  )
}

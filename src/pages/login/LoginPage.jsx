import {
  Box,
  Button,
  Card,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import service from "../../utils/requestAxios";
import { useNavigate } from "react-router-dom";

const textFieldStyle = {
  marginY: "15px",
};
export default function LoginPage() {
  const [id,setId] = useState('')
  const [password,setPassword] = useState('')
  const handleId =(e)=> setId(e.target.value);
  const handlePassword =e=>setPassword(e.target.value);
  const navigate = useNavigate()
  const login =()=>{
    const data = {
      id : id,
      password : password
    }
    service.post('/api/member/login',data)
    .then(response=>{
      if(response.data.errorCode === '0000'){
        const authToken = response.data.result.authToken;
        const name = response.data.result.name;
        const id = response.data.result.id
        localStorage.setItem('auth-token',authToken);
        localStorage.setItem('loginMemberName' , name);
        localStorage.setItem('loginMemberId' , id);
        alert('로그인 성공')
        navigate('/')

      } else {
        alert('로그인 실패')
      }
    })
  }

  return (
    <Box display={"flex"} height={'100vh'}>
      <Card
        sx={{
          width: "500px",
          margin: "auto",
          padding: "20px",
        }}
      >
        <List>
          <ListItemText>
            
            <Typography textAlign={"center"} fontSize={"50px"} marginY={"30px"}>
              S전자 SCM
            </Typography>
          </ListItemText>
          <ListItem>
            <TextField fullWidth placeholder="사원ID" value={id} onChange={handleId}/>
          </ListItem>
          <ListItem>
            <TextField fullWidth placeholder="비밀번호" value={password} onChange={handlePassword}/>
          </ListItem>
          <ListItem>
            <Button fullWidth variant="contained" onClick={login}>
              LOGIN
            </Button>
          </ListItem>
        </List>
      </Card>
    </Box>
  );
}

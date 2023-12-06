import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { memberState } from "../../const/MemberState";
import service from "../../utils/requestAxios";
import RegistrationButton from "../component/RegistrationButton";

const style = {
  marginY: "10px",
};

export default function MemberDetail({changeTitle}) {
  const location = useLocation();
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [state, setState] = useState("");

  const handleDepartment = (e) => setDepartment(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleBirth = (e) => setBirth(e.target.value);
  const handleState = (e) => setState(e.target.value);
  const [departmentList, setDepartmentList] = useState([]);
  const save = () => {
    //birth

    const data = {
      name: name,
      password: password,
      email: email,
      birth: birth,
      departmentId: department,
      state : state,
      id : location.state.id

    };
    console.log(data);
    service
      .put("/api/member/update?id="+data.id, data)
      .then((response) => {
        if(response.data.errorCode === '0000'){
          alert('수정완료되었습니다.')
        } else {
          alert('수정 실패했습니다.')
        }
      })
      .catch((err) => {
        console.error(err)
        alert('수정 실패했습니다.')
      });
  };
  useEffect(() => {
    changeTitle()
    service
      .get("/api/member/department")
      .then((response) => setDepartmentList(response.data.result))
      .catch((err) => console.error(err));
    service
      .get("/api/member/detail?id=" + location.state.id)
      .then((response) => {
        const { result } = response.data;
        setName(result.name);
        // setPassword
        setEmail(result.email);
        setBirth(result.birth);
        setDepartment(result.departmentId);
        setState(result.state)
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={8} md={12}>
          <FormControl fullWidth sx={style}>
            <InputLabel id="demo-simple-select-label">부서</InputLabel>
            <Select
              fullWidth
              label={"부서"}
              labelId="demo-simple-select-label"
              value={department}
              onChange={handleDepartment}
            >
              {departmentList.map((item, idx) => {
                return <MenuItem value={item.id}>{item.department}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <TextField
            value={name}
            onChange={handleName}
            sx={style}
            fullWidth
            label={"이름"}
          />
          <TextField
            value={password}
            onChange={handlePassword}
            sx={style}
            fullWidth
            label={"비밀번호"}
            type="password"
          />
          <TextField
            value={email}
            onChange={handleEmail}
            sx={style}
            fullWidth
            label={"이메일"}
            type="email"
          />
          <TextField
            value={birth}
            onChange={handleBirth}
            sx={style}
            fullWidth
            label={"생년월일"}
          />
          <FormControl fullWidth sx={style}>
            <InputLabel id="demo-simple-select-label">재직상태</InputLabel>
            <Select
              fullWidth
              label={"재직상태"}
              labelId="demo-simple-select-label"
              value={state}
              onChange={handleState}
            >
              {memberState.map((item, idx) => {
                return <MenuItem value={item.id}>{item.state}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <RegistrationButton onSave={save} />
        </Grid>
      </Grid>
    </>
  );
}

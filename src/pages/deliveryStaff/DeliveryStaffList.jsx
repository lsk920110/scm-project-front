import React, { useEffect, useState } from "react";
import service from "../../utils/requestAxios";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function DeliveryStaffList({changeTitle}) {
  changeTitle()
  const [tcList, setTcList] = useState([]);
  const [tc, setTc] = useState(0);
  const [staffName, setStaffName] = useState("");
  const [staffPhone, setStaffPhone] = useState("000-0000-0000");
  const [staffList, setStaffList] = useState([]);
  useEffect(() => {
    service
      .get("/api/delivery/tc")
      .then((res) => {
        setTcList(res.data.result);
        setTc(res.data.result[0].tc);
      })
      .catch((err) => console.error(err));
    service
      .get(`/api/delivery/staff/list`)
      .then((res) => setStaffList(res.data.result))
      .catch((err) => console.error(err));
  }, []);

  const registrationStaff = () => {
    const data = {
      tcId: tc,
      staffName: staffName,
      staffPhone: staffPhone,
    };
    service
      .post(`/api/delivery/staff`, data)
      .then((res) => {
        setStaffList([...staffList, res.data.result]);
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <Grid container spacing={2} sx={{ marginY: "10px" }}>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <FormLabel></FormLabel>
            <Select
              fullWidth
              value={tc}
              onChange={(e) => setTc(e.target.value)}
            >
              {tcList.map((item, idx) => {
                return (
                  <MenuItem value={item.tc}>
                    {item.tc} {item.tcName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            placeholder="이름"
            fullWidth
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            placeholder="연락처"
            fullWidth
            value={staffPhone}
            onChange={(e) => setStaffPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={1}>
          <Button
            variant="contained"
            fullWidth
            sx={{ height: "100%" }}
            onClick={registrationStaff}
          >
            등록
          </Button>
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>TC</TableCell>
            {/* <TableCell>오늘배송건</TableCell>
            <TableCell>내일배송건</TableCell> */}
            <TableCell>기사명</TableCell>
            <TableCell>연락처</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {staffList.map((item, idx) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.tcName}</TableCell>
                {/* <TableCell></TableCell>
                <TableCell></TableCell> */}
                <TableCell>
                  <Link to={"/delivery/staff/delivery/list"} state={{staffId : item.id}}>
                    {item.staffName}
                  </Link>
                </TableCell>
                <TableCell>{item.staffPhone}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

import React, { useEffect, useState } from "react";
import TopTitle from "../component/TopTitle";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import service from "../../utils/requestAxios";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

export default function ProductCordManagement({ changeTitle }) {
  const [vendorId, setVendorId] = useState(0);
  const [vendorList, setVendorList] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    changeTitle();
    service
      .get("/api/vendor/list", {
        params: { keyword: "", reqIndex: 1, reqCount: 100 },
      })
      .then((res) => {
        setVendorList(res.data.result);
      });
  }, []);
  function productCordList() {
    service
      .get(`/api/product/cord`, { params: { keyword: "", vendorId: vendorId } })
      .then((res) => {
        console.log(res);
        setList(res.data.result);
      })
      .catch((err) => console.error(err));
  }
  return (
    <>
      <TopTitle registrationLink={"/cord/registration"} />
      <Grid container spacing={3} marginBottom={"30px"}>
        <Grid item xs={8}>
          <FormControl fullWidth>
            <InputLabel id="vendorLabel">거래선</InputLabel>
            <Select
              label="거래선"
              labelId="vendorLabel"
              onChange={(e) => setVendorId(e.target.value)}
              value={vendorId}
            >
              {vendorList.map((item, idx) => {
                return <MenuItem value={item.id}>{item.vendorName}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Button
            sx={{ height: "100%" }}
            variant="contained"
            color="info"
            fullWidth
            onClick={productCordList}
          >
            검색
          </Button>
        </Grid>
      </Grid>
      <Table>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>거래선</TableCell>
          <TableCell>상품코드</TableCell>
          <TableCell>등록자</TableCell>
          <TableCell>등록일자</TableCell>
        </TableRow>
        {list.map((item, idx) => {
          return (
            <>
              <Row item={item} />
            </>
          );
        })}
      </Table>
    </>
  );
}

function Row({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            size="small"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{item.vendorName}</TableCell>
        <TableCell>{item.productCord}</TableCell>
        <TableCell>{item.regMemberName}</TableCell>
        <TableCell>{item.regDt}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout={"auto"} unmountOnExit>
            <TableBody>
              <TableRow>
                <TableCell>모델명</TableCell>
                <TableCell>수량</TableCell>
                <TableCell>공급가</TableCell>
                <TableCell>부가세</TableCell>
              </TableRow>
              {item.detailList.map((item2, idx) => {
                return (
                  <TableRow>
                    <TableCell>{item2.modelCord}</TableCell>
                    <TableCell>{item2.quantity}</TableCell>
                    <TableCell>{item2.supplyPrice}</TableCell>
                    <TableCell>{item2.supplyPriceVat}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

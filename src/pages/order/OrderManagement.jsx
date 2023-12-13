import React, { useEffect, useState } from "react";
import TopTitle from "../component/TopTitle";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import service from "../../utils/requestAxios";
import dateUtil from "../../utils/dateUtil";
import SetUtil from "../../utils/setUtil";
// import { CheckBox } from "@mui/icons-material";
const style = {
  marginY: "10px",
};
export default function OrderManagement() {
  // const [list, setList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [vendor, setVendor] = useState(0);
  const [searchOption, setSearchOption] = useState(1);
  const [startDt, setStartDt] = useState(dateUtil.getToday());
  const [endDt, setEndDt] = useState(dateUtil.getToday());
  const [keyword, setKeyword] = useState("");
  const [create, setCreate] = useState(1);
  const [allStatementList, setAllstatementList] = useState(new Set());
  const [allCheck, setAllCheck] = useState(false);
  useEffect(() => {
    service
      .get(`/api/vendor/list`, {
        params: { reqIndex: 1, reqCount: 10, keyword: "" },
      })
      .then((res) => {
        setVendorList(res.data.result);
      })
      .catch((err) => console.error(err));
  }, []);

  const [orderList, setOrderList] = useState([]);
  const search = () => {
    const data = {
      vendorId: vendor,
      searchOption: searchOption,
      keyword: keyword,
      startDt: new Date(startDt),
      endDt: new Date(endDt),
      create: create,
    };
    console.log(data);
    service
      .post("/api/order/list", data)
      .then((res) => {
        // setOrderList([])
        setOrderList(res.data.result);
        let temp = new Set();
        res.data.result.forEach((item, idx) => {
          temp.add(item.statementId);
        });
        setAllstatementList(temp);
      })
      .catch((err) => console.error(err));
  };
  const [checkedList, setCheckedList] = useState(new Set());

  const createOrder = () => {
    const data = {
      statementIdList: [...checkedList],
    };
    console.log(data);
    service
      .post("/api/order", data)
      .then((res) => {
        alert(res.data.errorMessage);
      })
      .catch((err) => console.error(err));
  };
  const deleteOrder = () => {
    const data = {
      statementIdList: [...checkedList],
    };
  };
  const deleteStatement = () => {
    const data = {
      statementIdList: [...checkedList],
    };
  };
  return (
    <>
      <TopTitle title={"발주"} registrationLink={"/order/registration"} />
      <Paper sx={{ padding: "30px", marginBottom: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>거래선</InputLabel>
              <Select
                fullWidth
                label={"거래선"}
                labelId=""
                value={vendor}
                onChange={(e) => {
                  setVendor(e.target.value);
                }}
              >
                {vendorList.map((item, idx) => {
                  return <MenuItem value={item.id}>{item.vendorName}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel>검색옵션</InputLabel>
              <Select
                fullWidth
                label={"검색옵션"}
                labelId=""
                defaultValue={1}
                defaultChecked={1}
                value={searchOption}
                onChange={(e) => {
                  setSearchOption(e.target.value);
                }}
              >
                <MenuItem value={1}>전표번호</MenuItem>
                <MenuItem value={2}>주문번호</MenuItem>
                <MenuItem value={3}>납품번호</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={style}>
          <Grid item xs={2}></Grid>
          <Grid item xs={3}>
            <TextField type="date" fullWidth value={startDt} />
          </Grid>
          <Grid item xs={3}>
            <TextField type="date" fullWidth value={endDt} />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel>생성여부</InputLabel>
              <Select
                fullWidth
                label={"생성여부"}
                labelId=""
                defaultValue={1}
                defaultChecked={1}
                value={create}
                onChange={(e) => setCreate(e.target.value)}
              >
                <MenuItem value={1}>전체</MenuItem>
                <MenuItem value={2}>생성</MenuItem>
                <MenuItem value={3}>미생성</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <Button
              fullWidth
              variant="contained"
              sx={{ height: "100%" }}
              onClick={search}
            >
              검색
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Box textAlign={"right"}>
        <Button
          sx={{ marginLeft: "15px" }}
          variant="contained"
          color="info"
          onClick={createOrder}
        >
          주문생성
        </Button>
        <Button
          sx={{ marginLeft: "15px" }}
          variant="contained"
          color="error"
          onClick={deleteOrder}
        >
          주문삭제
        </Button>
        <Button
          sx={{ marginLeft: "15px" }}
          variant="contained"
          color="inherit"
          onClick={deleteStatement}
        >
          전표삭제
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox
                checked={SetUtil.areSetsEqaul(checkedList,allStatementList)}
                onClick={() => {
                  setAllCheck(true);
                  setCheckedList(new Set(allStatementList));
                  if (allCheck) {
                    setAllCheck(false);
                    setCheckedList(new Set());
                  }
                }}
              />
            </TableCell>
            <TableCell>전표번호</TableCell>
            <TableCell>주문번호</TableCell>
            <TableCell>판매번호</TableCell>
            <TableCell>상품코드</TableCell>
            <TableCell>모델코드</TableCell>
            <TableCell>수량</TableCell>
            <TableCell>단가</TableCell>
            <TableCell>합계</TableCell>
            <TableCell>고객명</TableCell>
            <TableCell>TC</TableCell>
            <TableCell>주문생성일</TableCell>
            <TableCell>요구납기일</TableCell>
            <TableCell>배송예정일</TableCell>
            <TableCell>납품번호</TableCell>
            <TableCell>상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((item, idx) => {
            return (
              <Row
                item={item}
                checkedList={checkedList}
                setCheckedList={setCheckedList}
              />
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

function Row({ item, checkedList, setCheckedList }) {

  return (
    <>
      <TableRow
        sx={{ backgroundColor: "lightgrey", borderTop: "1px solid lightgrey" }}
      >
        <TableCell>
          <FormControlLabel
            control={<Checkbox />}
            value={item.statementId}
            checked={checkedList.has(item.statementId)}
            onClick={(e) => {
              let temp = checkedList;
              let value = parseInt(e.target.value);
              console.log(temp);

              if (temp.delete(value)) {
                console.log("있는거 지웠음");
              } else {
                temp.add(value);
              }
              setCheckedList(new Set([...temp]));
            }}
          />
        </TableCell>
        <TableCell>{item.statementId}</TableCell>
        <TableCell>{item.orderId}</TableCell>
        <TableCell>{item.salesNo}</TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>{item.totalQuantity}</TableCell>
        <TableCell></TableCell>
        <TableCell>{item.totalPrice.toLocaleString("ko-KR")}</TableCell>
        <TableCell>{item.customerName}</TableCell>

        <TableCell>TC</TableCell>
        <TableCell>{dateUtil.yyyy_mm_dd(item.orderRegDt, "-")}</TableCell>
        <TableCell>{dateUtil.yyyy_mm_dd(item.deliveryReqDt, "-")}</TableCell>
        <TableCell>
          {dateUtil.yyyy_mm_dd(item.expectedDeliveryDt, "-")}
        </TableCell>
        <TableCell>{item.deliveryId}</TableCell>
        <TableCell>{item.orderState}</TableCell>
      </TableRow>
      {item.cordList.map((cord, idx) => {
        // let quantity = 0;
        // let totalPrice = 0;

        // quantity +=
        //   cord.statementProductCordQuantity * cord.productCordDetailQuantity;
        // totalPrice +=
        //   cord.statementProductCordQuantity *
        //   cord.productCordDetailQuantity *
        //   cord.supplyPrice;
        // setTotalQuantity(quantity);
        // setTotalPrice(totalPrice);
        return (
          <>
            <TableRow
              sx={{
                borderRight: "1px solid lightgrey",
                borderLeft: "1px solid lightgrey",
              }}
            >
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>{cord.productCord}</TableCell>
              <TableCell>{cord.modelCord}</TableCell>
              <TableCell>
                {cord.statementProductCordQuantity *
                  cord.productCordDetailQuantity}
              </TableCell>
              <TableCell>
                {cord.supplyPrice
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
              </TableCell>
              <TableCell>
                {(
                  cord.supplyPrice *
                  cord.statementProductCordQuantity *
                  cord.productCordDetailQuantity
                )
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </>
        );
      })}
    </>
  );
}

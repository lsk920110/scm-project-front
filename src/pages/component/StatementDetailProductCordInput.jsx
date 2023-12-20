import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import service from "../../utils/requestAxios";

export default function StatementDetailProductCordInput({
  cordList,
  setCordList,
  cord,
  vendorId,
  setCord,
}) {
  const controlQuantity = (e) => {
    const temp = cordList;
    temp.forEach((_item, idx) => {
      if (_item.keyId === cord.keyId) {
        console.log(cord.keyId + "||" + _item.keyId);
        _item._quantity = e.target.value;
      }
    });
    setCordList([...temp]);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {/* <TableCell>check</TableCell> */}
          <TableCell>모델코드</TableCell>
          <TableCell>상품코드</TableCell>

          <TableCell>수량</TableCell>
          <TableCell>공급가</TableCell>
          <TableCell>부가세</TableCell>
          {/* <TableCell></TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {cordList.map((cord) => {
          return (
            <>
              <TableRow
              //  sx={{ backgroundColor: "lightgrey" }}
               >
                {/* <TableCell>{cord.keyId}</TableCell> */}
                <TableCell>{cord.modelCord}</TableCell>
                <TableCell>{cord.productCord}</TableCell>
                <TableCell>
                  <Typography
                    // type="number"
                    children={cord.statementProductCordQuantity * cord.quantity}
                    // onChange={controlQuantity}
                    // onAuxClick={controlQuantity}
                  />
                </TableCell>

                <TableCell>{parseInt(cord.supplyPrice).toLocaleString()}</TableCell>
                <TableCell>{parseInt(cord.supplyPriceVat).toLocaleString()}</TableCell>
                <TableCell>

                </TableCell>
              </TableRow>
              {/* {cord.map((detail) => {
                return (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>{detail.modelCord}</TableCell>
                    <TableCell>{detail.quantity * cord.statementProductCordQuantity}</TableCell>
                    <TableCell>{detail.supplyPrice}</TableCell>
                    <TableCell>{detail.supplyPriceVat}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                );
              })} */}
            </>
          );
        })}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>
            <TextField
              value={cord}
              onChange={(e) => {
                setCord(e.target.value);
              }}
              onKeyUp={(e) => {
                // console.log(e.code)
                if (e.code === "Enter") {
                  if (
                    vendorId === null ||
                    vendorId === undefined ||
                    vendorId === 0 ||
                    vendorId === "0"
                  ) {
                    alert("거래선을 선택하세요");
                    return;
                  }
                  service
                    .get("/api/product/cord/detail", {
                      params: {
                        productCord: cord,
                        vendorId: vendorId,
                      },
                    })
                    .then((res) => {
                      console.log(res.data.result);
                      let _result = res.data.result;
                      _result.keyId = new Date().getTime();
                      _result._quantity = 0;
                      cordList.push(res.data.result);
                      let temp = cordList;
                      // temp.push(res.data.result)
                      setCordList([...temp]);
                    })
                    .catch((err) => {});
                }
              }}
            />
          </TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}

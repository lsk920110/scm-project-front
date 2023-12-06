import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../../utils/requestAxios";
import TopTitle from "../component/TopTitle";
import dateUtil from "../../utils/dateUtil";

export default function VendorManagement({ changeTitle }) {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    changeTitle();
    service
      .get("/api/vendor/list", {
        params: { reqIndex: 1, reqCount: 10, keyword: "" },
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.errorCode === "0000") {
          setList(response.data.result);
        } else {
          alert(response.data.errorMessage);
          navigate("/login");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <TopTitle
        title={"거래선관리"}
        registrationLink={"/vendor/registration"}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>거래선명</TableCell>
            <TableCell>사업자등록번호</TableCell>
            <TableCell>계약시작일</TableCell>
            <TableCell>계약종료일</TableCell>
            <TableCell>등록자</TableCell>
            <TableCell>등록일시</TableCell>
            <TableCell>수정자</TableCell>
            <TableCell>수정일시</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item, idx) => {
            return (
              <TableRow>
                <TableCell>
                  <Link to={"/vendor/detail"} state={{ id: item.id }}>
                    {item.id}
                  </Link>
                </TableCell>
                <TableCell>{item.vendorName}</TableCell>
                <TableCell>{item.businessRegNum}</TableCell>
                <TableCell>
                  {dateUtil.yyyy_mm_dd(item.contractStartDt, "-")}
                </TableCell>
                <TableCell>
                  {dateUtil.yyyy_mm_dd(item.contractEndDt, "-")}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {dateUtil.yyyy_mm_dd(item.regDt, "-") +
                    " " +
                    dateUtil.hh_mm_ss(item.regDt, ":")}
                </TableCell>
                <TableCell>{item.updMemberId}</TableCell>
                <TableCell>
                  {item.updDt === null
                    ? ""
                    : dateUtil.yyyy_mm_dd(item.updDt, "-")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

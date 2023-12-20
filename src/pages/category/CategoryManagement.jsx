import React, { useEffect, useState } from "react";
import TopTitle from "../component/TopTitle";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import service from "../../utils/requestAxios";
import dateUtil from '../../utils/dateUtil'
export default function CategoryManagement({ changeTitle }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    changeTitle();
    service
      .get("/api/product/category/list", {
        params: { reqIndex: 1, reqCount: 20 },
        headers: { "auth-token": localStorage.getItem("auth-token") },
      })
      .then((response) => {
        setList(response.data.result.list);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <TopTitle
        title={"제품 카테고리"}
        registrationLink={"/category/registration"}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>카테고리</TableCell>
            <TableCell>상태</TableCell>
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
                  <Link to={"/category/detail"} state={{ id: item.id }}>
                    {item.id}
                  </Link>
                </TableCell>
                <TableCell>{item.productCategory}</TableCell>
                <TableCell>{item.state === '1' ? '정상' : '미운영'}</TableCell>
                <TableCell>{item.regMemberName}</TableCell>
                <TableCell>{dateUtil.yyyy_mm_dd(item.regDt,'-')}</TableCell>
                <TableCell>{item.updMemberName}</TableCell>
                <TableCell>{dateUtil.yyyy_mm_dd(item.updDt,'-')}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>

      </Table>
    </>
  );
}

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

export default function MemberManagement({changeTitle}) {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [totalPaging,setTotalPaging]=useState(1)
  const [nowPage , setNowPage] = useState(1)

  useEffect(() => {
    changeTitle()
    service
      .get("/api/member/list", { params: { reqIndex: nowPage, reqCount: 10 , },headers : {'auth-token' : localStorage.getItem('auth-token')} })
      .then((response) => {
        if (
          response.data.errorCode === "0302" ||
          response.data.errorCode === "0301"
        ) {
          alert(response.data.errorMessage);
          navigate("/login");
        } else if (response.data.errorCode === "0000") {
          setList(response.data.result.list);
          setTotalPaging(response.data.result.paging.totalPaging)
        }
      })
      .catch((err) => console.error(err));
  }, [nowPage]);

  return (
    <>
      <TopTitle registrationLink={"/member/registration"} />
      
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>부서</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>이메일</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>재직상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item, idx) => {
            return (
              <TableRow>
                <TableCell>
                  <Link to={"/member/detail"} state={{ id: item.id }}>
                    {item.id}
                  </Link>
                </TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.birth}</TableCell>
                <TableCell>{item.state}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={6}>
              <Pagination count={totalPaging} 
              hideNextButton
              hidePrevButton
              onChange={(e)=>{setNowPage(parseInt(e.target.outerText))}} sx={{border : '1px solid black', margin : 'auto'}} />
            </TableCell>
          </TableRow>
        </TableFooter>
        <TablePagination></TablePagination> */}
      </Table>
    </>
  );
}

import React, { useEffect, useState } from 'react'
import TopTitle from '../component/TopTitle';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import dateUtil from '../../utils/dateUtil';
import service from '../../utils/requestAxios';

export default function ModelManagement({changeTitle}) {
    const [list ,setList] = useState([])
const navigate = useNavigate()
    useEffect(()=>{
        changeTitle()
        service.get('/api/model/list',{params : {reqIndex : 1 , reqCount : 10}})
        .then(res=>{
            const {errorCode ,errorMessage,result}=res.data
            if(errorCode === '0301' || errorCode === '0302' || errorCode === '0303'){


            } else if (errorCode ==='0000'){
                setList(result.list)

            }
        }).catch(err=>console.error(err));
    },[])
  return (
    <>
    <TopTitle
        title={"모델 등록"}
        registrationLink={"/model/registration"}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>카테고리</TableCell>
            <TableCell>모델코드</TableCell>
            
            <TableCell>등록자</TableCell>
            <TableCell>등록일시</TableCell>
            <TableCell>수정자</TableCell>
            <TableCell>수정일시</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item, idx) => {
            return (
              <TableRow key={item.id}>
                <TableCell>
                  <Link to={"/model/detail"} state={{ id: item.id }}>
                    {item.id}
                  </Link>
                </TableCell>
                <TableCell>{item.productCategory}</TableCell>
                <TableCell>{item.modelCord}</TableCell>
                <TableCell>{item.regMemberName}</TableCell>
                <TableCell>
                  {dateUtil.yyyy_mm_dd(item.regDt, "-") +
                    " " +
                    dateUtil.hh_mm_ss(item.regDt, ":")}
                </TableCell>
                <TableCell>{item.updMemberName}</TableCell>
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
  )
}

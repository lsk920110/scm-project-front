import React, { useEffect, useState } from 'react'
import TopTitle from '../component/TopTitle'
import { Table, TableCell, TableRow } from '@mui/material'
import service from '../../utils/requestAxios'

export default function ProductCordManagement({changeTitle}) {
    const [list,setList] = useState([])
    useEffect(()=>{
        changeTitle()
        service.get(`/api/product/cord`,{params : {keyword : ''}})
        .then(res=>{
            console.log(res)
            setList(res.data.result)
        })
        .catch(err=>console.error(err))
    },[])
  return (
    <>
    <TopTitle registrationLink={'/cord/registration'}/>
    <Table>
    <TableRow>
        <TableCell>거래선</TableCell>
        <TableCell>상품코드</TableCell>
        <TableCell>모델명</TableCell>
        <TableCell>수량</TableCell>
        <TableCell>공급가</TableCell>
        <TableCell>부가세</TableCell>
        <TableCell>등록자</TableCell>
        <TableCell>등록일자</TableCell>
    </TableRow>
    {
        list.map((item,idx)=>{
            return (
                <TableRow>
                    <TableCell>{item.vendorName}</TableCell>
                    <TableCell>{item.productCord}</TableCell>
                    <TableCell>{item.modelCord}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.supplyPrice}</TableCell>
                    <TableCell>{item.supplyPriceVat}</TableCell>
                    <TableCell>{item.regMemberName}</TableCell>
                    <TableCell>{item.regDt}</TableCell>
                </TableRow>
            );
        })
    }

    </Table>
    </>
  )
}

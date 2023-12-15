import React, { useEffect, useState } from 'react'
import service from '../../utils/requestAxios'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

export default function TcList() {
  const [list,setList] = useState([])

  useEffect(()=>{
    service.get('/api/delivery/tc')
    .then(res=>setList(res.data.result))
    .catch(err=>console.error(err))
  },[])
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>TC</TableCell>
            <TableCell>지역</TableCell>
            <TableCell>연락처</TableCell>
            <TableCell>상태</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item,idx)=>{
            return (
              <TableRow>
                <TableCell>{item.tc}</TableCell>
                <TableCell>{item.tcName}</TableCell>
                <TableCell>{item.telephone}</TableCell>
                <TableCell>{item.state === '1' ? '운영중' : '중단'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    
    
    
    
    </>
  )
}

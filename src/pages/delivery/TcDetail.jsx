import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import service from "../../utils/requestAxios";
import {
  Box,
  Button,
  ButtonBase,
  Chip,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

export default function TcDetail() {
  const location = useLocation();
  const tc = location.state.id;
  const [deliveryArea, setDeliveryArea] = useState([]);
  const [area,setArea] = useState('')
  useEffect(() => {
    service
      .get(`/api/delivery/tc/detail`, { params: { tc: tc } })
      .then((res) => {

        let temp = res.data.result.deliveryArea.split('.')
        temp.pop()
        setDeliveryArea(temp);
      })
      .catch((err) => console.error(err));
  }, []);

  const deliveryUpdate =(deliveryAreaList)=>{
    service.post(`/api/delivery/tc/area/update`,{tc : tc , deliveryArea : deliveryAreaList
        })
        .then(res=>{

            let temp = res.data.result.deliveryArea.split('.')
            temp.pop()
            setDeliveryArea(temp);
        })
        .catch(err=>console.error(err))
  }

  return (
    <>
      <Grid container spacing={2} sx={{ marginY: "15px" }}>
        <Grid item xs={6}>
          <TextField fullWidth value={area} onChange={e=>setArea(e.target.value)}/>
        </Grid>
        <Grid item xs={2}>
          <Button fullWidth variant="contained" sx={{ height: "90%" }}
          onClick={()=>deliveryUpdate([...deliveryArea,area+'.'].join('.'))}
          >
            <Typography fontSize={'18px'}>저장</Typography>
          </Button>
        </Grid>
      </Grid>
      <Box>
        {deliveryArea.map((item, idx) => {
          return (
                <Chip label={item} variant="outlined" sx={{margin : '5px'}}
                onDelete={()=>{
                    const deliveryAreaListString = deliveryArea.filter(item2 => item !== item2).join('.')+'.'
                    // console.log(deliveryAreaList.join('.')+'.')
                    deliveryUpdate(deliveryAreaListString)

                }}
                />
              

          );
        })}
      </Box>
    </>
  );
}

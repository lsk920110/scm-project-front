import { Box, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import { Outlet, useNavigate } from 'react-router-dom';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  useEffect(()=>{
    if(index === 0) alert('배송조회')
    if(index === 1) alert('TC')
    if(index === 2) alert('배송기사')
  },[])
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


export default function DeliveryManagement({changeTitle}) {

  const [value, setValue] = React.useState(0);
const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(()=>{
    changeTitle()
    document.getElementById('default').click()
  },[])

  return (
    <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab id='default' label="배송조회" onClick={()=>{navigate('delivery/list')}}/>
        <Tab label="TC" onClick={()=>navigate('tc/list')} />
        {/* <Tab label="배송기사" onClick={()=>navigate('staff/list')}/> */}
      </Tabs>
    </Box>
    <Outlet>

    </Outlet>
    {/* <CustomTabPanel value={value} index={0}>
      Item One
    </CustomTabPanel>
    <CustomTabPanel value={value} index={1}>
      Item Two
    </CustomTabPanel>
    <CustomTabPanel value={value} index={2}>
      Item Three
    </CustomTabPanel> */}
  </Box>
  )
}

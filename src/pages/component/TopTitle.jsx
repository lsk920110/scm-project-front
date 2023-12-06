import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function TopTitle({title,registrationLink}) {
  return (
    <Box marginY={"30px"}>
      <Box display={"flex"} flexDirection={'row-reverse'}>
        {/* <Typography component={"h6"} fontSize={"20px"}>
          {title}
        </Typography> */}
        <Link to={registrationLink}>
          <Button variant="contained">등록</Button>
        </Link>
      </Box>
      {/* <Divider sx={{ marginTop: "10px", marginBottom: "30px" }} /> */}
    </Box>
  );
}

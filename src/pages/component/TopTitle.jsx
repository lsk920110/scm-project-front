import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function TopTitle({title,registrationLink,second}) {
  return (
    <Box marginY={"30px"}>
      <Box display={"flex"} flexDirection={'row-reverse'}>
        <Link to={registrationLink}>
          <Button variant="contained">등록</Button>
        </Link>
        {second}
      </Box>
    </Box>
  );
}

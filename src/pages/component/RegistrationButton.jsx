import { Button, Card, CardActions, CardContent } from "@mui/material";
import React from "react";

export default function RegistrationButton({ onCancel, onSave }) {

  return (
    <Card>
      <CardContent>저장하시겠습니까?</CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="outlined"
          onClick={onCancel}
        >
          취소
        </Button>
        <Button fullWidth variant="contained" onClick={onSave}>
          저장
        </Button>
      </CardActions>
    </Card>
  );
}

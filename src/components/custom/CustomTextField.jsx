import React from "react";
import TextField from "@mui/material/TextField";

function CustomTextField({ InputLabelProps = {}, ...props }) {
  return (
    <TextField
      InputLabelProps={{ ...InputLabelProps, shrink: true}}
      {...props}
      margin="dense"
      variant="outlined"
      fullWidth
      //className="noteClass"
    />
  );
}

export default CustomTextField;
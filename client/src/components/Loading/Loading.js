import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginTop: "200px",
    marginBottom: "200px",
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <CircularProgress color="success" />
    </Box>
  );
};

export default Loading;

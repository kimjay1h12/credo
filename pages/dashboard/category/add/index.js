import React from "react";
import MiniDrawer from "../../../../layouts/Drawer";
import { makeStyles } from "@mui/styles";
import {
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  FormControl,
  Checkbox,
  FormGroup,
  Button,
} from "@mui/material";
const useStyles = makeStyles({
  root: {
    padding: 50,
  },

  content: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
});
function Index() {
  const classes = useStyles();
  return (
    <MiniDrawer active={"category"}>
      <div className={classes.root}>
        <Typography fontWeight={600} mb={2} variant="h5">
          Create category
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={20} md={7}>
            <div className={classes.content}>
              <TextField
                style={{ marginBottom: 20 }}
                label="Title"
                fullWidth
                size="small"
              />
            </div>
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            size="small"
            sx={{ backgroundColor: "#1872F6", color: "#fff", marginTop: 2 }}
          >
            Create Category
          </Button>
        </div>
      </div>
    </MiniDrawer>
  );
}

export default Index;

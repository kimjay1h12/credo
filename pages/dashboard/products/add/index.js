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
  container: {
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "#aaa",
    padding: 15,
    marginTop: 10,
  },
});
function Index() {
  const classes = useStyles();
  return (
    <MiniDrawer active={"product"}>
      <div className={classes.root}>
        <Typography fontWeight={600} mb={2} variant="h5">
          Add products
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
              <TextField
                multiline
                sx={{ marginBottom: 1 }}
                rows={4}
                label="Description"
                fullWidth
                size="small"
              />
              <Typography variant="body2">Image</Typography>
              <TextField
                type="file"
                style={{ marginBottom: 20 }}
                fullWidth
                size="small"
              />
              <TextField
                type="number"
                style={{ marginBottom: 20 }}
                label="Pricing"
                fullWidth
                size="small"
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <TextField
                  label="SKU (Stock keeping unit)"
                  size="small"
                  sx={{ width: "48%" }}
                />
                <TextField
                  label="Quantity available"
                  size="small"
                  sx={{ width: "48%" }}
                />
              </div>
              <TextField
                type="number"
                style={{ marginBottom: 20 }}
                label="Size"
                fullWidth
                size="small"
              />
            </div>
          </Grid>
          <Grid item xs={20} md={5}>
            <div className={classes.content}>
              <Typography>Select Category</Typography>
              <div className={classes.container}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked size="small" />}
                    label="Label"
                  />
                  <FormControlLabel
                    required
                    control={<Checkbox size="small" />}
                    label="Required"
                  />
                  <FormControlLabel
                    disabled
                    control={<Checkbox size="small" />}
                    label="Disabled"
                  />
                </FormGroup>
              </div>
            </div>
            <div className={classes.content}>
              <Typography>Select Category</Typography>
              <div className={classes.container}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox defaultChecked size="small" />}
                    label="Label"
                  />
                  <FormControlLabel
                    required
                    control={<Checkbox size="small" />}
                    label="Required"
                  />
                </FormGroup>
              </div>
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
            Create Product
          </Button>
        </div>
      </div>
    </MiniDrawer>
  );
}

export default Index;

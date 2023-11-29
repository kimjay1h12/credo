import React, { useContext, useState } from "react";
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
  CardMedia,
  CardContent,
  Card,
  CircularProgress,
} from "@mui/material";
import { createAdminCategory } from "../../../../context/actions/categoryAction";
import { GlobalContext } from "../../../../context";
import { useRouter } from "next/router";
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const isImage = (file) => file && file.type.startsWith("image/");
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { cartDispatch, cartegoryDispatch } = useContext(GlobalContext);
  const handleCreateCategory = async () => {
    setLoading(true);

    const res = await createAdminCategory(cartegoryDispatch, {
      title: title,
    });
    if (res) {
      alert("Category Created Successfully");
      Router.back();
    }
    setLoading(false);
  };
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
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                style={{ marginBottom: 10 }}
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
            disabled={title === ""}
            onClick={() => {
              handleCreateCategory();
            }}
            size="small"
            sx={{ backgroundColor: "#1872F6", color: "#fff", marginTop: 2 }}
          >
            {loading ? <CircularProgress /> : " Create Category"}
          </Button>
        </div>
      </div>
    </MiniDrawer>
  );
}

export default Index;

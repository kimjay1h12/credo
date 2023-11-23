import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

import { makeStyles } from "@mui/styles";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../../../context";
import { createAdminCollections } from "../../../../context/actions/collectionAction";
import MiniDrawer from "../../../../layouts/Drawer";
import { uploadHelmper } from "../../../../utility";
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
  imageSelector: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#1872F6",
    borderStyle: "solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
    borderRadius: 5,
    marginBottom: 10,
  },
});
function Index() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const isImage = (file) => file && file.type.startsWith("image/");
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (isImage(file)) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // Clear the selected file and preview if it's not an image
      setSelectedFile(null);
      setPreviewImage(null);
    }
  };
  const [imageUploading, setImageUploading] = useState(false);
  const handleUploadImage = async () => {
    setImageUploading(true);
    const { url } = await uploadHelmper("image");
    setPreviewImage(url);
    console.log(url);
    setImageUploading(false);
  };
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { cartDispatch, cartegoryDispatch } = useContext(GlobalContext);
  const handleCreateCategory = async () => {
    setLoading(true);

    // const { url } = uploadHelmper(selectedFile);
    const res = await createAdminCollections(cartegoryDispatch, {
      title: title,

      imageUrl: previewImage,
    });
    if (res) {
      alert("Category Created Successfully");
      router.back();
    }
    setLoading(false);
  };
  const classes = useStyles();
  return (
    <MiniDrawer active={"category"}>
      <div className={classes.root}>
        <Typography fontWeight={600} mb={2} variant="h5">
          Create Collections
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
              {previewImage && (
                <Card
                  sx={{
                    maxWidth: 345,
                    marginTop: 2,
                    marginBottom: 2,
                    height: 200,
                    // ali
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ objectFit: "contain" }}
                    alt="Preview"
                    height="190"
                    image={previewImage}
                  />
                </Card>
              )}
              <div
                // onClick={() => {
                //   handleUploadImage();
                // }}
                className={classes.imageSelector}
              >
                <Button
                  sx={{
                    backgroundColor: "#1872F6",
                    color: "#fff",
                  }}
                  onClick={() => {
                    handleUploadImage();
                  }}
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  {imageUploading ? (
                    <CircularProgress size={20} sx={{ color: "#fff" }} />
                  ) : (
                    " Upload file"
                  )}
                </Button>
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
            disabled={title === "" || previewImage === ""}
            onClick={() => {
              handleCreateCategory();
            }}
            size="small"
            sx={{ backgroundColor: "#1872F6", color: "#fff", marginTop: 2 }}
          >
            {loading ? (
              <CircularProgress sx={{ color: "#fff" }} />
            ) : (
              " Create Collection"
            )}
          </Button>
        </div>
      </div>
    </MiniDrawer>
  );
}

export default Index;

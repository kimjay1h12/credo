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
import client from "../../../../api/client";
import { GetPaymentInfo } from "../../../../context/actions/paymentAction";
import { useEffect } from "react";
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
  const [formData, setFormData] = useState({
    bankName: "",
    accountName: "",
    accountNumber: "",
    cryptoAddress: "",
    cryptoName: "",
    cryptoBarCodeUrl: "",
    paymentInstruction: "",
  });
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

    setFormData({ ...formData, cryptoBarCodeUrl: url });

    setImageUploading(false);
  };
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    cartDispatch,
    cartegoryDispatch,
    paymentDispatch,
    paymentState: { data },
  } = useContext(GlobalContext);
  console.log(formData);
  const UpdatePaymentInfo = async () => {
    setLoading(true);

    try {
      const res = (
        await client.put("/api/v1/PaymentInfo/updatePaymentInfo", formData)
      ).data;
      if (res) {
        GetPaymentInfo(paymentDispatch);
        alert("Payment info updated successfully");
        router.back();
      }
    } catch (error) {
      alert(error?.response?.data?.message);
      console.log("error updating payment info", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    // if(data[0])
    setFormData({ ...data[0] });
  }, [data]);

  const classes = useStyles();
  return (
    <MiniDrawer active={"paymentsettings"}>
      <div className={classes.root}>
        <Typography fontWeight={600} mb={2} variant="h5">
          Update Payment
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={20} md={6}>
            <div className={classes.content}>
              <TextField
                value={formData.bankName}
                onChange={(e) => {
                  setFormData({ ...formData, bankName: e.target.value });
                }}
                style={{ marginBottom: 30 }}
                label="Bank name"
                fullWidth
                size="small"
              />
              <TextField
                value={formData.accountName}
                onChange={(e) => {
                  setFormData({ ...formData, accountName: e.target.value });
                }}
                style={{ marginBottom: 30 }}
                label="Account  name"
                fullWidth
                size="small"
              />
              <TextField
                value={formData.accountNumber}
                onChange={(e) => {
                  setFormData({ ...formData, accountNumber: e.target.value });
                }}
                style={{ marginBottom: 30 }}
                label="Account  number"
                fullWidth
                size="small"
              />
              <TextField
                value={formData.paymentInstruction}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    paymentInstruction: e.target.value,
                  });
                }}
                style={{ marginBottom: 30 }}
                label="Payment intrusuction"
                fullWidth
                size="small"
              />
            </div>
            <div className={classes.content}>
              <TextField
                value={formData.cryptoAddress}
                onChange={(e) => {
                  setFormData({ ...formData, cryptoAddress: e.target.value });
                }}
                style={{ marginBottom: 30 }}
                label="Crypto wallet  address"
                fullWidth
                size="small"
              />
              <TextField
                value={formData.cryptoName}
                onChange={(e) => {
                  setFormData({ ...formData, cryptoName: e.target.value });
                }}
                style={{ marginBottom: 30 }}
                label="Crypto name"
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
              <Typography gutterBottom>
                Crypto wallet address bar code
              </Typography>
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
            <Button
              fullWidth
              // disabled={title === "" || previewImage === ""}
              onClick={() => {
                UpdatePaymentInfo();
              }}
              variant="contained"
              size="small"
              sx={{ color: "#fff", marginTop: 2 }}
            >
              {loading ? (
                <CircularProgress sx={{ color: "#fff" }} />
              ) : (
                "Update Payment"
              )}
            </Button>
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></div>
      </div>
    </MiniDrawer>
  );
}

export default Index;

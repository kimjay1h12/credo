import React from "react";
import MiniDrawer from "../../../../layouts/Drawer";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  FormControl,
  Checkbox,
  FormGroup,
  Button,
  ButtonBase,
  CircularProgress,
  MenuItem,
  Card,
  CardMedia,
} from "@mui/material";
import { useState } from "react";
import { GlobalContext } from "../../../../context";
import { useContext } from "react";
import { uploadHelmper } from "../../../../utility";
import { createAdminProducts } from "../../../../context/actions/productsActions";
import { useRouter } from "next/router";
import client from "../../../../api/client";
import { useEffect } from "react";
const useStyles = makeStyles({
  root: {
    height: "100%",
    padding: 15,
    ["@media (min-width : 1200px)"]: {
      padding: 50,
    },
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
    borderRadius: 10,
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
const sizes = [
  {
    label: "S",
    value: "s",
  },
  {
    label: "M",
    value: "m",
  },
  {
    label: "L",
    value: "l",
  },
  {
    label: "XL",
    value: "xl",
  },
];
function Index() {
  const classes = useStyles();
  const router = useRouter();

  const { uid } = router.query;
  const [productDetails, setproductDetails] = useState("");
  // console.log(uid);
  const getProductDetails = async () => {
    try {
      const res = (await client.get(`/api/v1/Product/getProductDetails/${uid}`))
        .data;
      console.log("product details", res);
      setproductDetails(res.data);
    } catch (error) {
      console.log("error fetching product details", error.response);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, [uid]);

  useEffect(() => {
    if (productDetails != "") {
      setFormData({
        title: productDetails?.title,
        imageUrls: [
          productDetails?.pictures?.map((cur) => {
            return cur.url;
          }),
        ],
        description: productDetails?.description,
        price: productDetails?.price,
        sku: productDetails?.sku,
        sizeVariant: [...productDetails?.sizeVariant],
        categoryId: [
          ...productDetails?.categories?.map((cur) => {
            return cur.id;
          }),
        ],
        collectionId: [
          ...productDetails?.collections?.map((cur) => {
            return cur.id;
          }),
        ],
        quantityAvailable: productDetails?.quantityAvailable,
      });
    }
  }, [productDetails]);

  const { cartegoryState, collectionsState, productDispatch } =
    useContext(GlobalContext);
  const [formData, setFormData] = useState({
    title: "",
    imageUrls: [],
    description: "",
    price: "",
    sku: "",
    sizeVariant: [],
    categoryId: [],
    collectionId: [],
    quantityAvailable: "",
  });
  const [imageUploading, setImageUploading] = useState(false);

  const handleUploadImage = async () => {
    setImageUploading(true);
    const { url } = await uploadHelmper("image");
    const p = [...formData.imageUrls];
    p.push(url);
    setFormData({
      ...formData,
      imageUrls: p,
    });
    console.log(url);
    setImageUploading(false);
  };
  console.log(formData);
  const [loading, setLoading] = useState(false);
  const HandleUploadProducts = async () => {
    setLoading(true);
    const res = await createAdminProducts(productDispatch, formData);
    if (res) {
      router.back();
    }
    setLoading(false);
  };
  return (
    <MiniDrawer active={"product"}>
      <div className={classes.root}>
        <Typography fontWeight={600} mb={2} variant="h5">
          Edit products
        </Typography>
        <Grid container spacing={6} style={{ maxHeight: "calc(100vh - 64px)" }}>
          <Grid item xs={20} md={7}>
            <div className={classes.content}>
              <TextField
                value={formData.title}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  });
                }}
                style={{ marginBottom: 20 }}
                label="Title"
                fullWidth
                size="small"
              />
              <TextField
                value={formData.description}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  });
                }}
                multiline
                sx={{ marginBottom: 1 }}
                rows={4}
                label="Description"
                fullWidth
                size="small"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                {formData.imageUrls?.length > 0 &&
                  formData.imageUrls?.map((cur, i) => (
                    <Card
                      key={i}
                      sx={{
                        maxWidth: "33%",
                        marginTop: 2,
                        marginBottom: 2,
                        height: 120,
                        display: "flex",
                        // flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",

                        // ali
                      }}
                    >
                      <div key={i}>
                        <div
                          styles={{ position: "absolute", top: 5, right: 10 }}
                        >
                          <ButtonBase
                            onClick={() => {
                              let s = [...formData?.imageUrls];
                              const b = formData?.imageUrls?.indexOf(cur);
                              if (b > -1) s.splice(b, 1);
                              setFormData({
                                ...formData,
                                imageUrls: s,
                              });
                            }}
                          >
                            <DeleteIcon sx={{ color: "red" }} />
                          </ButtonBase>
                        </div>
                        <CardMedia
                          component="img"
                          sx={{ objectFit: "contain" }}
                          alt="Preview"
                          height="120"
                          image={cur}
                        />{" "}
                      </div>
                    </Card>
                  ))}
              </div>
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
                    " Upload Images"
                  )}
                </Button>
              </div>
              <TextField
                type="number"
                style={{ marginBottom: 20 }}
                label="Pricing"
                fullWidth
                size="small"
                value={formData.price}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    price: e.target.value,
                  });
                }}
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
                  value={formData.sku}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      sku: e.target.value,
                    });
                  }}
                  label="SKU (Stock keeping unit)"
                  size="small"
                  sx={{ width: "48%" }}
                />
                <TextField
                  type="number"
                  value={formData.quantityAvailable}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      quantityAvailable: e.target.value,
                    });
                  }}
                  // value={formData.}
                  label="Quantity available"
                  size="small"
                  sx={{ width: "48%" }}
                />
              </div>

              {/* <TextField
                type="number"
                style={{ marginBottom: 20 }}
                label="Size"
                fullWidth
                select
                size="small"
              >
                {sizes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField> */}
            </div>{" "}
            <div className={classes.content}>
              <Typography>Select Sizes</Typography>
              <div className={classes.container}>
                <FormGroup>
                  {sizes.map((cur, b) => (
                    <FormControlLabel
                      onClick={() => {
                        // alert("fghj");
                        let s = [...formData.sizeVariant];
                        const i = formData?.sizeVariant?.indexOf(cur.id);
                        if (i > -1) s.splice(i, 1);
                        else s.push(cur.id);

                        setFormData({
                          ...formData,
                          sizeVariant: s,
                        });
                      }}
                      key={b}
                      control={
                        <Checkbox
                          checked={formData?.sizeVariant?.find(
                            (item) => item === cur.id
                          )}
                          size="small"
                        />
                      }
                      // control={<Checkbox defaultChecked size="small" />}
                      label={cur.label}
                    />
                  ))}
                </FormGroup>
              </div>
            </div>
          </Grid>
          <Grid item xs={20} md={5}>
            <div className={classes.content}>
              <Typography>Select Category</Typography>
              <div className={classes.container}>
                <FormGroup>
                  {[...cartegoryState?.data]?.splice(0, 6)?.map((cur, b) => (
                    <FormControlLabel
                      onClick={() => {
                        // alert("fghj");
                        let s = [...formData.categoryId];
                        const i = formData?.categoryId?.indexOf(cur.id);
                        if (i > -1) s.splice(i, 1);
                        else s.push(cur.id);

                        setFormData({
                          ...formData,
                          categoryId: s,
                        });
                      }}
                      key={b}
                      control={
                        <Checkbox
                          checked={formData?.categoryId?.find(
                            (item) => item === cur.id
                          )}
                          size="small"
                        />
                      }
                      // label={cur.title}
                      // key={i}
                      // control={<Checkbox defaultChecked size="small" />}
                      label={cur.name}
                    />
                  ))}
                </FormGroup>
              </div>
            </div>
            <div className={classes.content}>
              <Typography>Select Collections</Typography>
              <div className={classes.container}>
                <FormGroup>
                  {[...collectionsState?.data]?.splice(0, 6)?.map((cur, b) => (
                    <FormControlLabel
                      onClick={() => {
                        // alert("fghj");
                        let s = [...formData.collectionId];
                        const i = formData?.collectionId?.indexOf(cur.id);
                        if (i > -1) s.splice(i, 1);
                        else s.push(cur.id);

                        setFormData({
                          ...formData,
                          collectionId: s,
                        });
                      }}
                      key={b}
                      control={
                        <Checkbox
                          checked={formData?.collectionId?.find(
                            (item) => item === cur.id
                          )}
                          size="small"
                        />
                      }
                      label={cur.title}
                    />
                  ))}
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
            onClick={() => {
              HandleUploadProducts();
            }}
            sx={{
              // backgroundColor: "#1872F6",
              color: "#fff",
              marginTop: 2,
              width: 200,
            }}
          >
            {" "}
            {imageUploading ? (
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            ) : (
              "Create Product"
            )}
          </Button>
        </div>
      </div>
    </MiniDrawer>
  );
}

export default Index;

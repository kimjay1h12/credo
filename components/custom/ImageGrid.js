// ImageGrid.js

import React from "react";
import { makeStyles } from "@mui/styles";
import { getRandomItems } from "../../utility";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    overflowX: "auto",
    marginTop: 40,

    marginBottom: 30,
    ["@media (min-width : 1200px)"]: {
      // marginTop: "100px",
      padding: 30,
    },
    /* Enable horizontal scrolling on mobile */
  },
  imageContainer: {
    width:
      "calc(33.33% - 20px)" /* Each container takes 1/3 of the width with spacing */,
    boxSizing: "border-box",
    overflow: "hidden",
    margin: "10px" /* Add spacing between images */,
    padding: "10px" /* Add padding to image containers */,
  },
  centerImage: {
    marginTop: "0px",
    ["@media (min-width : 1200px)"]: {
      marginTop: "100px",
    },
  },
  image: {
    width: "100%",
    height: 500,
    display: "block",
    objectFit: "cover",
  },
  mobileImageContainer: {
    width: "100%" /* Each container takes 100% of the width in mobile view */,
  },
}));

const ImageGrid = ({ images }) => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div className={classes.container}>
      {getRandomItems(images)
        ?.splice(0, 3)
        ?.map((image, index) => (
          <div
            key={index}
            className={`${classes.imageContainer} ${
              index === 1 ? classes.centerImage : ""
            } ${
              typeof window !== "undefined" && window.innerWidth <= 768
                ? classes.mobileImageContainer
                : ""
            }`}
          >
            <img
              onClick={() => {
                router.push("/collections/" + image.id);
              }}
              src={image.image}
              alt={`Image ${index + 1}`}
              className={classes.image}
            />
          </div>
        ))}
    </div>
  );
};

export default ImageGrid;

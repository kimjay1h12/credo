import React from "react";
import MiniDrawer from "../../../../layouts/Drawer";
import { Divider, Grid, Typography, Button } from "@mui/material";
import OrderItem from "../../../../components/Orders/OrderItems";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  root: {},
  container: {
    background: "#fff",
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  row: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
function Index() {
  const classes = useStyles();
  return (
    <MiniDrawer active={"orders"}>
      <div style={{ padding: 50, marginTop: 10 }}>
        <Typography gutterBottom variant="h5" fontWeight={600}>
          CR 001
        </Typography>
        <Typography color={"#6A6A6A"}>Sep 11, 2:45PM</Typography>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <div>
              <OrderItem />
              <div className={classes.container}>
                <Typography fontWeight={700}>Pending</Typography>
                <div className={classes.row}>
                  <Typography variant="body2" color={"#6A6A6A"}>
                    Sub Total
                  </Typography>
                  <Typography variant="body2" color={"#6A6A6A"}>
                    $120
                  </Typography>
                </div>
                <div className={classes.row}>
                  <Typography variant="body2" color={"#6A6A6A"}>
                    Shipping
                  </Typography>
                  <Typography variant="body2" color={"#6A6A6A"}>
                    $120
                  </Typography>
                </div>
                <div className={classes.row} style={{ marginBottom: 20 }}>
                  <Typography variant="body2" fontWeight={600}>
                    Total
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    $240
                  </Typography>
                </div>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 15,
                  }}
                >
                  <Button
                    size="small"
                    style={{ background: "#1872F6" }}
                    variant="contained"
                  >
                    Mark as paid
                  </Button>
                </div>
              </div>
              <div className={classes.container}>
                <Typography gutterbuttom fontWeight={700}>
                  Payment
                </Typography>
                <Typography mt={2} mb={2} variant="body2" color="#6A6A6A">
                  Customer selected bank transfer as their payment method
                </Typography>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 15,
                  }}
                >
                  <Button
                    size="small"
                    style={{ background: "#1872F6" }}
                    variant="contained"
                  >
                    Mark as paid
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.container}>
              <div>
                <Typography gutterBottom fontWeight={600}>
                  Customer
                </Typography>
                <Typography mb={4} variant="body2" color={"#6A6A6A"}>
                  1 Order
                </Typography>
              </div>
              <Divider />
              <div style={{ marginTop: 30 }}>
                <Typography gutterBottom fontWeight={600}>
                  Conctact information
                </Typography>
                <Typography gutterBottom variant="body2" color={"#6A6A6A"}>
                  kekl@gmail.com
                </Typography>
                <Typography mb={4} variant="body2" color={"#6A6A6A"}>
                  08123456789
                </Typography>
              </div>
              <Divider />
              <div style={{ marginTop: 30 }}>
                <Typography gutterBottom fontWeight={600}>
                  Shipping address
                </Typography>
                <Typography gutterBottom variant="body2" color={"#6A6A6A"}>
                  21 Ajah street
                </Typography>
                <Typography gutterBottom variant="body2" color={"#6A6A6A"}>
                  Ikeja
                </Typography>
                <Typography gutterBottom variant="body2" color={"#6A6A6A"}>
                  Lagos
                </Typography>
                <Typography mb={4} variant="body2" color={"#6A6A6A"}>
                  Zalom way
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </MiniDrawer>
  );
}

export default Index;

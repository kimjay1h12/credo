import React from "react";
import MiniDrawer from "../../../layouts/Drawer";
import BasicTable from "../../../components/DashBoard/Table";
import { useContext } from "react";
import { GlobalContext } from "../../../context";

function Index() {
  const { orderState } = useContext(GlobalContext);
  return (
    <MiniDrawer active={"orders"}>
      <div style={{ padding: 20, marginTop: 30 }}>
        <BasicTable rows={[...orderState.data]?.reverse()} />
      </div>
    </MiniDrawer>
  );
}

export default Index;

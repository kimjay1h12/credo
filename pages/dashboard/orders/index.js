import React from "react";
import MiniDrawer from "../../../layouts/Drawer";
import BasicTable from "../../../components/DashBoard/Table";

function Index() {
  return (
    <MiniDrawer active={"orders"}>
      <div style={{ padding: 20, marginTop: 30 }}>
        <BasicTable />
      </div>
    </MiniDrawer>
  );
}

export default Index;

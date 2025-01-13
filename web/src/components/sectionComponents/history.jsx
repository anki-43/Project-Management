import { Box } from "@mui/material";
import LeftSideBar from "../LeftSideBar";
import CommonHeader from "./commonHeader";

function History() {
  return (
    <div className="App">
      <Box sx={{ padding: "10px 0 0 40px", flex: 1 }}>
        <CommonHeader className="headerClass" />
      </Box>
      <Box sx={{ display: "flex", gap: "20px", flex: 9, height: "90vh" }}>
        <LeftSideBar></LeftSideBar>
        <Box className="section">History</Box>
      </Box>
    </div>
  );
}

export default History;

import { Box } from "@mui/material";
import LeftSideBar from "../LeftSideBar";

function Activity() {
  return (
    <div className="App">
      <LeftSideBar></LeftSideBar>
      <Box sx={{ flex: 10 }}>History</Box>
    </div>
  );
}

export default Activity;

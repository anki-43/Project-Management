import { Box } from "@mui/material";
import LeftSideBar from "./LeftSideBar";
import { useParams } from "react-router-dom";

function DetailView() {
  const {id} = useParams()
  return (
    <div className="App">
      <LeftSideBar></LeftSideBar>
      <Box sx={{ flex: 10 }}>DetailView + {id}</Box>
    </div>
  );
}

export default DetailView;

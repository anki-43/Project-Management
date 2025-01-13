import { Box } from "@mui/material";
import LeftSideBar from "./LeftSideBar";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function DetailView() {
  const { id } = useParams();

  const project = useSelector((state) =>
    state.projectStore.projectList.find((el) => el.id == id)
  );

  return (
    <div className="App">
      <LeftSideBar></LeftSideBar>
      <Box sx={{ flex: 10 }}>DetailView + {id}</Box>
    </div>
  );
}

export default DetailView;

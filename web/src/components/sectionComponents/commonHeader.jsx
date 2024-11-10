import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMyContext } from "../../MyContext";

function CommonHeader() {
  const { handleOpenProject } = useMyContext();
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}>
      <Typography variant="h3" sx={{ color: "white" }}>
        Project List
      </Typography>
      <div className="headerButtons">
        <Button variant="contained" slots={{ root: "span" }} onClick={() => handleOpenProject(true, false)}>
          <AddIcon />
          <span> New Task</span>
        </Button>
        <Button slots={{ root: "span" }}></Button>
      </div>
    </Box>
  );
}

export default CommonHeader;

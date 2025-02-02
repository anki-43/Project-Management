import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMyContext } from "../../MyContext";
import { Link } from "react-router-dom";

function CommonHeader() {
  const { handleOpenProject } = useMyContext();
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", flex: 1 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <img
          src="../../../assets/images/logo.png"
          alt="logo image"
          height="50px"
          style={{ borderRadius: "8px" }}
        />
        <Typography variant="h3" sx={{ color: "white" }}>
          Project List
        </Typography>
      </Box>
      <div className="headerButtons">
        <Link to={"/create"}>
          <Button variant="contained">
            <AddIcon />
            <span> New Task</span>
          </Button>
        </Link>
      </div>
    </Box>
  );
}

export default CommonHeader;

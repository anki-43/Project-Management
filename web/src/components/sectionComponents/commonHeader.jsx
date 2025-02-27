import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function CommonHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        // flex: 1,
        paddingX: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2 }}>
        <img
          src="../../../assets/images/logo.png"
          alt="logo image"
          height="50px"
          style={{ borderRadius: "8px" }}
        />
        <Typography
          variant="h3"
          sx={{ color: "Black", fontFamily: "sans-serif" }}
        >
          ProjectIT
        </Typography>
      </Box>
      <Link to={"/create"}>
        <Button variant="contained">
          <AddIcon />
          <span> New Task</span>
        </Button>
      </Link>
    </Box>
  );
}

export default CommonHeader;

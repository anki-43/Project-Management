import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { me } from "../../authenticate";
import { Divider, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CommonHeader() {
  const [user, updateUser] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchMe() {
      let user = await me();
      updateUser(user);
    }

    fetchMe();
  }, []);

  const handleLogout = async () => {
    const API_BASE = process.env.REACT_APP_API_URL;
    const response = await axios.get(API_BASE + "/user/logout");
    if (response.data.status) {
      navigate("/");
    } else {
      console.error("Logout failed:", response.data.errorMessage);
    }
  };

  return (
    <>
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
            variant="h4"
            sx={{ color: "Black", fontFamily: "sans-serif" }}
          >
            ProjectIT
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link to={"/create"}>
            <Button variant="contained">
              <AddIcon />
              <span> New Project</span>
            </Button>
          </Link>
          <Typography
            variant="h5"
            sx={{ color: "Black", fontFamily: "sans-serif" }}
          >
            Welcome, {user?.username}
          </Typography>
          <Box>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => handleLogout()}
              aria-label="back"
            >
              <LogoutIcon></LogoutIcon>
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ mt: "10px" }}></Divider>
    </>
  );
}

export default CommonHeader;

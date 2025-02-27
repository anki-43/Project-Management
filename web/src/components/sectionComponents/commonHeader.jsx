import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { me } from "../../authenticate";
import { Divider } from "@mui/material";

function CommonHeader() {
  const [user, updateUser] = useState(undefined);

  useEffect(() => {
    async function fetchMe() {
      let user = await me();
      updateUser(user);
    }

    fetchMe();
  }, []);

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
        </Box>
      </Box>
      <Divider sx={{ mt: "10px" }}></Divider>
    </>
  );
}

export default CommonHeader;

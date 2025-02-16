import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import LeftSideBar from "./LeftSideBar";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useMyContext } from "../MyContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CommonHeader from "./sectionComponents/commonHeader";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function DetailView() {
  const { id } = useParams();

  const [project, setProject] = useState({});

  const fetchProject = async () => {
    const response = await axios.post("http://localhost:8081/proj/project", {
      id: id,
    });
    console.log(response);
    setProject(response.data);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div className="App">
      <Box sx={{ padding: "10px 0 0 40px", flex: 1 }}>
        <CommonHeader className="headerClass" />
      </Box>
      <Box sx={{ display: "flex", gap: "20px", flex: 9, height: "90vh" }}>
        <LeftSideBar></LeftSideBar>
        <Box className="section" sx={{ mt: "20px" }}>
          <Header></Header>
          <Card>
            <CardHeader title={project.projectName}></CardHeader>
            <CardContent>{JSON.stringify(project)}</CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
}

function Header() {
  return (
    <Toolbar sx={{ background: "#f2f2f2", borderRadius: "4px", mb: 3 }}>
      <Link to={"/home"}>
        <IconButton edge="start" color="inherit" aria-label="back">
          <ArrowBackIcon />
        </IconButton>
      </Link>
      <Typography variant="h5" style={{ flexGrow: 1 }}>
        Project Details
      </Typography>
    </Toolbar>
  );
}

export default DetailView;

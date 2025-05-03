import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMyContext } from "../../MyContext.jsx";
import {
  updateCurrentProjectValue,
  deleteProject,
  saveProjectList,
  changeUpdateMode,
} from "../../features/projectDetails/projectStore.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL;

function ProjectCard({ project }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{project?.projectName}</Typography>
        <Typography variant="h6">
          Description : {project?.description}
        </Typography>
        <Typography variant="h6">Budget: ${project?.budget}</Typography>
        <Typography variant="h6">
          Duration: {new Date(project?.startDate).toLocaleDateString()} to{" "}
          {new Date(project?.endDate).toLocaleDateString()}
        </Typography>
        <Footer project={project}></Footer>
      </CardContent>
    </Card>
  );
}

const TodoList = (props) => {
  const dispatch = useDispatch();
  let flag = true;
  const fetchList = async () => {
    const response = await axios.get(API_BASE + "/proj/projectList");
    if (response.data.status) {
      dispatch(saveProjectList(response.data.projects || []));
      flag = true;
    } else {
      flag = true;
    }
  };
  useEffect(() => {
    fetchList();
  }, []);
  const projectList = useSelector((state) => state.projectStore.projectList);
  return (
    <Grid container spacing={2} sx={{ mr: 2 }}>
      {!flag ? (
        <CircularProgress sx={{ margin: "auto" }}></CircularProgress>
      ) : (
        projectList.map((project) => (
          <Grid item xs={12} sm={6} md={4} size={6} key={project.id}>
            <ProjectCard project={project} />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default TodoList;

const Footer = (props) => {
  const dispatch = useDispatch();
  const onDeleteClick = async (id) => {
    const response = await axios.post(API_BASE + "/proj/deleteProject", {
      id: id,
    });

    dispatch(deleteProject(id));
  };

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      padding={1}
      bgcolor="#d1d5de"
      borderTop="1px solid #ddd"
    >
      <Link to={"/editProject/" + props.project.id} key={"editView"}>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
      </Link>
      <Link to={"/detailView/" + props.project.id} key={"detailView"}>
        <IconButton aria-label="view">
          <VisibilityIcon />
        </IconButton>
      </Link>
      <IconButton
        aria-label="delete"
        onClick={() => {
          onDeleteClick(props.project.id);
        }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

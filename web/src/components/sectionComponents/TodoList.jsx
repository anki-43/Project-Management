import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Divider, Box, IconButton, CircularProgress } from "@mui/material";
import Grid from "@mui/material/Grid2";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMyContext } from "../../MyContext.jsx";
import { updateCurrentProjectValue, deleteProject, saveProjectList } from "../../features/projectDetails/projectStore.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <Card className="childSection">
      <CardContent>
        <Typography variant="h4">{project.projectName}</Typography>
        <Typography variant="body1">{project.description}</Typography>
        <Typography variant="h6">Project Manager: {project.projectManager.join(", ")}</Typography>
        <Typography variant="h6">Team Members: {project.teamMembers.join(", ")}</Typography>
        <Typography variant="h6">Budget: ${project.budget}</Typography>
        <Typography variant="h6">
          Duration: {new Date(project.startDate).toLocaleDateString()} to{" "}
          {new Date(project.endDate).toLocaleDateString()}
        </Typography>
        <Footer project={project}></Footer>
      </CardContent>
    </Card>
  );
}

const TodoList = (props) => {
  const dispatch = useDispatch();
  const fetchList = async () => {
    const response = await fetch("http://localhost:8081/proj/projectList");
    const projectList = await response.json();
    dispatch(saveProjectList(projectList))
  };
  useEffect(()=>{
    fetchList();
  }, [])
  const projectList = useSelector((state) => state.projectStore.projectList);
  return (
    <Grid container spacing={2} sx={{ mr: 2 }}>
      { 
      !projectList?.length 
      ? 
        <CircularProgress sx={{margin: 'auto' }}>
        </CircularProgress> 
      : 
      projectList.map((project) => (
        <Grid item xs={12} sm={6} md={4} size={6} key={project.id}>
          <ProjectCard project={project} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TodoList;

const Footer = (props) => {
  const { handleOpenProject } = useMyContext();
  const dispatch = useDispatch();

  const openProjectfromFooter = () => {
    dispatch(updateCurrentProjectValue(props.project));
    handleOpenProject(true, true);
  };

  const onDeleteClick = (id) => {
    dispatch(deleteProject(id));
  };

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      padding={1}
      bgcolor="#f5f5f5"
      borderTop="1px solid #ddd"
    >
      <IconButton aria-label="edit" onClick={() => openProjectfromFooter()}>
        <EditIcon />
      </IconButton>
     <Link to={'/detailView/' + props.project.id} key={'detailView'}>
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

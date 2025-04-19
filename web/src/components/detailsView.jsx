import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LeftSideBar from "./LeftSideBar";
import { useParams } from "react-router-dom";
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
      <Box sx={{ padding: "10px 0 0 40px" }}>
        <CommonHeader className="headerClass" />
      </Box>
      <Box sx={{ display: "flex", gap: "20px", flex: 9, height: "90vh" }}>
        <LeftSideBar></LeftSideBar>
        <Box className="section">
          <Header></Header>
          <Card>
            <CardHeader
              title={project.projectName}
              sx={{ background: "#f2f2f2", padding: "10px" }}
            ></CardHeader>
            <CardContent>
              <Grid container spacing={2}>
                {Object.keys(project).map((el) => {
                  if (
                    [
                      "description",
                      "startDate",
                      "endDate",
                      "budget",
                      "projectManager",
                      "teamMembers",
                    ].includes(el)
                  ) {
                    return (
                      <>
                        <Grid size={4}>
                          <span>{el.toUpperCase()}</span>
                        </Grid>
                        <Grid size={8}>
                          <span>: {project[el]}</span>
                        </Grid>
                      </>
                    );
                  }

                  if (el == "tasks") {
                    return (
                      <>
                        <Grid
                          size={12}
                          sx={{
                            fontWeight: "700",
                            fontSize: "18px",
                            background: "#f2f2f2",
                            padding: "5px",
                          }}
                        >
                          Tasks
                        </Grid>
                        {project[el].map((task) => {
                          return <Task task={task} key={task.id} />;
                        })}
                      </>
                    );
                  }

                  if (el == "milestones") {
                    return (
                      <>
                        <Grid
                          size={12}
                          sx={{
                            fontWeight: "700",
                            fontSize: "18px",
                            background: "#f2f2f2",
                            padding: "5px",
                          }}
                        >
                          Milestones
                        </Grid>
                        {project[el].map((milestone) => {
                          return (
                            <Milestone
                              milestone={milestone}
                              key={milestone.id}
                            />
                          );
                        })}
                      </>
                    );
                  }

                  if (el == "risks") {
                    return (
                      <>
                        <Grid
                          size={12}
                          sx={{
                            fontWeight: "700",
                            fontSize: "18px",
                            background: "#f2f2f2",
                            padding: "5px",
                          }}
                        >
                          Risks
                        </Grid>
                        {project[el].map((risk) => {
                          return <Risk risk={risk} key={risk.id} />;
                        })}
                      </>
                    );
                  }
                })}
              </Grid>
            </CardContent>
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

function Task(props) {
  return (
    <>
      <Grid container spacing={2} size={12}>
        {Object.keys(props.task).map((el) => {
          if (
            [
              "name",
              "description",
              "assignedTo",
              "dueDate",
              "priority",
              "status",
            ].includes(el)
          ) {
            return (
              <>
                <Grid size={4}>
                  <span>{el.toUpperCase()}</span>
                </Grid>
                <Grid size={8}>
                  <span>: {props.task[el]}</span>
                </Grid>
              </>
            );
          }
        })}
      </Grid>
    </>
  );
}

function Risk(props) {
  return (
    <>
      <Grid container spacing={2} size={12}>
        {Object.keys(props.risk).map((el) => {
          if (["description", "impact", "mitigationPlan"].includes(el)) {
            return (
              <>
                <Grid size={4}>
                  <span>{el.toUpperCase()}</span>
                </Grid>
                <Grid size={8}>
                  <span>: {props.risk[el]}</span>
                </Grid>
              </>
            );
          }
        })}
      </Grid>
    </>
  );
}

function Milestone(props) {
  return (
    <>
      <Grid container spacing={2} size={12}>
        {Object.keys(props.milestone).map((el) => {
          if (["name", "dueDate", "status"].includes(el)) {
            return (
              <>
                <Grid size={4}>
                  <span>{el.toUpperCase()}</span>
                </Grid>
                <Grid size={8}>
                  <span>: {props.milestone[el]}</span>
                </Grid>
              </>
            );
          }
        })}
      </Grid>
    </>
  );
}

export default DetailView;

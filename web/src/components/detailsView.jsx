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
      <Box sx={{ padding: "10px 0 0 40px", flex: 1 }}>
        <CommonHeader className="headerClass" />
      </Box>
      <Box sx={{ display: "flex", gap: "20px", flex: 9, height: "90vh" }}>
        <LeftSideBar></LeftSideBar>
        <Box className="section">
          <Header></Header>
          <Card>
            <CardHeader title={project.projectName}></CardHeader>
            <CardContent>
              <List>
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
                      <ListItem key={el}>
                        <ListItemText
                          primary={`${el.toUpperCase()} : ${project[el]}`}
                          key={el}
                        />
                      </ListItem>
                    );
                  }

                  if (el == "tasks") {
                    return (
                      <ListItem key={el}>
                        {project[el].map((task) => {
                          return (
                            <ListItemText
                              primary={<Task task={task} />}
                              key={el}
                            />
                          );
                        })}
                      </ListItem>
                    );
                  }

                  if (el == "milestones") {
                    return (
                      <ListItem key={el}>
                        {project[el].map((milestone) => {
                          return (
                            <ListItemText
                              primary={
                                <Milestone milestone={milestone} key={el} />
                              }
                            />
                          );
                        })}
                      </ListItem>
                    );
                  }

                  if (el == "risks") {
                    return (
                      <ListItem key={el}>
                        {project[el]?.map((risk) => {
                          return (
                            <ListItemText primary={<Risk risk={risk} />} />
                          );
                        })}
                      </ListItem>
                    );
                  }
                  return <span style={{ display: "none" }}></span>;
                })}
              </List>
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
    <Box>
      <List>
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
              <ListItem key={el}>
                <ListItemText
                  primary={`${el.toUpperCase()} : ${props.task[el]}`}
                />
              </ListItem>
            );
          }

          return <span style={{ display: "none" }}></span>;
        })}
      </List>
    </Box>
  );
}

function Risk(props) {
  <Box>
    <List>
      {Object.keys(props.risk).map((el) => {
        if (["description", "impact", "mitigationPlan"].includes(el)) {
          return (
            <ListItem key={el}>
              <ListItemText
                primary={`${el.toUpperCase()} : ${props.risk[el]}`}
              />
            </ListItem>
          );
        }

        return <span style={{ display: "none" }}></span>;
      })}
    </List>
  </Box>;
}

function Milestone(props) {
  <Box>
    <List>
      {Object.keys(props.milestone).map((el) => {
        if (["name", "dueDate", "status"].includes(el)) {
          return (
            <ListItem key={el}>
              <ListItemText
                primary={`${el.toUpperCase()} : ${props.milestone[el]}`}
              />
            </ListItem>
          );
        }

        return <span style={{ display: "none" }}></span>;
      })}
    </List>
  </Box>;
}

export default DetailView;

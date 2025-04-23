import { useFormik, Field, Form, FieldArray, Formik } from "formik";
import { styled } from "@mui/material/styles";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  IconButton,
  Chip,
  Box,
  Paper,
  Typography,
  Toolbar,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { AddCircle as AddCircleIcon } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useMyContext } from "../MyContext";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CommonHeader from "./sectionComponents/commonHeader";
import LeftSideBar from "./LeftSideBar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditProject() {
  const [currentProject, setProject] = useState({});
  const { id } = useParams();

  const fetchProject = async () => {
    const response = await axios.post("http://localhost:8081/proj/project", {
      id: id,
    });

    const projectData = response.data.project;

    setProject({
      ...projectData,
      projectManager: [projectData.projectManager],
      teamMembers: projectData.teamMembers,
      risks: projectData.risks?.length
        ? projectData.risks
        : [{ id: uuidv4(), description: "", impact: "", mitigationPlan: "" }],
      milestones: projectData.milestones?.length
        ? projectData.milestones.map((el) => {
            return {
              ...el,
              dueDate: dayjs(el.dueDate).format("YYYY-MM-DD"),
            };
          })
        : [{ id: uuidv4(), name: "", dueDate: null, status: "" }],
      tasks: projectData.tasks?.length
        ? projectData.tasks.map((el) => {
            return {
              ...el,
              dueDate: dayjs(el.dueDate).format("YYYY-MM-DD"),
            };
          })
        : [
            {
              id: uuidv4(),
              name: "",
              description: "",
              assignedTo: "",
              dueDate: null,
              priority: "",
              status: "",
            },
          ],
    });
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
        {Object.keys(currentProject).length ? (
          <Box className="section" sx={{ mt: "20px" }}>
            <Formheader></Formheader>
            <AppForm
              currentProject={currentProject}
              setProject={setProject}
            ></AppForm>
          </Box>
        ) : (
          <Box className="section" sx={{ mt: "20px" }}>
            Error
          </Box>
        )}
      </Box>
    </div>
  );
}

function Formheader() {
  const { handleOpenProject } = useMyContext();
  return (
    <Toolbar
      sx={{ background: "#f2f2f2", borderRadius: "4px", mr: 3, ml: 3, mb: 3 }}
    >
      <Link to={"/home"}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => handleOpenProject(false, false)}
          aria-label="back"
        >
          <ArrowBackIcon />
        </IconButton>
      </Link>
      <Typography variant="h5" style={{ flexGrow: 1 }}>
        Edit a Project
      </Typography>
    </Toolbar>
  );
}

const projectManagers = ["Alice", "Bob", "Charlie"];
const teamMembers = ["David", "Eva", "Frank"];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function AppForm(props) {
  const navigate = useNavigate();
  const onSubmitForm = async (formObj) => {
    const response = await axios.post(
      "http://localhost:8081/proj/updateProject",
      { ...formObj }
    );
    props.setProject(response.data);

    if (response.status) {
      navigate("/home");
    }
  };

  console.log(props.currentProject);
  return (
    <Container
      component="main"
      sx={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        maxWidth: "none !important",
      }}
    >
      <Paper sx={{ padding: 3 }}>
        <Formik
          initialValues={props.currentProject}
          onSubmit={(values) => {
            let formObj = {
              ...values,
              startDate: values.startDate,
              endDate: values.endDate,
              milestones: values.milestones.map((el) => {
                return {
                  ...el,
                  dueDate: el.dueDate,
                };
              }),
              tasks: values.tasks.map((el) => {
                return {
                  ...el,
                  dueDate: el.dueDate,
                };
              }),
            };
            onSubmitForm(formObj);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} size={12}>
                  <Field
                    as={TextField}
                    label="Project Name"
                    name="projectName"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} size={6}>
                  <Field name="startDate">
                    {({ field, form }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ width: "100%" }}
                          label="Start Date"
                          value={dayjs(field.value)}
                          onChange={(date) =>
                            form.setFieldValue("startDate", date)
                          }
                          renderInput={(params) => (
                            <TextField {...params} fullWidth />
                          )}
                        />
                      </LocalizationProvider>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={6} size={6}>
                  <Field name="endDate">
                    {({ field, form }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          sx={{ width: "100%" }}
                          label="End Date"
                          value={dayjs(field.value)}
                          onChange={(date) =>
                            form.setFieldValue("endDate", date)
                          }
                          renderInput={(params) => (
                            <TextField {...params} fullWidth />
                          )}
                        />
                      </LocalizationProvider>
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} size={6}>
                  <FormControl fullWidth>
                    <InputLabel>Project Manager</InputLabel>
                    <Field
                      as={Select}
                      name="projectManager"
                      label="Project Manager"
                    >
                      {projectManagers.map((manager) => (
                        <MenuItem key={manager} value={manager}>
                          {manager}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12} size={6}>
                  <FormGroup>
                    <FormControl fullWidth>
                      <InputLabel>Team Members</InputLabel>
                      <Field
                        as={Select}
                        name="teamMembers"
                        // multiple
                        label="Team Members"
                      >
                        {teamMembers.map((member) => (
                          <MenuItem key={member} value={member}>
                            {member}
                          </MenuItem>
                        ))}
                      </Field>
                    </FormControl>
                  </FormGroup>
                </Grid>
                <Grid item xs={12} size={6}>
                  <Field
                    as={TextField}
                    label="Budget"
                    name="budget"
                    fullWidth
                    type="number"
                  />
                </Grid>
                <Grid item xs={12} size={12}>
                  <Field
                    as={TextField}
                    label="Description"
                    name="description"
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FieldArray name="milestones">
                    {({ push, remove }) => (
                      <div>
                        <Button
                          startIcon={<AddCircleIcon />}
                          onClick={() =>
                            push({
                              id: uuidv4(),
                              name: "",
                              dueDate: null,
                              status: "",
                            })
                          }
                          variant="outlined"
                          sx={{ mb: 2 }}
                        >
                          Add Milestone
                        </Button>
                        {values?.milestones?.map((milestone, index) => (
                          <Grid
                            container
                            spacing={2}
                            key={milestone.id}
                            sx={{ mb: 2 }}
                          >
                            <Grid item xs={12} size={12}>
                              <Field
                                as={TextField}
                                label="Milestone Name"
                                name={`milestones[${index}].name`}
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={6} size={6}>
                              <Field name={`milestones[${index}].dueDate`}>
                                {({ field, form }) => (
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DatePicker
                                      sx={{ width: "100%" }}
                                      label="Due Date"
                                      value={dayjs(field.value)}
                                      onChange={(date) =>
                                        form.setFieldValue(
                                          `milestones[${index}].dueDate`,
                                          date
                                        )
                                      }
                                      renderInput={(params) => (
                                        <TextField {...params} fullWidth />
                                      )}
                                    />
                                  </LocalizationProvider>
                                )}
                              </Field>
                            </Grid>
                            <Grid item xs={6} size={6}>
                              <Field
                                as={TextField}
                                label="Status"
                                name={`milestones[${index}].status`}
                                fullWidth
                              />
                            </Grid>
                            <Grid item xs={12} size={12}>
                              <Button
                                color="error"
                                onClick={() => remove(index)}
                                variant="contained"
                              >
                                Remove Milestone
                              </Button>
                            </Grid>
                          </Grid>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                </Grid>
                <Grid item xs={12}>
                  <FieldArray name="tasks">
                    {({ push, remove }) => (
                      <div>
                        <Button
                          startIcon={<AddCircleIcon />}
                          onClick={() =>
                            push({
                              id: uuidv4(),
                              name: "",
                              description: "",
                              assignedTo: "",
                              dueDate: null,
                              priority: "",
                              status: "",
                            })
                          }
                          variant="outlined"
                          sx={{ mb: 2 }}
                        >
                          Add Task
                        </Button>
                        {values?.tasks?.map((task, index) => (
                          <Grid
                            container
                            spacing={2}
                            key={task.id}
                            sx={{ mt: 2 }}
                          >
                            <Grid xs={12} size={12}>
                              <Field
                                as={TextField}
                                label="Task Name"
                                name={`tasks[${index}].name`}
                                fullWidth
                              />
                            </Grid>
                            <Grid xs={12} size={12}>
                              <Field
                                as={TextField}
                                label="Description"
                                name={`tasks[${index}].description`}
                                fullWidth
                              />
                            </Grid>
                            <Grid xs={12} size={6}>
                              <FormControl fullWidth>
                                <InputLabel>Assigned To</InputLabel>
                                <Field
                                  as={Select}
                                  name={`tasks[${index}].assignedTo`}
                                  label="Assigned To"
                                >
                                  {teamMembers.map((member) => (
                                    <MenuItem key={member} value={member}>
                                      {member}
                                    </MenuItem>
                                  ))}
                                </Field>
                              </FormControl>
                            </Grid>
                            <Grid xs={12} size={6}>
                              <Field name={`tasks[${index}].dueDate`}>
                                {({ field, form }) => (
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DatePicker
                                      sx={{ width: "100%" }}
                                      label="Due Date"
                                      value={dayjs(field.value)}
                                      onChange={(date) =>
                                        form.setFieldValue(
                                          `tasks[${index}].dueDate`,
                                          date
                                        )
                                      }
                                      renderInput={(params) => (
                                        <TextField {...params} fullWidth />
                                      )}
                                    />
                                  </LocalizationProvider>
                                )}
                              </Field>
                            </Grid>
                            <Grid xs={12} size={6}>
                              <Field
                                as={TextField}
                                label="Priority"
                                name={`tasks[${index}].priority`}
                                fullWidth
                              />
                            </Grid>
                            <Grid xs={12} size={6}>
                              <Field
                                as={TextField}
                                label="Status"
                                name={`tasks[${index}].status`}
                                fullWidth
                              />
                            </Grid>
                            <Grid xs={12} size={12}>
                              <Button
                                color="error"
                                onClick={() => remove(index)}
                                variant="contained"
                                sx={{ marginTop: 1 }}
                              >
                                Remove Task
                              </Button>
                            </Grid>
                          </Grid>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                </Grid>
                <Grid item xs={12} sx={{ width: "100%" }}>
                  <FieldArray name="risks">
                    {({ push, remove }) => (
                      <div>
                        <Button
                          startIcon={<AddCircleIcon />}
                          onClick={() =>
                            push({
                              id: uuidv4(),
                              description: "",
                              impact: "",
                              mitigationPlan: "",
                            })
                          }
                          variant="outlined"
                          sx={{ mb: 2 }}
                        >
                          Add Risk
                        </Button>
                        {values?.risks?.map((risk, index) => (
                          <Box key={risk.id} sx={{ marginBottom: 2 }}>
                            <Field
                              as={TextField}
                              label="Description"
                              name={`risks[${index}].description`}
                              fullWidth
                              sx={{ mb: 1 }}
                            />
                            <Field
                              as={TextField}
                              label="Impact"
                              name={`risks[${index}].impact`}
                              fullWidth
                              sx={{ mb: 1 }}
                            />
                            <Field
                              as={TextField}
                              label="Mitigation Plan"
                              name={`risks[${index}].mitigationPlan`}
                              fullWidth
                            />
                            <Button
                              color="error"
                              onClick={() => remove(index)}
                              variant="contained"
                              sx={{ marginTop: 1 }}
                            >
                              Remove Risk
                            </Button>
                          </Box>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                </Grid>

                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}

export default EditProject;

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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector, useDispatch } from "react-redux";
import { addToProjectsList } from "../features/projectDetails/projectStore";
import { useMyContext } from "../MyContext";
import dayjs from "dayjs";

function CreateProject() {
  return (
    <div
      className="childSection"
      style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      <Formheader></Formheader>
      <AppForm></AppForm>
    </div>
  );
}

function Formheader() {
  const { handleOpenProject } = useMyContext();
  return (
    <Toolbar
      sx={{ background: "#f2f2f2", borderRadius: "4px", mr: 3, ml: 3, mb: 3 }}
    >
      <IconButton
        edge="start"
        color="inherit"
        onClick={() => handleOpenProject(false, false)}
        aria-label="back"
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h5" style={{ flexGrow: 1 }}>
        Create a Project
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

const initialValues = {
  id: uuidv4(),
  projectName: "",
  description: "",
  startDate: null,
  endDate: null,
  projectManager: [""],
  teamMembers: [""],
  budget: "",
  milestones: [{ id: uuidv4(), name: "", dueDate: null, status: "" }],
  tasks: [
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
  risks: [{ id: uuidv4(), description: "", impact: "", mitigationPlan: "" }],
  attachments: [],
};

function AppForm() {
  const handleFileChange = (event, setFieldValue) => {
    setFieldValue("attachments", [...event.target.files]);
  };

  const currentProject = useSelector((state) => {
    let currentObj = state.projectStore.currentProject;
    let formObj = {
      ...currentObj,
      startDate: dayjs(currentObj.startDate),
      endDate: dayjs(currentObj.endDate),
      milestones: currentObj.milestones
        ? currentObj.milestones.map((el) => {
            return {
              ...el,
              dueDate: dayjs(el.dueDate),
            };
          })
        : [],
      tasks: currentObj.tasks
        ? currentObj.tasks.map((el) => {
            return {
              ...el,
              dueDate: dayjs(el.dueDate),
            };
          })
        : [],
    };
    return formObj;
  });
  const updateMode = useSelector((state) => state.projectStore.updateMode);

  const dispatch = useDispatch();
  const { handleOpenProject } = useMyContext();

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
          initialValues={updateMode ? currentProject : initialValues}
          onSubmit={(values) => {
            let formObj = {
              ...values,
              startDate: values.startDate.format("YYYY-MM-DD"),
              endDate: values.endDate.format("YYYY-MM-DD"),
              milestones: values.milestones.map((el) => {
                return {
                  ...el,
                  dueDate: el.dueDate.format("YYYY-MM-DD"),
                };
              }),
              tasks: values.tasks.map((el) => {
                return {
                  ...el,
                  dueDate: el.dueDate.format("YYYY-MM-DD"),
                };
              }),
            };
            dispatch(addToProjectsList(formObj));
            handleOpenProject(false, false);
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
                          value={field.value}
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
                          value={field.value}
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
                        multiple
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
                        {values.milestones.map((milestone, index) => (
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
                                      value={field.value}
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
                        {values.tasks.map((task, index) => (
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
                                      value={field.value}
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
                        {values.risks.map((risk, index) => (
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
                <Grid item xs={12} sx={{ width: "100%", textAlign: "center" }}>
                  <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload files
                    <VisuallyHiddenInput
                      type="file"
                      multiple
                      onChange={(event) =>
                        handleFileChange(event, setFieldValue)
                      }
                    />
                  </Button>
                  {!!values.attachments.length &&
                    Array.from(values.attachments).map((file, index) => (
                      <Box key={index} sx={{ marginTop: 1 }}>
                        <Chip label={file.name} />
                      </Box>
                    ))}
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

export default CreateProject;

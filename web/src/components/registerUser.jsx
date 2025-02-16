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
  Alert,
} from "@mui/material";
import { useFormik, Field, Form, FieldArray, Formik } from "formik";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { Link } from "react-router-dom";

function Registeruser() {
  let [initialValues, setInitialValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmedpassword: "",
  });

  let [errorInSubmitForm, setErrorInSubmitForm] = useState(false);

  const submitRegisterForm = () => {
    initialValues = {
      username: "",
      email: "",
      password: "",
      confirmedpassword: "",
    };
    setErrorInSubmitForm(true);
    console.log(errorInSubmitForm);
  };
  return (
    <div className="App login">
      <Box
        sx={{
          background: "white",
          margin: "auto",
          borderRadius: 1,
          width: "33%",
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={() => submitRegisterForm(initialValues)}
        >
          <Form>
            <Grid className="form" container spacing={2} sx={{ padding: 6 }}>
              <Grid
                item
                xs={12}
                size={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  fontSize: 20,
                }}
              >
                <label htmlFor="username">Username</label>
                <TextField
                  id="username"
                  name="username"
                  placeholder="Enter username"
                ></TextField>
              </Grid>
              <Grid
                item
                xs={12}
                size={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  fontSize: 20,
                }}
              >
                <label htmlFor="email">Email</label>
                <TextField
                  id="email"
                  name="email"
                  placeholder="Enter email"
                ></TextField>
              </Grid>
              <Grid
                item
                xs={12}
                size={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  fontSize: 20,
                }}
              >
                <label htmlFor="password">Password</label>
                <TextField
                  id="password"
                  name="password"
                  placeholder="Enter password"
                ></TextField>
              </Grid>
              <Grid
                item
                xs={12}
                size={12}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  fontSize: 20,
                }}
              >
                <label htmlFor="confirmedPassword">Confirm Password</label>
                <TextField
                  id="confirmedPassword"
                  type="password"
                  name="confirmedPassword"
                  placeholder="Confirm Password"
                ></TextField>
              </Grid>

              <Grid item xs={12} sx={{ margin: "auto", width: "100%" }}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ width: "100%" }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
        <Box>
          {errorInSubmitForm ? (
            <Alert severity="error">Enter Valid Fields</Alert>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Registeruser;

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

function Login() {
  let [initialValues, setInitialValues] = useState({
    username: "",
    password: "",
  });

  let [errorInSubmitForm, setErrorInSubmitForm] = useState(false);

  const submitLoginForm = () => {
    initialValues = {
      username: "",
      password: "",
    };
    setErrorInSubmitForm(true);
    console.log(errorInSubmitForm);
  };
  return (
    <div className="App">
      <Box sx={{ background: "white", margin: "auto", marginBottom: "20%", width: "30%" }}>
        <Formik initialValues={initialValues} onSubmit={() => submitLoginForm(initialValues)}>
          <Form>
            <Grid container spacing={2} sx={{ padding: 8 }}>
              <Grid item xs={12} size={12} sx={{ display: "flex", flexDirection: "column", gap: 2, fontSize: 20 }}>
                <label htmlFor="username">Username</label>
                <TextField id="username" name="username" placeholder="Enter username or Email"></TextField>
              </Grid>
              <Grid item xs={12} size={12} sx={{ display: "flex", flexDirection: "column", gap: 2, fontSize: 20 }}>
                <label htmlFor="password">Password</label>
                <TextField id="password" name="password" placeholder="Enter password"></TextField>
              </Grid>
              <Grid item xs={12} sx={{ margin: "auto" }}>
                <Button type="submit" variant="contained">
                  Login
                </Button>
                </Grid>
                <Grid item xs={12} sx={{ margin: "auto" }}>
                  <Link to={'/register'}>
                    <Button  variant="contained">
                      Register
                    </Button>
                  </Link>
              </Grid>
            </Grid>
          </Form>
        </Formik>
        <Box>
          {errorInSubmitForm ? (
            <Alert severity="error">
              Account doesn't exist. Please <a href="/register">Create an Acoount</a>
            </Alert>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Login;

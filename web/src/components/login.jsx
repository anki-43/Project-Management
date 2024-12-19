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
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  let initialValues = {
    username: '',
    password: ''
  }

  let [errorInSubmitForm, setErrorInSubmitForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function loginUser(payload) {
    try {
      const response = await axios.post(
        "http://localhost:8081/user/login",
        {
          username: payload.username,
          password: payload.password
        }
      );
      if(response){
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const submitLoginForm = (payload) => {
    loginUser(payload);
  };
  
  return (
    <div className="App">
      <Box
        sx={{
          background: "white",
          margin: "auto",
          borderRadius: 3
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            submitLoginForm(values);
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <Grid container spacing={2} sx={{ padding: 8 }}>
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
                    value={values.username}
                    onChange={handleChange}
                    id="username"
                    name="username"
                    placeholder="Enter username or Email"
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
                    value={values.password}
                    type="password"
                    onChange={handleChange}
                    id="password"
                    name="password"
                    placeholder="Enter password"
                  ></TextField>
                </Grid>
                <Grid item xs={12} sx={{ margin: "auto" }}>
                  <Button type="submit" variant="contained">
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ margin: "auto" }}>
                  <Link to={"/register"}>
                    <Button variant="contained">Register</Button>
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <Box>
          {errorInSubmitForm ? (
            <Alert severity="error">
              Account doesn't exist. Please{" "}
              <a href="/register">Create an Acoount</a>
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

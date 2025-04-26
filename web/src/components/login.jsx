import { TextField, Button, Box, Alert } from "@mui/material";
import { Form, Formik } from "formik";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Set withCredentials to true for all requests
// sends cookies alog with every request
axios.defaults.withCredentials = true;

// Axios interceptor to handle 401 errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page on session expiry
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

function Login() {
  let initialValues = {
    username: "",
    password: "",
  };

  let [errorInSubmitForm, setErrorInSubmitForm] = useState(false);
  let [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  async function loginUser(payload) {
    try {
      const response = await axios.post("http://localhost:8081/user/login", {
        username: payload.username,
        password: payload.password,
      });
      console.log(response.data);
      if (response.data.status) {
        navigate("/home");
      }
    } catch (error) {
      setErrorInSubmitForm(true);
      setErrorMsg(error.response.data.errorMessage);
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
          borderRadius: 3,
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
              <Grid
                className="LoginForm"
                container
                spacing={2}
                sx={{ padding: 8 }}
              >
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
                <Grid item xs={12} size={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ width: "100%", marginTop: 8 }}
                  >
                    Login
                  </Button>
                </Grid>
                <Grid
                  sx={{ position: "absolute", right: "20px", bottom: "20px" }}
                >
                  <span>Need an Account </span>
                  <Link to={"/register"}>Register</Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <Box>
          {errorInSubmitForm ? <Alert severity="error">{errorMsg}</Alert> : ""}
        </Box>
      </Box>
    </div>
  );
}

export default Login;

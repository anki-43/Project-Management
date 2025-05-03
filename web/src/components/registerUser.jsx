import { TextField, Button, Alert, Box } from "@mui/material";
import { Form, Formik } from "formik";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_URL;

function Registeruser() {
  let initialValues = {
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  };

  const navigate = useNavigate();

  let [errorInSubmitForm, setErrorInSubmitForm] = useState(false);
  let [errorMsg, setErrorMsg] = useState("Enter Valid Fields");

  const submitRegisterForm = (values) => {
    const { username, email, password, confirmedPassword } = values;
    console.log(values);
    if (!username || !email || !password || !confirmedPassword) {
      setErrorMsg("Select all fields");
      setErrorInSubmitForm(true);
      return;
    }

    if (password !== confirmedPassword) {
      setErrorMsg("Password and Confirmed Password do not match");
      setErrorInSubmitForm(true);
      return;
    }

    registerUser({ username, email, password });
  };

  async function registerUser(payload) {
    try {
      const response = await axios.post(API_BASE + "/user/register", {
        username: payload.username,
        email: payload.email,
        password: payload.password,
      });
      if (response.data.status) {
        navigate("/home");
        setErrorInSubmitForm(false);
        setErrorMsg("Enter Valid Fields");
      } else {
        console.log(response.data.errorMessage);
        setErrorInSubmitForm(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

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
          onSubmit={(values) => submitRegisterForm(values)}
        >
          {({ values, handleChange }) => (
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
                    value={values.username}
                    onChange={handleChange}
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
                    value={values.email}
                    onChange={handleChange}
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
                    value={values.password}
                    onChange={handleChange}
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
                    value={values.confirmedPassword}
                    onChange={handleChange}
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
          )}
        </Formik>
        <Box>
          {errorInSubmitForm ? <Alert severity="error">{errorMsg}</Alert> : ""}
        </Box>
      </Box>
    </div>
  );
}

export default Registeruser;

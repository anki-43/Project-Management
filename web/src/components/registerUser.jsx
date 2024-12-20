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
      email: '',
      password: "",
      confirmedpassword: "",
    });
  
    let [errorInSubmitForm, setErrorInSubmitForm] = useState(false);
  
    const submitRegisterForm = () => {
      initialValues = {
        username: "",
        email: '',
        password: "",
        confirmedpassword: "",
      };
      setErrorInSubmitForm(true);
      console.log(errorInSubmitForm);
    };
    return (
      <div className="App">
        <Box sx={{ background: "white", margin: "auto", marginBottom: "20%", width: "30%" }}>
          <Formik initialValues={initialValues} onSubmit={() => submitRegisterForm(initialValues)}>
            <Form>
              <Grid container spacing={2} sx={{ padding: 8 }}>
                <Grid item xs={12} size={12} sx={{ display: "flex", flexDirection: "column", gap: 2, fontSize: 20 }}>
                  <label htmlFor="username">Username</label>
                  <TextField id="username" name="username" placeholder="Enter username"></TextField>
                </Grid>
                <Grid item xs={12} size={12} sx={{ display: "flex", flexDirection: "column", gap: 2, fontSize: 20 }}>
                  <label htmlFor="email">Email</label>
                  <TextField id="email" name="email" placeholder="Enter email"></TextField>
                </Grid>
                <Grid item xs={12} size={12} sx={{ display: "flex", flexDirection: "column", gap: 2, fontSize: 20 }}>
                  <label htmlFor="password">Password</label>
                  <TextField id="password" name="password" placeholder="Enter password"></TextField>
                </Grid>
                <Grid item xs={12} size={12} sx={{ display: "flex", flexDirection: "column", gap: 2, fontSize: 20 }}>
                  <label htmlFor="confirmedPassword">Confirm Password</label>
                  <TextField
                    id="confirmedPassword"
                    type="password"
                    name="confirmedPassword"
                    placeholder="Confirm Password"
                  ></TextField>
                </Grid>
                
                <Grid item xs={12} sx={{ margin: "auto" }}>
                    <Button type="submit" variant="contained">
                        Register
                    </Button>
                </Grid>

              </Grid>
            </Form>
          </Formik>
          <Box>
            {errorInSubmitForm ? (
              <Alert severity="error">
                Enter Valid Fields
              </Alert>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </div>
    );
  }
  
  export default Registeruser;
  
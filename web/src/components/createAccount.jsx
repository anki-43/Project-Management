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
import { useFormik, Field, Form, FieldArray, Formik } from "formik";
import Grid from "@mui/material/Grid2";
import { useState } from "react";

function CreateAccount() {
  let [initialValues, setInitialValues] = useState({
    username: "",
    password: "",
    confirmedpassword: "",
  });

  const submitCreateAccountForm = (values) => {
    initialValues = {
      username: "",
      password: "",
      confirmedpassword: "",
    };
  };
  return (
    <div className="App">
      <Box
        sx={{
          background: "white",
          margin: "auto",
          width: "30%",
          marginBottom: "20%",
          borderRadius: "5px",
        }}
      >
        <Formik initialValues={initialValues} onSubmit={() => submitLoginForm(values)}>
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
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Box>
    </div>
  );
}

export default CreateAccount;
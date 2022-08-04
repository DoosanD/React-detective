import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { LocalizationContext } from "../context/LanguageContext";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Avatar, TextField, Typography } from "@mui/material";
import client_auth from '../apis/client_auth.js'

import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputAdornment, IconButton } from "@mui/material";

export default function SignUp() {

  const { t } = React.useContext(LocalizationContext);
  const navigate = useNavigate()
  const [error, setError] = React.useState('');

  const paperStyle = {
    padding: 15,
    margin: "20px auto",
    opacity: 0.8,
    color: "blue",
    fontSize: 12,
    fontWeight: 400,
    textAlign: "center",
    height: "auto",
    width: "350px",
    
  };
  const btnStyle = {
    margin: "5px 0",
    textTransform: "capitalize",
    fontFamily: "monospace",
  };
  const textStyle = { fontFamily: "monospace", color: "blue" };

  const theme = createTheme({
    typography: {
      fontFamily: ["monospace"].join(",")
    },
  });
  const initialValues = {
    name: "",
    username: "",
    email: "",
    password: "",
    re_password: "",
  };


  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(5, t("min5"))
      .max(12, t("max12"))
      .required(t("enterYourUserName")),
    email: Yup.string()
      .email(t("enterYourEmail"))
      .required("mailRequired"),
    password: Yup.string().min(6, t('min6')).max(15, t('max15')).required(t("passwordRequired")),
    re_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Password did not match!')

  });



  const onSubmit = async (newUser) => {
    try {
      const req = await client_auth.post('/auth/users/', newUser);
      navigate('/login');
      navigate(0);
    }
    catch (err) {
      if (Object.values(err.response.data)[0][0] === 'A user with that username already exists.') {
        setError('Već postoji korisnik sa tim korisničkim imenom')
      }
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [showRePassword, setShowRePassword] = useState(false);
  const handleClickShowRePassword = () => setShowRePassword(!showRePassword);
  console.log(error)

  return (
    <ThemeProvider theme={theme}>
      <Grid style={textStyle}>
        <Paper elevation={5} style={paperStyle}>
          <Grid align="center">
            <Avatar
              src="Logo.jpg"
              variant="square"
              sx={{ width: "85px", height: "auto" }}
            />
            <h2>{t("signUp")}</h2>
          </Grid>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}

          >
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  id="name"
                  name="name"
                  variant="standard"
                  label={t("firstName")}
                  placeholder="Enter ime i prezime"
                  required
                  helperText={<ErrorMessage name="name" />}
                />
                <Field
                  as={TextField}
                  fullWidth
                  id="username"
                  name="username"
                  variant="standard"
                  label={t("username")}
                  placeholder="Enter username"
                  required
                  helperText={<ErrorMessage name="username" />}
                />
                <Field
                  as={TextField}
                  fullWidth
                  id="email"
                  name="email"
                  variant="standard"
                  label={t("email")}
                  placeholder="Enter email"
                  required
                  helperText={<ErrorMessage name="email" />}
                />

                <Field
                  as={TextField}
                  fullWidth
                  id="password"
                  name="password"
                  variant="standard"
                  label={t("password")}
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  required
                  helperText={<ErrorMessage name="password" />}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Field
                  as={TextField}
                  fullWidth
                  id="re_password"
                  name="re_password"
                  variant="standard"
                  label={t("re_password")}
                  placeholder="Enter re_password"
                  type={showRePassword ? "text" : "password"}
                  required
                  helperText={<ErrorMessage name="re_password" />}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowRePassword}
                        >
                          {showRePassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <br></br>

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  fullWidth
                  style={btnStyle}
                  sx={{ backgroundColor: "blue" }}
                // disabled={props.isSubmitting}
                >
                  {t("submit")}
                </Button>

                {error !== '' && <p style={{ color: 'red' }}>{error}</p>}
              </Form>
            )}
          </Formik>

          <Typography style={textStyle} sx={{ marginTop: "15px" }}>
            {t("alredyHave")}&nbsp;
            <Link href="/login">
              {t("SignIn")}
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </ThemeProvider>
  );
}

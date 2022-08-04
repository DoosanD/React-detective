import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client_auth from '../apis/client_auth';
import { LocalizationContext } from "../context/LanguageContext";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Avatar, TextField, Typography } from "@mui/material";
//import LockRoundedIcon from "@mui/icons-material/LockRounded";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputAdornment, IconButton } from "@mui/material";

export default function SignIn() {

  const { t } = React.useContext(LocalizationContext);

  const navigate = useNavigate();

  const [error, setError] = React.useState('');


  const paperStyle = {
    padding: 12,
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
  const textStyle = { fontFamily: "monospace" };

  const theme = createTheme({
    typography: {
      fontFamily: ["monospace"].join(","),
    },
  });
  // const initialValues={
  //   username: "",
  //   password: "",
  //   remember: false

  // }
 
  const initialValues = {
    username: localStorage.getItem('username') ?? '',
    password: localStorage.getItem('password') ?? '',
    remember: false}
  
  
  
//}

const validationSchema = Yup.object().shape({

  username: Yup.string().min(5, t('min5')).max(12, t('max12')).required(t('enterYourUserName')),
  password: Yup.string().min(6, t('min6')).max(15, t('min15')).required(t('passwordRequired'))
})

const [showPassword, setShowPassword] = useState(false);
const handleClickShowPassword = () => setShowPassword(!showPassword);

const onSubmit = async (values) => {
  try {
    setError('');
    const User = {
      username: values.username,
      password: values.password,
    };

    console.log(User)

    const userr = await client_auth.post(`/auth/jwt/create/`, User)

    console.log(userr);
    const tok = JSON.stringify(userr.data);
    const parsedData = JSON.parse(tok);

    localStorage.setItem('token', parsedData.access);
    localStorage.setItem('refreshToken', parsedData.refresh);
    
    if (values.remember === true) {
      localStorage.setItem('username', values.username)
      localStorage.setItem('password', values.password);
    }

    // if (userr.status === 200) {
    alert('Uspesno ste se ulogovali')
    navigate('/create')
    navigate(0)
    // }


  } catch (error) {
    setError('Greska')
    return

  }
  console.log(error);
}


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
          <h2>{t('SignIn')}</h2>
        </Grid>

        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          {props => (
            <Form>

              <Field as={TextField}
                //error={Boolean(touched.username && errors.username)}
                fullWidth
                id="username"
                name="username"
                variant="standard"
                label={t('username')}
                // value={initialValues.username}
                placeholder="Enter username"
                required
                helperText={<ErrorMessage name="username" />}
              />
              {/* {props.errors.name && <div id="feedback">{props.errors.name}</div>} */}

              <Field as={TextField}
                fullWidth
                id="password"
                name="password"
                variant="standard"
                label={t('password')}
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
              <br></br>

              <FormGroup>
                <Field as={FormControlLabel}
                  control={<Checkbox />}
                  style={textStyle}
                  name="remember"
                  label={t('remember_me')}
                  type="checkbox"
                />
              </FormGroup>

              <Button
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
                style={btnStyle}
                sx={{ backgroundColor: "blue" }}

              >
                {t('submit')}
              </Button>
              {console.log(props)}

            </Form>
          )}
        </Formik>

        <Typography style={textStyle} sx={{ marginTop: "15px" }}>
          <Link href="#">{t('forgot_password')}</Link>
        </Typography>

        <Typography sx={{ marginTop: "5px" }} style={textStyle}>
          {t('haveAccount')}&nbsp;
          <Link href="/registration">{t('signUp')}</Link>
          
        </Typography>
      </Paper>
    </Grid>
  </ThemeProvider>
);
}


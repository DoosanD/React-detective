import React from 'react';
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import LanguageDropdown from "../infrastructure/components/LanguageDropdown";
import { LocalizationContext } from "../context/LanguageContext";

export default function Navigation2() {
    const { t } = React.useContext(LocalizationContext);
    const logOutClear=()=> {
        localStorage.clear()
        window.location.href = '/';
    }


    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="logo">
            <AccessibleForwardIcon to="/" />
          </IconButton>
          <Typography variant="h6" component={"div"} sx={{ flexGrow: 1 }}>
            <Button color="inherit" href="/">
              {t('Home')}
            </Button>
            <Button color="inherit" href="/" onClick={logOutClear}>{t('logout')}</Button>
            
          </Typography>
          <Stack direction={"row"} spacing={2}>
            <LanguageDropdown />
          </Stack>
          {/* <img src={"../../public/Logo.jpeg"} width={"30px"} alt="logo" /> */}
        </Toolbar>
      </AppBar>
    );
  }
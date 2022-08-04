import React, { useState, useEffect } from 'react';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { LocalizationContext } from '../context/LanguageContext';
import { Container, Grid } from "@mui/material";
//import Modal from '@mui/material/Modal';
//import moment from 'moment';
//import Box from '@mui/material/Box';
//import client from '../apis/client';
//import Spacer from '../infrastructure/components/Spacer';
//import ProfileForm from './forms/ProfileForm';





const HomePage = () => {
 
const { t } = React.useContext(LocalizationContext);

  return (
    <Container>
     <h1>Naše usluge</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
        <Card md={4} >
          <CardMedia
            sx={{
              mx: "auto",
              width: "70%",
            }}
            component="img"
            height="140"
            image="../truth_lie.jpg"
            alt="truth_lie"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Detektor laži
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Usluge našeg tima su i otkrivanje istine, uređajima najnovije
              generacije.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Saznaj vise</Button>
          </CardActions>
        </Card>
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
        <Card md={4} >
          <CardMedia
            sx={{
              mx: "auto",
              width: "70%",
            }}
            component="img"
            height="140"
            image="../truth_lie.jpg"
            alt="truth_lie"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Detektor laži
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Usluge našeg tima su i otkrivanje istine, uređajima najnovije
              generacije.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Saznaj vise</Button>
          </CardActions>
        </Card>
        </Grid>
        <Grid item xs={12}sm={6} md={4}>
        <Card md={4} >
          <CardMedia
            sx={{
              mx: "auto",
              width: "70%",
            }}
            component="img"
            height="140"
            image="../truth_lie.jpg"
            alt="truth_lie"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Detektor laži
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Usluge našeg tima su i otkrivanje istine, uređajima najnovije
              generacije.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Saznaj vise</Button>
          </CardActions>
        </Card>
      </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;

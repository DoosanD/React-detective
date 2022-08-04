import React, { useState, useEffect } from 'react'
import Typography from "@mui/material/Typography";
import { LocalizationContext } from '../context/LanguageContext';
import { Container, Grid } from "@mui/material";
import Modal from '@mui/material/Modal';
import moment from 'moment';
import Box from '@mui/material/Box';
import client from '../apis/client';

import ProfileForm from './forms/ProfileForm';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid blue',
    boxShadow: 24,
    p: 1
};


const reducer = (state, action) => {
    switch (action.type) {
        case 'set_show_profile_modal':
            return { ...state, showProfileModal: action.payload };
        case 'set_profile_data':
            return { ...state, profileData: action.payload };
        case 'set_user':
            return { ...state, user: action.payload };
        default:
            return state;
    }
  };
  
export default function CreateProfile( props ){

    const [state, dispatch] = React.useReducer(reducer, {
        showProfileModal: false,
        profileData: undefined,
        user: undefined
    });
    const { t } = React.useContext(LocalizationContext);
    
    useEffect(() => {
      let isActive = true;
      const loadData = async () => {
    
          const profile = await client.get(`/profiles/`);
          const user = await client.get(`/auth/users/me/`);
    
          if (isActive) {
              if (profile.data.length === 0) {
                  dispatch({ type: 'set_show_profile_modal', payload: true })
    
                  // useStateNacin
                  // setShowProfileModal(true);
              }
              else {
    
                  dispatch({ type: 'set_profile_data', payload: await profile.data[0] })
                  dispatch({ type: 'set_user', payload: await user.data.name })
                  dispatch({ type: 'set_show_profile_modal', payload: false })
    
    
                  //useState nacin
                  // setprofileData(await profile.data[0])
                  // setUser(await user.data.name)
                  // setShowProfileModal(false);
              }
          }
      };
    
      if (isActive) loadData();
    
      return () => {
          isActive = false;
      };
    
    }, []);
  return(
    <Container component='main' maxWidth='md'>
            
            <Grid container spacing={3} direction='column'>
                
                {(state.user !== undefined &&
                    state.user !== '') ? (<Grid item><Typography mt={3} variant='h4'>
                        {`Zdravo ${state.user}`}
                    </Typography></Grid>) : null}
            </Grid>
            
            <Grid container spacing={4} direction='row' justifyContent='center'>


                <Grid item xs={12} md={6} style={{ alignSelf: 'center' }}>
                    {(state.profileData !== undefined &&
                        state.profileData.date_of_birth !== '') &&
                        <Grid item><Typography variant='inherit'>Datum rodjenja: <span style={{ color: 'grey' }}>{moment(state.profileData.date_of_birth).format('DD. MM. YYYY.')}</span></Typography></Grid>
                    }
                    {(state.profileData !== undefined &&
                        state.profileData.city !== '') &&
                        <Grid item><Typography variant='inherit'>Grad: <span style={{ color: 'grey' }}>{state.profileData.city}</span></Typography></Grid>
                    }
                    {(state.profileData !== undefined &&
                        state.profileData.phone !== '') &&
                        <Grid item><Typography variant='inherit'>Telefon: <span style={{ color: 'grey' }}>{state.profileData.phone}</span></Typography></Grid>
                    }
                    {(state.profileData !== undefined &&
                        state.profileData.address !== '') &&
                        <Grid item><Typography variant='inherit'>Adresa: <span style={{ color: 'grey' }}>{state.profileData.address}</span></Typography></Grid>
                    }

                </Grid>
            </Grid>
            

            <Modal open={state.showProfileModal} style={{ overflow: 'scroll' }}>
                <Box sx={style}>
                    <ProfileForm />
                </Box>
            </Modal>
        </Container >
    );
}



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import ChangePassword from './forms/ChangePassword';
import DeleteAccount from './forms/DeleteAccount';
import { LocalizationContext } from '../context/LanguageContext';

import client from '../apis/client';
import Spacer from '../infrastructure/components/Spacer';


import ProfileForm from './forms/ProfileForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid black',
    boxShadow: 24,
    p: 1
};

const ProfilePage = (props) => {
    const { t } = React.useContext(LocalizationContext);
    let navigate = useNavigate()

    const [profileData, setProfileData] = useState()
    const [user, setUser] = useState()

    const [showChange, setShowChange] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const handleCloseChange = () => setShowChange(false);
    const handleShowChange = () => setShowChange(true);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    useEffect(() => {
        let isActive = true;
        const loadData = async () => {

            const profile = await client.get(`/profiles/`);
            const user = await client.get(`/auth/users/me/`);

            if (isActive) {
                if (profile.data.length === 0) {
                    navigate('/')
                    navigate(0)

                }
                else {
                    setProfileData(await profile.data[0])
                    setUser(await user.data.name)
                }
            }
        };

        if (isActive) loadData();

        return () => {
            isActive = false;
        };

    }, []);


    return (
        <>

            <Container component='main' maxWidth='md'>
            <Grid container spacing={3} direction='column'>
                {(user !== undefined &&
                    user !== '') ? (<Grid item><Typography mt={3} variant='h4'>
                        {`Zdravo ${user}`}
                    </Typography></Grid>) : null}
            </Grid>
                <Spacer height='2rem' />

               <Spacer height='4rem' />
                <Grid container spacing={4} direction='row' justifyContent='center'>


                    <Grid item xs={12} md={6} style={{ alignSelf: 'center' }}>
                        {(profileData !== undefined &&
                            profileData.date_of_birth !== '') &&
                            <Grid item><Typography variant='inherit'>Datum rodjenja: <span style={{ color: 'grey' }}>{moment(profileData.date_of_birth).format('DD. MM. YYYY.')}</span></Typography></Grid>
                        }
                        {(profileData !== undefined &&
                            profileData.city !== '') &&
                            <Grid item><Typography variant='inherit'>Grad: <span style={{ color: 'grey' }}>{profileData.city}</span></Typography></Grid>
                        }
                        {(profileData !== undefined &&
                            profileData.phone !== '') &&
                            <Grid item><Typography variant='inherit'>Telefon: <span style={{ color: 'grey' }}>{profileData.phone}</span></Typography></Grid>
                        }
                        {(profileData !== undefined &&
                            profileData.address !== '') &&
                            <Grid item><Typography variant='inherit'>Adresa: <span style={{ color: 'grey' }}>{profileData.address}</span></Typography></Grid>
                        }

                    </Grid>
                </Grid>
                <Spacer height='4rem' />
                <Grid container spacing={5} direction='row' justifyContent='center' align='center'>
                    <Grid item>
                        <Button onClick={handleShowEdit} color='primary' variant='contained' style={{ backgroundColor: 'black' }}>
                            {'Izmeni profil'}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleShowChange} color='primary' variant='contained' style={{ backgroundColor: 'black' }}>
                            {'Izmeni lozinku'}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={handleShowDelete} color='primary' variant='contained' style={{ backgroundColor: 'black' }}>
                            {'Obrisi nalog'}
                        </Button>
                    </Grid>
                </Grid>
            </Container>

            <Modal open={showChange} onClose={handleCloseChange} style={{ overflow: 'scroll' }}>
                <Box sx={style}>
                    <ChangePassword />
                </Box>
            </Modal>


            <Modal open={showEdit} onClose={handleCloseEdit} style={{ overflow: 'scroll' }}>
                <Box sx={style}>
                    <ProfileForm profileData={profileData}/>
                </Box>
            </Modal>


            <Modal open={showDelete} onClose={handleCloseDelete} style={{ overflow: 'scroll' }}>
                <Box sx={style}>
                    <DeleteAccount />
                    </Box>
            </Modal>

        </>
    );
}

export default ProfilePage;

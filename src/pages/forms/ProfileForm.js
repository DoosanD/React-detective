import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import moment from 'moment';

import * as yup from 'yup';
import { useFormik } from 'formik';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { LocalizationContext } from '../../context/LanguageContext'

import client from '../../apis/client';
import { Typography } from '@mui/material';


const ProfileForm = (props) => {
    const { t } = React.useContext(LocalizationContext);
    let navigate = useNavigate()
    const [buttonState, setButtonState] = useState(false)
    const [profileData, setProfileData] = useState(props.profileData || undefined)

    useEffect(() => {
        let isActive = true;
        const loadData = async () => {

            const profile = await client.get(`/profiles/`);

            if (isActive) {
                if (profile.data.length !== 0) {
                    setProfileData(await profile.data[0])
                }
            }
        };

        if (isActive) loadData();

        return () => {
            isActive = false;
        };

    }, []);


    const initialValues = {
        date_of_birth: profileData !== undefined ? profileData.date_of_birth : moment(new Date()).format('YYYY-MM-DD'),
        city: profileData !== undefined ? profileData.city : '',
        address: profileData !== undefined ? profileData.address : '',
        phone: profileData !== undefined ? profileData.phone : ''
    }


    const postProfile = async (values) => {
        try {
            setButtonState(true)
            const user = await client.get('/auth/users/me/')
            const owner = await user.data.id

            let profile = {
                date_of_birth: moment(values.date_of_birth).format('YYYY-MM-DD'),
                city: values.city,
                address: values.address,
                phone: values.phone,
                owner: owner
            }

            if (profileData !== undefined) {

                await client.put(`/profiles/${profileData.id}/`, profile)

                alert('Uspesno ste editovali profil')

                navigate('/create')
                navigate(0)

             }
            else {

                await client.post('/profiles/', profile)

                alert('Uspesno ste kreirali profil')

                navigate('/')
                navigate(0)
      
            }



        } catch (err) {

            if (err.response) {
                alert(JSON.stringify(err.response.data));
                setButtonState(false)
            }
        }
    };


    const validationSchema = yup.object({
        date_of_birth: yup.date()
            .required('Obavezno polje'),
        city: yup.string()
            .required('Obavezno polje'),
        address: yup.string()
            .required('Obavezno polje'),
        phone: yup.string()
            .required('Obavezno polje'),
    });


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: postProfile,
    });


    return (
        <Container component='main'>
            <Typography m={3} variant='h4'>
                {profileData !== undefined ? 'Izmeni profil' : 'Kreiraj profil'}
            </Typography>
            <form onSubmit={formik.handleSubmit} className='mt-3 m-2'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id='date_of_birth'
                            name='date_of_birth'
                            type='date'
                            variant='outlined'
                            label={'Datum rodjenja'}
                            format='yyyy/MM/dd'
                            defaultValue={formik.values.date_of_birth}
                            selected={formik.values.date_of_birth}
                            onChange={formik.handleChange}
                            InputLabelProps={{ shrink: true, required: true }}
                            error={formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)}
                            helperText={formik.touched.date_of_birth && formik.errors.date_of_birth}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id='city'
                            name='city'
                            variant='outlined'
                            label={'Grad'}
                            InputLabelProps={{ required: true }}
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id='address'
                            name='address'
                            variant='outlined'
                            label={'Adresa'}
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id='phone'
                            name='phone'
                            variant='outlined'
                            label={'Telefon'}
                            value={formik.values.phone}
                            InputLabelProps={{ required: true }}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button color='primary' variant='contained' fullWidth type='submit' disabled={buttonState} style={{ backgroundColor: 'blue' }}>
                            {profileData !== undefined ? 'Izmeni profil' : 'Kreiraj profil'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default ProfileForm;

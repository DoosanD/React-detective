import React from 'react';
import { useNavigate } from 'react-router-dom';

import * as yup from 'yup';
import { useFormik } from 'formik';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { LocalizationContext } from '../../context/LanguageContext';

import client from '../../apis/client';
import Spacer from '../../infrastructure/components/Spacer';

const initialValues = {
    current_password: '',
    new_password: '',
    re_new_password: ''
}

const ChangePassword = () => {
    const { t } = React.useContext(LocalizationContext);
    const [error, setError] = React.useState('');
    let navigate = useNavigate()

    const changePassword = async (values) => {
        try {
            const current_password = values.current_password;
            const new_password = values.new_password;
            const re_new_password = values.re_new_password;
            if (new_password === re_new_password) {
                const res = await client.post(`/auth/users/set_password/`, {
                    new_password,
                    current_password,
                });
                if (res.status === 204) {
                    alert('Uspesno ste izmenili lozinku');
                }
                navigate(`/profile`);
                navigate(0);


            }

        } catch (error) {
            const values = Object.values(error.response.data)
            const keys = Object.keys(error.response.data)
      
            if (keys !== undefined && values !== undefined) {
              if (keys.length !== 0 && values.length !== 0) {
                if (values[0][0] === 'The password is too similar to the email.' && keys[0] === 'new_password') {
                  setError('Lozinka je slicna imejlu')
                  return
                } else if (values[0][0] === 'This password is too common.' && keys[0] === 'new_password') {
                  setError('Lozinka je uobicajena')
                  return
                } else if (values[0][0] === 'Invalid password.' && keys[0] === 'current_password') {
                  setError('Neispravna lozinka')
                  return
                } else {
                  setError('Proverite da li ste dobro uneli podatke')
                  return
                }
      
              }
            }
      
        }
    };

    const validationSchema = yup.object({
        current_password: yup.string().required('Obavezno polje'),
        new_password: yup.string()
            .required('Obavezno polje')
            .min(8, t('min8'))
            .max(40, t('max40')),
        re_new_password: yup.string().required('Obavezno polje').oneOf([yup.ref('new_password'), null], 'Lozinke se ne podudaraju')
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: changePassword,
    });



    return (
        <Container component='main' maxWidth='sm'>
            <Typography m={3} variant='h4'>
                {'Izmeni lozinku'}
            </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='current_password'
                                label={'Trenutna lozinka'}
                                name='current_password'
                                variant='outlined'
                                type='password'
                                value={formik.values.current_password}
                                onChange={formik.handleChange}
                                error={formik.touched.current_password && Boolean(formik.errors.current_password)}
                                helperText={formik.touched.current_password && formik.errors.current_password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='new_password'
                                label={'Nova lozinka'}
                                name='new_password'
                                variant='outlined'
                                type='password'
                                value={formik.values.new_password}
                                onChange={formik.handleChange}
                                error={formik.touched.new_password && Boolean(formik.errors.new_password)}
                                helperText={formik.touched.new_password && formik.errors.new_password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id='re_new_password'
                                label={'Ponovi novu lozinku'}
                                name='re_new_password'
                                variant='outlined'
                                type='password'
                                value={formik.values.re_new_password}
                                onChange={formik.handleChange}
                                error={formik.touched.re_new_password && Boolean(formik.errors.re_new_password)}
                                helperText={formik.touched.re_new_password && formik.errors.re_new_password}
                            />
                        </Grid>
                        
                        {error !== '' &&  <Grid item xs={12}><p style={{ color: 'red' }}>{error}</p></Grid>}
                        <Grid item xs={12}>
                            <Spacer height='1rem' />
                            <Button color='primary' variant='contained' fullWidth type='submit' style={{ backgroundColor: 'blue' }}>
                                {'Izmeni lozinku'}
                            </Button>
                        </Grid>


                    </Grid>
                </form>
        </Container>
    );
};

export default ChangePassword;

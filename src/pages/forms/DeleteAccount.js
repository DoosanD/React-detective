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

const initialValues = {
    current_password: '',
}

const DeleteAccount = () => {
    const { t } = React.useContext(LocalizationContext);
    const [error, setError] = React.useState('');
    let navigate = useNavigate()

    const deleteAcc = async (values) => {
        try {
          const current_password = values.current_password
          await client({
            url: '/auth/users/me/',
            method: 'delete',
            data: { current_password },
          });
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('username')
          localStorage.removeItem('password')
          alert('Uspesno ste obrisali nalog')
          navigate('/')
          navigate(0)
    

        } catch (err) {
            setError('Pogresna lozinka')
        }
    };

    const validationSchema = yup.object({
        current_password: yup.string().required('Obavezno polje'),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: deleteAcc,
    });



    return (
        <Container component='main' maxWidth='sm'>
            <Typography m={3} variant='h4'>
                {'Obrisi nalog'}
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
                        
                        {error !== '' && <Grid item xs={12}><p style={{ color: 'red' }}>{error}</p></Grid>}
                       
                        <Grid item xs={12}>
                        <Button color='primary' variant='contained' fullWidth type='submit' style={{ backgroundColor: 'blue' }}>
                            {'Obrisi nalog'}
                        </Button>
                        </Grid>
                    </Grid>
                </form>
        </Container>
    );
};

export default DeleteAccount;

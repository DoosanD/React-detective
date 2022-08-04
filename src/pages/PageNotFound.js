import React from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Spacer from '../infrastructure/components/Spacer';
import { LocalizationContext } from '../context/LanguageContext';

const PageNotFound = () => {
    const { t } = React.useContext(LocalizationContext);

    return (
        <>
            <Spacer height={'15rem'} />
            <Container component='main' maxWidth='md'>
                <Typography component='h1' variant='h2' sx={{textAlign: 'center'}}>
                    {'Trazena stranica nije pronadjena'}
                </Typography>
            </Container>

        </>
    );
}

export default PageNotFound;

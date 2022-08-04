import React from 'react';
import LogoPage from './LogoPage'
import { LocalizationContext } from '../context/LanguageContext';
import { useState } from 'react';
import Modal from '@mui/material/Modal';

const HomePageAuth = () => {
    const { t } = React.useContext(LocalizationContext);
    const [onLogo, setOnLogo] = useState(true);

    const startLogo = () => {
        setOnLogo(true)
    };
    const stopLogo = () => {
        setOnLogo(false)
    };

    const handleClick = (event) => {
        event.preventDefault();
        console.log('Image clicked');
    }


        return (
            
                <>
                <div>Test modal</div>
                <Modal open={onLogo} onClick={stopLogo} style={{ 
                perspective:'600px',
                background: 'linear-gradient(-25deg, rgb(114, 142, 226) 0%, black 45%, rgb(136, 155, 232) 55%, black 100%)'}} >
                     <LogoPage onClick={event => window.location.href = '/registration'} /> 
                   
                </Modal>

           </>
        );
    
}
export default HomePageAuth;





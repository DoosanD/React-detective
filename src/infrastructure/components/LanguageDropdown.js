import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import './LanguageDropdown.css';

const LanguageDropdown = () => {
  console.disableYellowWarning = true;
  const [locale, setLocale] = React.useState(localStorage.getItem('language'));

  const handleSetLocale = (value) => {
    setLocale(value);
    localStorage.setItem('language', value);
    window.location.reload()
  };

  return (
    <>
      <div className=' bg_top_nav' 
>
        <Button
          startIcon={<Avatar src= {'jezik.svg.png' } variant = "square" sx = {{height: "auto"}} />}
          variant='button_lang'
          value='sr'
          onClick={(event) => handleSetLocale(event.target.value)}
        >
          lat
        </Button>
        <Button
          startIcon={<Avatar src= {'jezik.svg.png' } variant = "square" sx = {{height: "auto"}} />}
          variant='button_lang'
          value='cyr'
          onClick={(event) => handleSetLocale(event.target.value)}
        >
          ћир
        </Button>
        <Button
          startIcon={<Avatar src= {'jezik2.svg.png' } variant = "square" sx = {{height: "auto"}} />}
          variant='button_lang'
          value='en'
          onClick={(event) => handleSetLocale(event.target.value)}
        >
          eng
        </Button>

      </div>
    </>
  );
};

export default LanguageDropdown;

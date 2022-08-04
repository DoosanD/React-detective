import React from 'react';
import I18n from 'i18n-js';
import sr from '../infrastructure/languages/sr';
import cyr from '../infrastructure/languages/cyr';
import en from '../infrastructure/languages/en'

export const LocalizationContext = React.createContext();

I18n.fallbacks = true;
I18n.translations = { sr, cyr, en };

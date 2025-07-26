import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import en from './locales/en/translation.json';
import bn from './locales/bn/translation.json';
import hi from './locales/hi/translation.json';
import ta from './locales/ta/translation.json';
import as from './locales/as/translation.json';
import gu from './locales/gu/translation.json';
import kn from './locales/kn/translation.json';
import ml from './locales/ml/translation.json';
import mr from './locales/mr/translation.json';
import or from './locales/or/translation.json';
import pa from './locales/pa/translation.json';
import te from './locales/te/translation.json';
import ur from './locales/ur/translation.json';
import sd from './locales/sd/translation.json';
// import si from './locales/si/translation.json';
import ne from './locales/ne/translation.json';
import kok from './locales/kok/translation.json';
import mai from './locales/mai/translation.json';
// import san from './locales/san/translation.json';
import trp from './locales/trp/translation.json';
import grt from './locales/grt/translation.json';
import mni from './locales/mni/translation.json';
import lus from './locales/lus/translation.json';
// import bho from './locales/bho/translation.json';
import sat from './locales/sat/translation.json';
import doi from './locales/doi/translation.json';
// import mr from './locales/mr/translation.json';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      bn: { translation: bn },
      hi: { translation: hi },
      ta: { translation: ta },
      as: { translation: (as) },
      gu: { translation: gu },
      kn: { translation: kn },
      ml: { translation: ml },
      mr: { translation: mr },
      or: { translation: or },
      pa: { translation: pa },
      te: { translation: te },
      ur: { translation: ur },
      sd: { translation: sd },
      ne: { translation: ne },
      kok: { translation: kok },
      mai: { translation: mai },
      trp: { translation: trp },
      grt: { translation: grt },
      mni: { translation: mni },
      lus: { translation: lus },
      sat: { translation: sat },
      doi: { translation: doi },
      // Add more languages here
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;

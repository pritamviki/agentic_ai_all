import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './first.scss';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';
import { lang_mapping } from '../utils/lang';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
  'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi',
  'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const INDIAN_LANGUAGES = [
  'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Urdu', 'Gujarati',
  'Kannada', 'Odia', 'Malayalam', 'Punjabi', 'Assamese', 'Maithili',
  'Santali', 'Kashmiri', 'Nepali', 'Konkani', 'Sindhi', 'Dogri',
  'Manipuri', 'Bodo', 'Santhali', 'Kokborok', 'Tulu', 'Khasi',
  'Garo', 'Mizo', 'English'
];

export default function FirstPage() {
  const {t, i18n} = useTranslation();
  const [state, setState] = useState('');
  const [language, setLanguage] = useState('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    navigate('/second', { state: { language } });
  };

  return (
    <div className="kb-root-one">
      <Header/>
      <div className="kb-main-center">
        <form className="kb-form" onSubmit={handleSubmit}>

          {/* LANGUAGE DROPDOWN FIRST */}
          <div className="kb-row" style={{ justifyContent: 'flex-end' }}>
            <div className="kb-section">
              <label className="kb-label">{t('language')}</label>
              <div className="kb-dropdown-container">
                <div className="kb-dropdown-selected" onClick={() => setShowLangDropdown(v => !v)}>
                  {language || 'Select Language'}
                  <span className="kb-dropdown-arrow">&#x25BC;</span>
                </div>
                {showLangDropdown && (
                  <div className="kb-dropdown-list">
                    {INDIAN_LANGUAGES.map(l => (
                      <div
                        key={l}
                        className="kb-dropdown-item"
                        onClick={() => { 
                          setLanguage(l); 
                          setShowLangDropdown(false);
                          console.log(`Selected language: ${lang_mapping[l]}`);
                          changeLanguage(lang_mapping[l]);
                          localStorage.setItem('appLanguage', lang_mapping[l]); // save to localStorage
                        }}
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* STATE DROPDOWN SECOND */}
          <div className="kb-row" style={{ justifyContent: 'flex-start' }}>
            <div className="kb-section">
              <label className="kb-label">{t('state')}</label>
              <div className="kb-dropdown-container">
                <div className="kb-dropdown-selected" onClick={() => setShowStateDropdown(v => !v)}>
                  {state || 'Select State'}
                  <span className="kb-dropdown-arrow">&#x25BC;</span>
                </div>
                {showStateDropdown && (
                  <div className="kb-dropdown-list">
                    {INDIAN_STATES.map(s => (
                      <div
                        key={s}
                        className="kb-dropdown-item"
                        onClick={() => { setState(s); setShowStateDropdown(false); }}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          {(state && language) && (
            <button className="kb-submit" type="submit" disabled={!state || !language}>Submit</button>
          )}
          
          {/* SUCCESS MESSAGE */}
          {submitted && state && language && (
            <div className="kb-success">Submitted: {state} / {language}</div>
          )}
        </form>
      </div>
    </div>
  );
}


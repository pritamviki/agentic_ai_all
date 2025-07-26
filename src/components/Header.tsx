import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import './Header.scss'
import { useEffect } from 'react';

const Header = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage'); // Retrieve saved language from localStorage
    // If a language is saved, change the i18n language to it
      if (savedLang) {
        i18n.changeLanguage(savedLang);
      }
  }, []);
  return (
    <>
        <header className="kb-header">
            <span className="kb-title">{t('title')}</span>
            <span className="kb-user-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4"/>
                <path d="M16 16a4 4 0 0 0-8 0"/>
                <rect x="2" y="2" width="20" height="20" rx="5" fill="#fff3"/>
            </svg>
            </span>
      </header>
    </>
  )
}

export default Header
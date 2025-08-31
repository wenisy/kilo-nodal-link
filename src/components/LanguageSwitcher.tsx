import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);

    // Update URL with language parameter
    const newSearchParams = new URLSearchParams(searchParams);
    if (lng === 'en') {
      newSearchParams.delete('lang');
    } else {
      newSearchParams.set('lang', lng);
    }

    const newSearch = newSearchParams.toString();
    const newUrl = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;

    navigate(newUrl, { replace: true });

    // Store language preference in localStorage
    localStorage.setItem('i18nextLng', lng);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'fr', name: 'Français' },
  ];

  return (
    <div className="language-switcher">
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="language-select"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;